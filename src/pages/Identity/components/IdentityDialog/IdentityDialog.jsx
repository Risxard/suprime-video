import "./styles.css";
import { useTranslation } from "react-i18next";

function EmailConfirmDialog({ email, onConfirm, onCancel }) {
  const { t } = useTranslation();

  return (
    <div className="dialog-box">
      <div className="identity-subtitle">
        <h1 className="identity-title">
          {t("identity-page.dialogs.email-confirm.title")}
        </h1>
        <p>
          {t("identity-page.dialogs.email-confirm.text1")} <b>{email}</b>
        </p>
      </div>

      <div className="dialog-buttons">
        {onConfirm && (
          <button type="button" className="identity-button" onClick={onConfirm}>
            {t("identity-page.dialogs.email-confirm.button-confirm")}
          </button>
        )}

        {onCancel && (
          <button type="button" className="identity-button" onClick={onCancel}>
            {t("identity-page.dialogs.email-confirm.button-cancel")}
          </button>
        )}
      </div>
    </div>
  );
}

function ReesendVerificationEmailDialog({ message1, message2, onConfirm }) {
  const { t } = useTranslation();

  const handleHelpClick = () => {
    const email = "richardsonphp@gmail.com";
    const subject = t("identity-page.dialogs.resend-verification.help-subject");
    const body = t("identity-page.dialogs.resend-verification.help-body");

    window.location.href = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="dialog-box">
      <div className="identity-subtitle">
        <h1 className="identity-title">{message1}</h1>
        <p>{message2}</p>
      </div>

      <div className="dialog-buttons">
        {onConfirm && (
          <button type="button" className="identity-button" onClick={onConfirm}>
            {t("identity-page.dialogs.resend-verification.button-ok")}
          </button>
        )}

        <button
          type="button"
          className="identity-button"
          onClick={handleHelpClick}
        >
          {t("identity-page.dialogs.resend-verification.button-help")}
        </button>
      </div>
    </div>
  );
}

function DeleteAccountDialog({ email, onConfirm, onCancel }) {
  const { t } = useTranslation();

  return (
    <div className="dialog-box danger">
      <div className="identity-subtitle">
        <h1 className="identity-title">
          {t("identity-page.dialogs.delete-account.title")}
        </h1>
        <p
          dangerouslySetInnerHTML={{
            __html: t("identity-page.dialogs.delete-account.text1", { email }),
          }}
        />
        <p
          dangerouslySetInnerHTML={{
            __html: t("identity-page.dialogs.delete-account.text2"),
          }}
        />
      </div>

      <div className="dialog-buttons">
        {onConfirm && (
          <button
            type="button"
            className="identity-button danger"
            onClick={onConfirm}
          >
            {t("identity-page.dialogs.delete-account.button-confirm")}
          </button>
        )}

        {onCancel && (
          <button type="button" className="identity-button" onClick={onCancel}>
            {t("identity-page.dialogs.delete-account.button-cancel")}
          </button>
        )}
      </div>
    </div>
  );
}

export default function IdentityDialog({
  email,
  reesend,
  deleteAccount,
  message1,
  message2,
  onConfirm,
  onCancel,
}) {
  return (
    <div className="email-confirmation-dialog">
      <div className="dialog-content">
        {deleteAccount ? (
          <DeleteAccountDialog
            email={email}
            onConfirm={onConfirm}
            onCancel={onCancel}
          />
        ) : reesend ? (
          <ReesendVerificationEmailDialog
            message1={message1}
            message2={message2}
            onConfirm={onConfirm}
          />
        ) : (
          <EmailConfirmDialog
            email={email}
            onConfirm={onConfirm}
            onCancel={onCancel}
          />
        )}
      </div>
    </div>
  );
}
