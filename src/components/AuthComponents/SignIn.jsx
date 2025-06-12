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
    <form className="Register-Container" onSubmit={handleSubmit}>
      <span className="reg-box-label">
        <p>{emailAdress}</p>
      </span>
      <div className="reg-box">
        <input
          className="name-input"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <span
          className={`input-inner-Btn clearInput-Btn ${
            isEmailActive && "active"
          }`}
          onClick={clearInput()}
        >
          <X className="inputIcons" />
        </span>
      </div>
      {errors.email && <p className="error-message">{errors.email}</p>}

      <span className="reg-box-label">
        <p>{loginPage.password}</p>
      </span>
      <div className="reg-box">
        <input
          className="name-input"
          type={showPassword ? "text" : "password"}
          value={password}
          autoComplete="new-password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <span className="input-inner-Btn" onClick={handleShowPassword}>
          {showPassword === true ? (
            <Eye className="inputIcons" />
          ) : (
            <EyeOff className="inputIcons" />
          )}
        </span>
      </div>
      {errors.password && <p className="error-message">{errors.password}</p>}
      {error && (
        <p className="error-message">
          Credenciais inválidas. Verifique seu e-mail e senha.
        </p>
      )}
      <div className="reg-btns-container">
        <button type="submit" className="reg-btn">
          {loading ? loginSignInBtn : loginEnterBtn}
        </button>
      </div>

      <span className="signup-link">
        <Link to="/register">
          {dontHaveAccount} <span>{signUp}</span>
        </Link>
      </span>

      <span className="forgetpassword">
        <Link to="./forgot">{forgotPassword}</Link>
      </span>
    </form>
  );
}

export default SignIn;
