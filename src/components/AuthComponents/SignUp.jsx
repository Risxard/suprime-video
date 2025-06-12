import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Eye, EyeOff, KeyRound, Mail, User } from "lucide-react";
import createNewAccount from "../../services/firebase/registerAccount";
import { useTranslation } from "react-i18next";

function SignUp() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const { t } = useTranslation();
  const registerPage = t("registerPage");
  const {
    firstName,
    yourEmail,
    yourPassword,
    confirmPassword,
    registerBtn,
    registeringBtn,
    haveAccount,
    signInNow,
  } = registerPage;

  const {
    nameMin,
    emailInvalid,
    emailMin,
    passwordMin,
    confirmPasswordMin,
    passwordsNotMatch,
  } = t("registerPage.errors");

  const createUserFormSchema = z
    .object({
      name: z.string().min(6, nameMin),
      email: z.string().email(emailInvalid).min(6, emailMin),
      password: z.string().min(6, passwordMin),
      confirmPassword: z.string().min(6, confirmPasswordMin),
    })
    .refine((values) => values.password === values.confirmPassword, {
      message: passwordsNotMatch,
      path: ["confirmPassword"],
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createUserFormSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      await createNewAccount(data);
      setLoading(false);
      navigate("/");
    } catch (error) {
      setLoading(false);
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="Register-Container">
      <span className="reg-box-label">
        <p>{firstName}</p>
      </span>
      <div className="reg-box">
        <input
          id="user-name"
          className="name-input"
          type="text"
          autoComplete="given-name"
          {...register("name")}
        />
      </div>
      {errors.name && <p className="error-message">{errors.name.message}</p>}

      <span className="reg-box-label">
        <p>{yourEmail}</p>
      </span>
      <div className="reg-box">
        <input
          id="user-email"
          className="name-input"
          type="email"
          autoComplete="email"
          {...register("email")}
        />
      </div>
      {errors.email && <p className="error-message">{errors.email.message}</p>}

      <span className="reg-box-label">
        <p>{yourPassword}</p>
      </span>
      <div className="reg-box">
        <input
          id="user-password"
          className="name-input"
          type={showPassword ? "text" : "password"}
          autoComplete="new-password"
          {...register("password")}
        />
        <span className="input-inner-Btn" onClick={handleShowPassword}>
          {showPassword === true ? (
            <Eye className="inputIcons" />
          ) : (
            <EyeOff className="inputIcons" />
          )}
        </span>
      </div>
      {errors.password && (
        <p className="error-message">{errors.password.message}</p>
      )}

      <span className="reg-box-label">
        <p>{confirmPassword}</p>
      </span>
      <div className="reg-box">
        <input
          id="user-password-confirm"
          className="name-input"
          type={showPassword ? "text" : "password"}
          autoComplete="new-password"
          {...register("confirmPassword")}
        />
        <span className="input-inner-Btn" onClick={handleShowPassword}>
          {showPassword === true ? (
            <Eye className="inputIcons" />
          ) : (
            <EyeOff className="inputIcons" />
          )}
        </span>
      </div>
      {errors.confirmPassword && (
        <p className="error-message">{errors.confirmPassword.message}</p>
      )}

      <div className="reg-btns-container">
        <button
          className="reg-btn"
          id="signUpBtn"
          type="submit"
          disabled={loading}
        >
          <p>{loading ? registeringBtn : registerBtn}</p>
        </button>
      </div>

      <span className="newTo">
        <p>{haveAccount}</p>
        <Link to={"/"}>
          <strong>{signInNow}</strong>
        </Link>
      </span>
    </form>
  );
}

export default SignUp;
