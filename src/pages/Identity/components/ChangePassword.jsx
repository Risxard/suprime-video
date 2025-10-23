import { useEffect, useState } from "react";
import { sendResetPasswordEmail } from "../../../services/firebase/profileServices";
import { useNavigate } from "react-router-dom";
import IdentityDialog from "./IdentityDialog/IdentityDialog";
import LoaderOverlooping from "../assets/LoaderOverlooping";
import { useTranslation } from "react-i18next";

const ChangePassword = () => {
  const [message, setMessage] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const [email, setEmail] = useState("");

  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem("auth-data") || "{}");
    if (authData?.email) {
      setEmail(authData.email);
    } else {
      navigate("/identity/update-credentials/enter-email");
    }
  }, [navigate]);

  const handleResend = async (e) => {
    e.preventDefault();
    setMessage(null);
    setIsSending(true);

    try {
      if (!email) {
        setMessage({
          message1: t("identity-page.change-password.dialog.no-email.message1"),
          message2: t("identity-page.change-password.dialog.no-email.message2"),
        });
        return;
      }

      const sent = await sendResetPasswordEmail(email);

      if (sent) {
        setMessage({
          message1: t("identity-page.change-password.dialog.resent.message1"),
          message2: t("identity-page.change-password.dialog.resent.message2"),
        });
      } else {
        setMessage({
          message1: t("identity-page.change-password.dialog.error.message1"),
          message2: t("identity-page.change-password.dialog.error.message2"),
        });
      }
    } catch (error) {
      console.error("Erro ao enviar e-mail de redefinição:", error);

      if (error.code === "auth/too-many-requests") {
        setMessage({
          message1: t("identity-page.change-password.dialog.too-many.message1"),
          message2: t("identity-page.change-password.dialog.too-many.message2"),
        });
      } else if (error.code === "auth/user-not-found") {
        setMessage({
          message1: t("identity-page.change-password.dialog.not-found.message1"),
          message2: t("identity-page.change-password.dialog.not-found.message2"),
        });
      } else {
        setMessage({
          message1: t("identity-page.change-password.dialog.unknown.message1"),
          message2: t("identity-page.change-password.dialog.unknown.message2"),
        });
      }
    } finally {
      setIsSending(false);
    }
  };

  const resetMessage = () => setMessage(null);

  return (
    <>
      {isSending ? (
        <LoaderOverlooping />
      ) : (
        <>
          <h1 className="identity-title">
            {t("identity-page.change-password.title")}
          </h1>

          <p
            className="identity-subtitle"
            dangerouslySetInnerHTML={{
              __html: t("identity-page.change-password.subtitle1", { email }),
            }}
          />

          <p className="identity-subtitle">
            {t("identity-page.change-password.subtitle2")}
          </p>

          <p className="identity-subtitle">
            {t("identity-page.change-password.subtitle3", {
              interpolation: { escapeValue: false },
            }).replace(
              "<a>",
              `<a href="#" onclick="return false;" id='resend-link'>`
            )}
          </p>

          <p className="identity-subtitle">
            {t("identity-page.change-password.subtitle4")}{" "}
            <a href="#" onClick={handleResend}>
              {t("identity-page.change-password.subtitle5")}
            </a>
          </p>
        </>
      )}

      {message && (
        <IdentityDialog
          reesend={true}
          message1={message.message1}
          message2={message.message2}
          onConfirm={resetMessage}
        />
      )}
    </>
  );
};

export default ChangePassword;
