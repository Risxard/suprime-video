import "./styles.css";

export default function LoginDialog({ email, onConfirm, onCancel }) {
  return (
    <div className="email-confirmation-dialog">
      <div className="dialog-content">
        <div className="dialog-box">
          <div className="login-subtitle">
            <h1 className="login-title">Confirme seu e-mail</h1>
            <p>
              Antes de criar a conta, confira se o seu endereço de e-mail está
              correto:
            </p>
            <b>{email}</b>
          </div>

          <div className="dialog-buttons">
            <button
              type="button"
              className="login-button"
              onClick={onConfirm}
            >
              Confirmar
            </button>

            <button
              type="button"
              className="login-button"
              onClick={onCancel}
            >
              Voltar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
