import { useRef, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import IdentityDialog from "./IdentityDialog/IdentityDialog";

const EmailSection = () => {
  const [tempEmail, setTempEmail] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const emailRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();


  const entryPoint = location.pathname.includes("sign-up")
    ? "register"
    : location.pathname.includes("update-credentials")
    ? "update-credentials"
    : "login";


  useEffect(() => {
    const savedAuthData = localStorage.getItem("auth-data");
    if (savedAuthData) {
      try {
        const parsed = JSON.parse(savedAuthData);
        if (parsed?.email) {
          setTempEmail(parsed.email);
          setIsActive(true);
        }
      } catch (err) {
        console.error("Erro ao ler auth-data:", err);
      }
    }
  }, []);

  const handleContainerClick = () => {
    setIsActive(true);
    emailRef.current?.focus();
  };

  const handleBlur = () => {
    if (tempEmail.trim() === "") setIsActive(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (entryPoint === "register") {
      setShowDialog(true);
    } else {
      handleConfirm();
    }
  };

  const handleConfirm = () => {
    const expiresInMinutes = 1;
    const expirationTime = Date.now() + expiresInMinutes * 60 * 1000;

    const authData = {
      email: tempEmail.trim(),
      entryPoint,
      expires: expirationTime,
    };

    localStorage.setItem("auth-data", JSON.stringify(authData));

    if (entryPoint === "register") {
      navigate("/identity/sign-up/create-password");
    } else if (entryPoint === "update-credentials") {
      navigate("/identity/update-credentials/change-password");
    } else {
      navigate("/identity/login/enter-password");
    }
  };

  const handleCancel = () => {
    setShowDialog(false);
  };

  return (
    <>
      {showDialog && entryPoint === "register" && (
        <IdentityDialog
          email={tempEmail}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}

      <h1 className="identity-title">Digite o seu e-mail para continuar</h1>
      <p className="identity-subtitle">
        {entryPoint === "register" ? (
          <>
            Entre com seu e-mail para iniciar seu cadastro. Já possui uma conta?
            Entre{" "}
            <a href="/preview/acaiwaveplus/identity/login/enter-email">aqui</a>.
          </>
        ) : entryPoint === "update-credentials" ? (
          <>
            Digite o e-mail associado à sua conta para alterar suas credenciais.
            Enviaremos um link para redefinir sua senha ou atualizar seu acesso.
          </>
        ) : (
          <>
            Entre no Açaíwave+ com sua conta usando o e⁠-⁠mail. Se você não
            tiver conta, precisará{" "}
            <a href="/preview/acaiwaveplus/identity/sign-up/enter-email">
              criar uma conta
            </a>
            .
          </>
        )}
      </p>

      <form className="identity-form" onSubmit={handleSubmit}>
        <div
          className={`identity-form-input-container ${
            isActive ? "active" : ""
          }`}
          onClick={handleContainerClick}
        >
          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            type="email"
            required
            className="identity-input"
            ref={emailRef}
            value={tempEmail}
            onChange={(e) => setTempEmail(e.target.value)}
            onBlur={handleBlur}
          />
        </div>

        <button type="submit" className="identity-button">
          Continuar
        </button>
      </form>

      <div className="identity-footer">
        <p className="footer-title">
          O Açaíwave+ não é um serviço de streaming real.
        </p>
        <p className="identity-footer-text">
          Não possui qualquer vínculo com a Disney ou qualquer uma de suas
          subsidiárias. Todos os nomes, marcas e imagens são de propriedade de
          seus respectivos donos. Este site foi criado apenas para fins de
          portfólio.
        </p>
      </div>
    </>
  );
};

export default EmailSection;
