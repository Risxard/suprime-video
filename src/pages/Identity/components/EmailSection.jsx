import { useRef, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import LoginDialog from "./LoginDialog";

const EmailSection = () => {
  const [tempEmail, setTempEmail] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const emailRef = useRef(null);

  const location = useLocation();

  const entryPoint = location.pathname.includes("sign-up")
    ? "Register"
    : "Login";

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

    if (entryPoint === "Register") {
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

    if (entryPoint === "Register") {
      window.location.replace(
        "/preview/acaiwaveplus/identity/sign-up/create-password"
      );
    } else {
      window.location.replace(
        "/preview/acaiwaveplus/identity/login/enter-password"
      );
    }
  };

  const handleCancel = () => {
    setShowDialog(false);
  };

  return (
    <>
      {showDialog && entryPoint === "Register" && (
        <LoginDialog
          email={tempEmail}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}

      <h1 className="login-title">Digite o seu e-mail para continuar</h1>
      <p className="login-subtitle">
        Entre no Açaíwave+ com sua conta usando o e⁠-⁠mail. Se você não tiver
        conta, precisará criar uma.
      </p>

      <form className="login-form" onSubmit={handleSubmit}>
        <div
          className={`login-form-input-container ${isActive ? "active" : ""}`}
          onClick={handleContainerClick}
        >
          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            type="email"
            required
            className="login-input"
            ref={emailRef}
            value={tempEmail}
            onChange={(e) => setTempEmail(e.target.value)}
            onBlur={handleBlur}
          />
        </div>

        <button type="submit" className="login-button">
          Continuar
        </button>
      </form>

      <div className="login-footer">
        <p className="footer-title">
          O Açaíwave+ não é um serviço de streaming real.
        </p>
        <p className="login-footer-text">
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
