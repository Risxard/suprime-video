import { useRef, useState } from "react";
import ArrowSvg from "../assets/ArrowSvg";

function PasswordSection({ email }) {
  const [tempPassword, setTempPassword] = useState("");
  const [password, setPassword] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [showMoreInfo, setShowMoreInfo] = useState(false); // estado de toggle
  const passwordRef = useRef(null);

  const handleContainerClick = () => {
    setIsActive(true);
    if (passwordRef.current) passwordRef.current.focus();
  };

  const handleBlur = () => {
    if (tempPassword.trim() === "") setIsActive(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPassword(tempPassword);
  };

  const toggleMoreInfo = () => {
    setShowMoreInfo(!showMoreInfo);
  };

  return (
    <>
      <h1 className="login-title">Digite a senha</h1>
      <div className="login-subtitle">
        <p>Entre no Açaíwave+ com sua conta usando o e⁠-⁠mail</p>
        <b>{email}</b> <a href="">(Editar)</a>
      </div>

      <form className="login-form" onSubmit={handleSubmit}>
        <div>
          <div
            className={`login-form-input-container ${isActive ? "active" : ""}`}
            onClick={handleContainerClick}
          >
            <label htmlFor="password">Senha</label>
            <input
              id="password"
              type="password"
              required
              className="login-input"
              ref={passwordRef}
              value={tempPassword}
              onChange={(e) => setTempPassword(e.target.value)}
              onBlur={handleBlur}
            />
          </div>
          <div className="password-prompt">
            <p>(Maiúsculas e minúsculas)</p>
          </div>
        </div>

        <button type="submit" className="login-button">
          Entrar
        </button>
      </form>

      <div className="login-footer">
        <div className="more-info">
          <button
            onClick={toggleMoreInfo}
            className={`${showMoreInfo ? "active" : ""}`}
          >
            Saiba mais sobre o Açaíwave+ <ArrowSvg />
          </button>

          {showMoreInfo && (
            <div className="more-info-content">
              <p className="footer-title">
                O Açaíwave+ não é um serviço de streaming real.
              </p>
              <p className="login-footer-text">
                Não possui qualquer vínculo com a Disney ou qualquer uma de suas
                subsidiárias. Todos os nomes, marcas e imagens são de
                propriedade de seus respectivos donos. Este site foi criado
                apenas para fins de portfólio.
              </p>
            </div>
          )}
        </div>

        <a href="">Não consegue entrar? Solicite um código de acesso único</a>
      </div>
    </>
  );
}

export default PasswordSection;