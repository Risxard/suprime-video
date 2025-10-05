import { useEffect, useState } from "react";
import { sendEmailVerificationLink } from "../../../services/firebase/profileServices";
import { useNavigate } from "react-router-dom";
import IdentityDialog from "./IdentityDialog/IdentityDialog";
import LoaderOverlooping from "../assets/LoaderOverlooping";
import { auth } from "../../../services/firebase/firebaseconfig";

const EmailVerification = () => {
  const [message, setMessage] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem("auth-data") || "{}");
    if (authData?.email) {
      setEmail(authData.email);
    } else {
      navigate("/identity/login/enter-email");
    }
  }, [navigate]);

  const handleResend = async (e) => {
    e.preventDefault();
    setMessage(null);
    setIsSending(true);

    try {

      if (!auth) {
        setMessage({
          message1: "Nenhum usuário logado encontrado.",
          message2: "Por favor, faça login novamente.",
        });
        return;
      }

      const sent = await sendEmailVerificationLink(auth.currentUser);

      if (sent) {
        setMessage({
          message1: "Novo e-mail enviado!",
          message2: "Verifique sua caixa de spam. Ainda não encontrou o e-mail? Acesse a Central de Ajuda.",
        });
      } else {
        setMessage({
          message1: "Não foi possível enviar o e-mail.",
          message2: "Tente novamente mais tarde.",
        });
      }
    } catch (error) {
      console.error("Erro ao enviar verificação:", error);

      if (error.code === "auth/too-many-requests") {
        setMessage({
          message1: "Muitas tentativas detectadas.",
          message2: "Aguarde alguns minutos antes de tentar novamente.",
        });
      } else {
        setMessage({
          message1: "Erro desconhecido.",
          message2: "Tente novamente mais tarde.",
        });
      }
    } finally {
      setIsSending(false);
    }
  };

  const resetMessage = () => {
    setMessage(null);
  };

  return (
    <>
      {isSending ? (
        <LoaderOverlooping />
      ) : (
        <>
          <h1 className="identity-title">Verificação de E-mail Necessária</h1>
          <p className="identity-subtitle">
            Enviamos um e-mail para <b>{email}</b> com um link de verificação.
            Por favor, acesse sua caixa de entrada e clique no link para
            confirmar seu endereço de e-mail.
          </p>
          <p className="identity-subtitle">
            Se não encontrar o e-mail, verifique também as pastas de spam ou
            lixo eletrônico.
          </p>
          <p className="identity-subtitle">
            Não recebeu o e-mail?{" "}
            <a href="" onClick={handleResend}>
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

export default EmailVerification;
