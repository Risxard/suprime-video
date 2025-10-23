import React, { useState } from "react";
import { EyeOff, Eye, X } from "lucide-react";
import { Link } from "react-router-dom";
import { z } from "zod";
import "./styles.css";
import useLogin from "../../hooks/Auth/useLogin";
import { useTranslation } from "react-i18next";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { login, loading, error} = useLogin();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);


  const { t } = useTranslation();
  const loginPage = t("loginPage");
  const loginPageErrors = t("loginPage.errors");
  const {
    emailAdress,
    loginEnterBtn,
    loginSignInBtn,
    dontHaveAccount,
    signUp,
    forgotPassword,
  } = loginPage;
  const {
    emailInvalid,
    emailRequired,
    passwordMin,
    passwordMax,
    passwordRequired,
  } = loginPageErrors;

  const schema = z.object({
    email: z.string().email(emailInvalid).min(1, emailRequired),

    password: z
      .string()
      .min(5, passwordMin)
      .max(25, passwordMax)
      .min(1, passwordRequired),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    const result = schema.safeParse({ email, password });

    if (!result.success) {
      const formattedErrors = result.error.format();
      setErrors({
        email: formattedErrors.email?._errors?.[0],
        password: formattedErrors.password?._errors?.[0],
      });
    } else {
      setErrors({});
      await login(email, password);
    }

    setIsSubmitting(false);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const isEmailActive = email.length > 0;
  const clearInput = () => () => {
    setEmail("");
  };

  return (
<div className="login-container">
      <div className="login-box">

        <h1 className="login-logo">
          <span className="my">My</span>
          <span className="disney">Disney</span>
        </h1>

        <h2 className="login-title">Digite o seu e-mail para continuar</h2>
        <p className="login-subtitle">
          Entre no Disney+ com a sua conta MyDisney. Se você não tiver conta, precisará criar uma.
        </p>

        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="login-input"
          />
          <button type="submit" className="login-button">
            Continuar
          </button>
        </form>

        <div className="login-footer">
          <p className="footer-title">
            O Disney+ faz parte das empresas do grupo Walt Disney
          </p>
          <p className="footer-text">
            Com o MyDisney, você pode entrar em serviços e experiências das empresas do grupo Walt
            Disney, como Disney+, ESPN, Walt Disney World e{" "}
            <a href="#">muito mais</a>.
          </p>

          <div className="footer-logos">
            <span>Disney</span>
            <span>ABC</span>
            <span>ESPN</span>
            <span>Marvel</span>
            <span>Star Wars</span>
            <span>Hulu</span>
            <span>National Geographic</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
