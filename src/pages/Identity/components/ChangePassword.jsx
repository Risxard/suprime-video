import { useEffect, useState } from "react";
import { sendResetPasswordEmail } from "../../../services/firebase/profileServices";
import { useNavigate } from "react-router-dom";
import IdentityDialog from "./IdentityDialog/IdentityDialog";
import LoaderOverlooping from "../assets/LoaderOverlooping";

const ChangePassword = () => {
  const [message, setMessage] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const [email, setEmail] = useState("");

  const navigate = useNavigate();


  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem("auth-data") || "{}");
    if (authData?.email) {
      setEmail(authData.email);
    } else {
      navigate("/identity/update-credentials/enter-email");
    }
  }, [navigate]);


  const handleResend = async (e) => {
    e.preventDefault();
    setMessage(null);
    setIsSending(true);

    try {
      if (!email) {
        setMessage({
          message1: "E-mail não encontrado.",
          message2: "Volte e insira seu e-mail novamente.",
        });
        return;
      }

      const sent = await sendResetPasswordEmail(email);

      if (sent) {
        setMessage({
          message1: "Novo e-mail enviado!",
          message2:
            "Verifique sua caixa de entrada ou a pasta de spam. Se não encontrar, tente novamente mais tarde.",
        });
      } else {
        setMessage({
          message1: "Falha ao enviar o e-mail.",
          message2: "Verifique o endereço e tente novamente.",
        });
      }
    } catch (error) {
      console.error("Erro ao enviar e-mail de redefinição:", error);

      if (error.code === "auth/too-many-requests") {
        setMessage({
          message1: "Muitas tentativas detectadas.",
          message2: "Aguarde alguns minutos antes de tentar novamente.",
        });
      } else if (error.code === "auth/user-not-found") {
        setMessage({
          message1: "Usuário não encontrado.",
          message2: "Verifique se o e-mail está correto.",
        });
      } else {
        setMessage({
          message1: "Erro inesperado.",
          message2: "Tente novamente mais tarde.",
        });
      }
    } finally {
      setIsSending(false);
    }
  };

  const resetMessage = () => setMessage(null);

  return (
    <>
      {isSending ? (
        <LoaderOverlooping />
      ) : (
        <>
          <h1 className="identity-title">Verifique seu e-mail</h1>
          <p className="identity-subtitle">
            Enviamos um e-mail para <b>{email}</b> com um link para redefinir
            sua senha. Clique no link e siga as instruções para criar uma nova
            senha.
          </p>
          <p className="identity-subtitle">
            Se não encontrar o e-mail, verifique as pastas de spam ou lixo
            eletrônico.
          </p>
          <p className="identity-subtitle">
            Não recebeu o e-mail?{" "}
            <a href="#" onClick={handleResend}>
              Reenviar
            </a>
          </p>
        </>
      )}

      {message && (
        <IdentityDialog
          reesend={true}
          message1={message.message1}
          message2={message.message2}
          onConfirm={resetMessage}
        />
      )}
    </>
  );
};

export default ChangePassword;
