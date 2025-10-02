import { useRef, useState } from "react";

const EmailSection = ({ onSubmit }) => {
  const [tempEmail, setTempEmail] = useState(""); // estado temporário
  const [isActive, setIsActive] = useState(false);
  const emailRef = useRef(null);

  const handleContainerClick = () => {
    setIsActive(true);
    if (emailRef.current) emailRef.current.focus();
  };

  const handleBlur = () => {
    if (tempEmail.trim() === "") setIsActive(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(tempEmail); // só altera o email "global" no submit
  };

  return (
    <>
      <h1 className="login-title">Digite o seu e-mail para continuar</h1>
      <p className="login-subtitle">
        Entre no Disney+ com a sua conta MyDisney. Se você não tiver conta,
        precisará criar uma.
      </p>

      <form className="login-form" onSubmit={handleSubmit}>
        <div
          className={`login-form-input-container ${isActive ? "active" : ""}`}
          onClick={handleContainerClick}
        >
          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            type="email"
            required
            className="login-input"
            ref={emailRef}
            value={tempEmail}
            onChange={(e) => setTempEmail(e.target.value)}
            onBlur={handleBlur}
          />
        </div>

        <button type="submit" className="login-button">
          Continuar
        </button>
      </form>

      <div className="login-footer">
        <p className="footer-title">
          O Açaíwave+ não é um serviço de streaming real.
        </p>
        <p className="login-footer-text">
          Não possui qualquer vínculo com a Disney ou qualquer uma de suas
          subsidiárias. Todos os nomes, marcas e imagens são de propriedade de
          seus respectivos donos. Este site foi criado apenas para fins de
          portfólio.
        </p>
      </div>
    </>
  );
};

export default EmailSection;
