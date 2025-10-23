import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import ArrowSvg from "../assets/ArrowSvg";
import ErrorSvg from "../assets/ErrorSvg";
import { createNewAccount } from "../../../services/firebase/CreateNewAccount";
import LoaderOverlooping from "../assets/LoaderOverlooping";
import "./styles.css";
import { sendEmailVerificationLink } from "../../../services/firebase/profileServices";
import { auth } from "../../../services/firebase/firebaseconfig";
import ShowPassword from "../../../assets/ShowPassword";
import { useTranslation } from "react-i18next";

function CreatePasswordSection() {
  const [activeField, setActiveField] = useState("");
  const [nameValue, setNameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const passwordRef = useRef(null);
  const nameRef = useRef(null);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: { name: "", password: "", terms: false },
  });

  const watchedName = watch("name");
  const watchedPassword = watch("password");

  useEffect(() => {
    setNameValue(watchedName);
    setPasswordValue(watchedPassword);
  }, [watchedName, watchedPassword]);

  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem("auth-data") || "{}");
    if (authData?.email) {
      setEmail(authData.email);
    } else {
      navigate("/identity/sign-up/enter-email");
    }
  }, [navigate]);

  const calculateStrength = (password) => {
    if (!password) return 0;
    let strength = 0;
    if (password.length >= 6) strength += 25;
    if (/[A-Z]/.test(password)) strength += 20;
    if (/[0-9]/.test(password)) strength += 20;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 20;
    if (password.length >= 12) strength += 15;
    if (password.length > 0 && strength < 25) strength = 25;
    return Math.min(strength, 100);
  };

  const getStrengthLabelAndColor = (strength) => {
    if (strength < 40)
      return { label: t("identity-page.create-password.strength.weak"), color: "#ff4d4f" };
    if (strength < 70)
      return { label: t("identity-page.create-password.strength.medium"), color: "#ffcc00" };
    if (strength < 90)
      return { label: t("identity-page.create-password.strength.good"), color: "#4caf50" };
    return { label: t("identity-page.create-password.strength.great"), color: "#2e7d32" };
  };

  const strength = calculateStrength(passwordValue);
  const { label: strengthLabel, color: strengthColor } =
    getStrengthLabelAndColor(strength);

  const onSubmit = async (data) => {
    setError(null);
    setIsLoading(true);

    try {
      await createNewAccount({
        email,
        password: data.password,
        name: data.name,
      });

      await sendEmailVerificationLink(auth.currentUser);

      navigate("/identity/login/verify-email");
    } catch (err) {
      console.error(err);
      if (err.code === "auth/email-already-in-use") {
        setError(t("identity-page.create-password.errors.email-in-use"));
      } else {
        setError(t("identity-page.create-password.errors.generic"));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const toggleShowPassword = () => setShowPassword((prev) => !prev);
  const toggleMoreInfo = () => setShowMoreInfo(!showMoreInfo);

  const passwordPattern =
    /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/;

  const handleEdit = (e) => {
    e.preventDefault();
    localStorage.removeItem("auth-data");
    navigate("/identity/sign-up/enter-email");
  };

  return (
    <>
      {isLoading ? (
        <LoaderOverlooping />
      ) : (
        <>
          <h1 className="identity-title">
            {t("identity-page.create-password.title")}
          </h1>

          <div className="identity-subtitle">
            <p>{t("identity-page.create-password.subtitle1")}</p>
            <b>{email}</b>{" "}
            <a href="" onClick={handleEdit}>
              {t("identity-page.create-password.edit")}
            </a>
          </div>

          <form className="identity-form" onSubmit={handleSubmit(onSubmit)}>
            <div
              className={`identity-form-input-container ${
                activeField === "name" || nameValue ? "active" : ""
              }`}
              onClick={() => {
                setActiveField("name");
                nameRef.current?.focus();
              }}
            >
              <label htmlFor="name">{t("identity-page.create-password.name-label")}</label>
              <input
                id="name"
                type="text"
                className="identity-input"
                {...register("name", { required: t("identity-page.create-password.errors.name-required") })}
                ref={(el) => {
                  register("name").ref(el);
                  nameRef.current?.focus();
                }}
                onFocus={() => setActiveField("name")}
                onBlur={() => {
                  const value = nameRef.current?.value?.trim();
                  if (!value) setActiveField("");
                }}
                disabled={isLoading}
              />
            </div>

            {errors.name && (
              <div className="password-prompt error-message">
                <div className="error-icon">
                  <ErrorSvg />
                </div>
                <p>{errors.name.message}</p>
              </div>
            )}

            <div
              className={`identity-form-input-container ${
                activeField === "password" || passwordValue ? "active" : ""
              }`}
              onClick={() => {
                setActiveField("password");
                passwordRef.current?.focus();
              }}
            >
              <label htmlFor="password">{t("identity-page.create-password.password-label")}</label>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className="identity-input"
                ref={passwordRef}
                {...register("password", {
                  required: t("identity-page.create-password.errors.password-required"),
                  minLength: { value: 6, message: t("identity-page.create-password.errors.min-length") },
                  pattern: {
                    value: passwordPattern,
                    message: t("identity-page.create-password.errors.password-pattern"),
                  },
                })}
                onFocus={() => setActiveField("password")}
                onBlur={() => {
                  const value = passwordRef.current?.value?.trim();
                  if (!value) setActiveField("");
                }}
                disabled={isLoading}
              />
              <div className="show-password">
                <button
                  type="button"
                  onClick={toggleShowPassword}
                  aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                >
                  <ShowPassword showPassword={showPassword} />
                </button>
              </div>
            </div>

            {passwordValue && (
              <div className="security-password-bar-wrapper-container">
                <div
                  className="security-password-bar-wrapper"
                  style={{
                    width: "187px",
                    height: "6px",
                    backgroundColor: "#e0e0e0",
                    borderRadius: "3px",
                    marginTop: "8px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    className="security-password-bar"
                    style={{
                      width: `${(strength / 100) * 187}px`,
                      backgroundColor: strengthColor,
                      height: "100%",
                      borderRadius: "3px",
                      transition: "width 0.3s ease",
                    }}
                  />
                </div>
                <p
                  className="password-strength-text"
                  style={{ color: strengthColor, marginTop: "4px" }}
                >
                  {strengthLabel}
                </p>
              </div>
            )}

            {errors.password && (
              <div className="password-prompt error-message">
                <div className="error-icon">
                  <ErrorSvg />
                </div>
                <p>{errors.password.message}</p>
              </div>
            )}

            {error && (
              <div className="password-prompt error-message">
                <div className="error-icon">
                  <ErrorSvg />
                </div>
                <p>{error}</p>
              </div>
            )}

            <div className="accept-terms">
              <label className="accept-terms-checkbox">
                <input
                  type="checkbox"
                  {...register("terms", {
                    required: t("identity-page.create-password.errors.terms"),
                  })}
                  style={{ display: "none" }}
                />
                <span className="custom-checkbox"></span>

                <p>
                  {t("identity-page.create-password.terms-text")}{" "}
                  <a href="/termos-de-uso" target="_blank">
                    {t("identity-page.create-password.terms-link")}
                  </a>{" "}
                  {t("identity-page.create-password.and")}{" "}
                  <a href="/politica-de-privacidade" target="_blank">
                    {t("identity-page.create-password.privacy-link")}
                  </a>
                  .
                </p>
              </label>
              {errors.terms && (
                <div className="password-prompt error-message">
                  <div className="error-icon">
                    <ErrorSvg />
                  </div>
                  <p>{errors.terms.message}</p>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="identity-button"
              disabled={isLoading}
            >
              {isLoading
                ? t("identity-page.create-password.loading")
                : t("identity-page.create-password.submit")}
            </button>
          </form>

          <div className="identity-footer">
            <div className="more-info">
              <button
                onClick={toggleMoreInfo}
                className={showMoreInfo ? "active" : ""}
              >
                {t("identity-page.create-password.more-info")} <ArrowSvg />
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
          </div>
        </>
      )}
    </>
  );
}

export default CreatePasswordSection;
