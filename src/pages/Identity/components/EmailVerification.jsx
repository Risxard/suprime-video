import { useEffect, useState } from "react";
import { sendEmailVerificationLink } from "../../../services/firebase/profileServices";
import { useNavigate } from "react-router-dom";
import IdentityDialog from "./IdentityDialog/IdentityDialog";
import LoaderOverlooping from "../assets/LoaderOverlooping";
import { auth } from "../../../services/firebase/firebaseconfig";
import { useTranslation } from "react-i18next";

const EmailVerification = () => {
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
      navigate("/identity/login/enter-email");
    }
  }, [navigate]);

  const handleResend = async (e) => {
    e.preventDefault();
    setMessage(null);
    setIsSending(true);

    try {
      if (!auth) {
        setMessage({
          message1: t("identity-page.email-verification.dialog.no-user.message1"),
          message2: t("identity-page.email-verification.dialog.no-user.message2"),
        });
        return;
      }

      const sent = await sendEmailVerificationLink(auth.currentUser);

      if (sent) {
        setMessage({
          message1: t("identity-page.email-verification.dialog.resent.message1"),
          message2: t("identity-page.email-verification.dialog.resent.message2"),
        });
      } else {
        setMessage({
          message1: t("identity-page.email-verification.dialog.error.message1"),
          message2: t("identity-page.email-verification.dialog.error.message2"),
        });
      }
    } catch (error) {
      console.error("Erro ao enviar verificação:", error);

      if (error.code === "auth/too-many-requests") {
        setMessage({
          message1: t("identity-page.email-verification.dialog.too-many.message1"),
          message2: t("identity-page.email-verification.dialog.too-many.message2"),
        });
      } else {
        setMessage({
          message1: t("identity-page.email-verification.dialog.unknown.message1"),
          message2: t("identity-page.email-verification.dialog.unknown.message2"),
        });
      }
    } finally {
      setIsSending(false);
    }
  };

  const resetMessage = () => {
    setMessage(null);
  };

  return (
    <>
      {isSending ? (
        <LoaderOverlooping />
      ) : (
        <>
          <h1 className="identity-title">
            {t("identity-page.email-verification.title")}
          </h1>

          <p className="identity-subtitle">
            {t("identity-page.email-verification.subtitle1")} <b>{email}</b>{" "}
            {t("identity-page.email-verification.subtitle2")}
          </p>

          <p className="identity-subtitle">
            {t("identity-page.email-verification.subtitle3")}
          </p>

          <p className="identity-subtitle">
            {t("identity-page.email-verification.subtitle4")}{" "}
            <a href="#" onClick={handleResend}>
              {t("identity-page.email-verification.subtitle5")}
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

export default EmailVerification;
