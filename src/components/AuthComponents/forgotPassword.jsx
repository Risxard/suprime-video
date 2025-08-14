import React, { useState } from "react";
import { X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import "./styles.css";
import { sendResetPasswordEmail } from "../../services/firebase/profileServices.js";
import { useTranslation } from "react-i18next";

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const { t } = useTranslation();
  const forgotPasswordPage = t("forgotPasswordPage");
  const forgotPasswordPageErros = t("forgotPasswordPage.errors");
  const {emailInvalid, emailRequired} = forgotPasswordPageErros;
  const signUpNow = t("signUpNow");
  const { emailAdress, sendBtn, sendingBtn, haveAccount, signUp } = forgotPasswordPage;


 

  const schema = z.object({
    email: z
      .string()
      .email(emailInvalid)
      .nonempty(emailRequired),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    const result = schema.safeParse({ email });

    if (!result.success) {
      const formattedErrors = result.error.format();
      setErrors({
        email: formattedErrors.email?._errors?.[0],
      });
      setIsSubmitting(false);
      return;
    } else {
      setErrors({});
    }

    setLoading(true);
    setApiError("");
    try {
      await sendResetPasswordEmail(email);
      navigate("./done");
    } catch (err) {
      setApiError("Email não encontrado no banco de dados.");
    }
    setLoading(false);
    setIsSubmitting(false);
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
      {errors.email && <div className="error">{errors.email}</div>}
      {apiError && <div className="error">{apiError}</div>}
      <div className="reg-btns-container">
        <button type="submit" className="reg-btn" disabled={loading}>
          {loading ? sendingBtn : sendBtn}
        </button>
      </div>
      <span className="signup-link">
        <Link to="/register">
          {haveAccount} <span>{signUp}</span>
        </Link>
      </span>
    </form>
  );
}

export default ForgetPassword;
