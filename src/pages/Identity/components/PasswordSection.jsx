import { useRef, useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import ArrowSvg from "../assets/ArrowSvg";
import ErrorSvg from "../assets/ErrorSvg";
import LoaderOverlooping from "../assets/LoaderOverlooping";
import ShowPassword from "../../../assets/ShowPassword";

import { useTranslation } from "react-i18next";
import { useAuth } from "../../../hooks/Auth/useAuth";

function PasswordSection() {
  const [tempPassword, setTempPassword] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const passwordRef = useRef(null);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { loginUser, loading, error } = useAuth();

  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem("auth-data"));
    if (authData?.email) {
      setEmail(authData.email);
    } else {
      navigate("/identity/login/enter-email");
    }
  }, [navigate]);

  const handleContainerClick = () => {
    setIsActive(true);
    passwordRef.current?.focus();
  };

  const handleBlur = () => {
    if (!tempPassword.trim()) setIsActive(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      return;
    }

    const { success, error, needsVerification } = await loginUser(
      email,
      tempPassword
    );

    if (success) {
      navigate("/home");
    } else if (needsVerification) {
      navigate("/identity/login/verify-email");
    }
  };

  const handleEdit = (e) => {
    e.preventDefault();
    localStorage.removeItem("auth-data");
    navigate("/identity/login/enter-email");
  };

  return (
    <>
      {loading ? (
        <LoaderOverlooping />
      ) : (
        <>
          <h1 className="identity-title">
            {t("identity-page.password-section.title")}
          </h1>

          <div className="identity-subtitle">
            <p>{t("identity-page.password-section.subtitle1")}</p>
            <b>{email}</b>{" "}
            <a href="" onClick={handleEdit}>
              {t("identity-page.password-section.subtitle2")}
            </a>
          </div>

          <form className="identity-form" onSubmit={handleSubmit}>
            <div>
              <div
                className={`identity-form-input-container ${
                  isActive ? "active" : ""
                }`}
                onClick={handleContainerClick}
              >
                <label htmlFor="password">
                  {t("identity-page.password-section.placeholder")}
                </label>

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="identity-input"
                  ref={passwordRef}
                  value={tempPassword}
                  onChange={(e) => setTempPassword(e.target.value)}
                  onBlur={handleBlur}
                  disabled={loading}
                />

                <div className="show-password">
                  <button type="button" onClick={() => setShowPassword(v => !v)}>
                    <ShowPassword showPassword={showPassword} />
                  </button>
                </div>
              </div>

              <div className="password-prompt">
                <p>{t("identity-page.password-section.input-advise")}</p>
              </div>

              {error && (
                <div className="password-prompt error-message">
                  <div className="error-icon">
                    <ErrorSvg />
                  </div>
                  <p>{error}</p>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="identity-button"
              disabled={loading}
            >
              {loading
                ? t("identity-page.password-section.button") + "..."
                : t("identity-page.password-section.button")}
            </button>
          </form>

          <div className="identity-footer">
            <div className="more-info">
              <button
                onClick={() => setShowMoreInfo(v => !v)}
                className={showMoreInfo ? "active" : ""}
              >
                {t("identity-page.password-section.more-about")} <ArrowSvg />
              </button>

              {showMoreInfo && (
                <div className="more-info-content">
                  <p className="footer-title">
                    {t("identity-page.advise-texts.title")}
                  </p>
                  <p className="identity-footer-text">
                    {t("identity-page.advise-texts.subtitle")}
                  </p>
                </div>
              )}
            </div>

            <NavLink to="/identity/update-credentials/enter-email">
              {t("identity-page.password-section.forgot-password")}
            </NavLink>
          </div>
        </>
      )}
    </>
  );
}

export default PasswordSection;
