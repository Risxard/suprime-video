import { useRef, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import IdentityDialog from "./IdentityDialog/IdentityDialog";
import { useTranslation } from "react-i18next";

const EmailSection = () => {
  const [tempEmail, setTempEmail] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const emailRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

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

      <h1 className="identity-title">
        {t("identity-page.email-section.title")}
      </h1>

      <p className="identity-subtitle">
        {entryPoint === "register" ? (
          <span
            dangerouslySetInnerHTML={{
              __html: t("identity-page.email-section.subtitle.register"),
            }}
          />
        ) : entryPoint === "update-credentials" ? (
          t("identity-page.email-section.subtitle.update-credentials")
        ) : (
          <span
            dangerouslySetInnerHTML={{
              __html: t("identity-page.email-section.subtitle.login"),
            }}
          />
        )}
      </p>

      <form className="identity-form" onSubmit={handleSubmit}>
        <div
          className={`identity-form-input-container ${
            isActive ? "active" : ""
          }`}
          onClick={handleContainerClick}
        >
          <label htmlFor="email">
            {t("identity-page.email-section.label")}
          </label>
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
          {t("identity-page.email-section.button")}
        </button>
      </form>

      <div className="identity-footer">
        <p className="footer-title">
          {t("identity-page.advise-texts.title")}
        </p>
        <p className="identity-footer-text">
          {t("identity-page.advise-texts.subtitle")}
        </p>
      </div>
    </>
  );
};

export default EmailSection;
