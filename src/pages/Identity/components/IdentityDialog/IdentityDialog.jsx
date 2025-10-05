import "./styles.css";

function EmailConfirmDialog({ email, onConfirm, onCancel }) {
  return (
    <div className="dialog-box">
      <div className="identity-subtitle">
        <h1 className="identity-title">Confirme seu e-mail</h1>
        <p>
          Antes de criar a conta, confira se o seu endereço de e-mail está
          correto: <b>{email}</b>
        </p>
      </div>

      <div className="dialog-buttons">
        {onConfirm && (
          <button type="button" className="identity-button" onClick={onConfirm}>
            Confirmar
          </button>
        )}

        {onCancel && (
          <button type="button" className="identity-button" onClick={onCancel}>
            Voltar
          </button>
        )}
      </div>
    </div>
  );
}

function ReesendVerificationEmailDialog({ message1, message2, onConfirm }) {
  const handleHelpClick = () => {
    const email = "richardsonphp@gmail.com";
    const subject = "Ajuda com verificação de e-mail";
    const body = "Olá, preciso de ajuda com a verificação de e-mail no Açaíwave+.";

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
            OK
          </button>
        )}

        <button
          type="button"
          className="identity-button"
          onClick={handleHelpClick}
        >
          Central de Ajuda
        </button>
      </div>
    </div>
  );
}


export default function IdentityDialog({
  email,
  reesend,
  message1,
  message2,
  onConfirm,
  onCancel,
}) {
  return (
    <div className="email-confirmation-dialog">
      <div className="dialog-content">
        {reesend ? (
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
