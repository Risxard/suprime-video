import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { auth } from "../../../services/firebase/firebaseconfig";
import IdentityDialog from "./IdentityDialog/IdentityDialog";
import LoaderOverlooping from "../assets/LoaderOverlooping";
import { useNavigate } from "react-router-dom";
import ShowPassword from "../../../assets/ShowPassword";
import ErrorSvg from "../assets/ErrorSvg";
import { userServices } from "../../../services/firebase/userServices";
import { useTranslation } from "react-i18next";

const DeleteAccount = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const passwordRef = useRef(null);

  const navigate = useNavigate();
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
  } = useForm();

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  const handleContainerClick = () => {
    setIsActive(true);
    passwordRef.current?.focus();
  };

  const handleBlur = (value) => {
    if (!value) setIsActive(false);
  };

  const handleRequestDelete = handleSubmit(() => {
    setShowDialog(true);
  });

  const handleDeleteAccount = async (data) => {
    setIsLoading(true);
    setShowDialog(false);

    const user = auth.currentUser;
    if (!user) {
      setError("firebase", {
        type: "manual",
        message: t("identity-page.delete-account.dialog.no-user"),
      });
      setIsLoading(false);
      return;
    }

    try {
      const credential = EmailAuthProvider.credential(user.email, data.password);
      await reauthenticateWithCredential(user, credential);

      await userServices.deleteUser();
      await auth.signOut();
      localStorage.clear();

      setIsLoading(false);
      navigate("/");
    } catch (error) {
      console.error("Erro ao excluir conta:", error);

      if (error.code === "auth/wrong-password") {
        setError("password", {
          type: "manual",
          message: t("identity-page.delete-account.errors.wrong-password"),
        });
      } else if (error.code === "auth/too-many-requests") {
        setError("firebase", {
          type: "manual",
          message: t("identity-page.delete-account.errors.too-many"),
        });
      } else if (error.response?.status === 401) {
        setError("firebase", {
          type: "manual",
          message: t("identity-page.delete-account.errors.session-expired"),
        });
      } else {
        setError("firebase", {
          type: "manual",
          message: t("identity-page.delete-account.errors.unknown"),
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setShowDialog(false);
    navigate("/");
  };

  const user = auth.currentUser;
  const email = user?.email || "";

  return (
    <>
      {isLoading ? (
        <LoaderOverlooping />
      ) : (
        <>
          <h1 className="identity-title">
            {t("identity-page.delete-account.title")}
          </h1>

          <p className="identity-subtitle">
            {t("identity-page.delete-account.subtitle1")} <b>{email}</b>. <br />
            {t("identity-page.delete-account.subtitle2")}
          </p>

          <form className="identity-form" onSubmit={handleRequestDelete}>
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
                className="identity-input"
                ref={passwordRef}
                {...register("password", {
                  required: t("identity-page.delete-account.errors.required"),
                })}
                onBlur={() => handleBlur(watch("password"))}
                disabled={isLoading}
              />
              <div className="show-password">
                <button
                  type="button"
                  onClick={toggleShowPassword}
                  aria-label={
                    showPassword
                      ? t("Ocultar senha")
                      : t("Mostrar senha")
                  }
                >
                  <ShowPassword showPassword={showPassword} />
                </button>
              </div>
            </div>

            {errors.password && (
              <div className="password-prompt error-message">
                <div className="error-icon">
                  <ErrorSvg />
                </div>
                <p>{errors.password.message}</p>
              </div>
            )}
            {errors.firebase && (
              <div className="password-prompt error-message">
                <div className="error-icon">
                  <ErrorSvg />
                </div>
                <p>{errors.firebase.message}</p>
              </div>
            )}

            <div className="dialog-buttons">
              <button
                type="submit"
                className="identity-button"
                disabled={isLoading}
              >
                {t("identity-page.delete-account.button-confirm")}
              </button>
              <button
                type="button"
                className="identity-button"
                onClick={handleCancel}
              >
                {t("identity-page.delete-account.button-cancel")}
              </button>
            </div>
          </form>
        </>
      )}

      {showDialog && (
        <IdentityDialog
          deleteAccount={true}
          email={email}
          onConfirm={handleSubmit(handleDeleteAccount)}
          onCancel={() => setShowDialog(false)}
        />
      )}
    </>
  );
};

export default DeleteAccount;
