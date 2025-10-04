import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ArrowSvg from "../assets/ArrowSvg";
import ErrorSvg from "../assets/ErrorSvg";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

function PasswordSection() {
  const [tempPassword, setTempPassword] = useState("");
  const [error, setError] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const passwordRef = useRef(null);
  const navigate = useNavigate();


  const [email, setEmail] = useState("");
  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem("auth-data"));
    if (authData?.email) setEmail(authData.email);
  }, []);

  const handleContainerClick = () => {
    setIsActive(true);
    passwordRef.current?.focus();
  };

  const handleBlur = () => {
    if (!tempPassword.trim()) setIsActive(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!email) {
      setError("Email não encontrado. Volte e insira seu email novamente.");
      return;
    }

    try {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, tempPassword);
    } catch (err) {
      console.error(err);
      setError(
        "Não foi possível entrar. Digite seu e-mail e senha novamente ou redefina sua senha."
      );
    }
  };


  const handleEdit = (e) => {
    e.preventDefault();
    localStorage.removeItem("auth-data");
    navigate("/login/enter-email");
  };

  const toggleMoreInfo = () => setShowMoreInfo(!showMoreInfo);

  return (
    <>
      <h1 className="login-title">Digite a senha</h1>
      <div className="login-subtitle">
        <p>Entre no Açaíwave+ com sua conta usando o e⁠-⁠mail</p>
        <b>{email}</b>{" "}
        <a href="" onClick={handleEdit}>
          (Editar)
        </a>
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

          {error && (
            <div className="password-prompt error-message">
              <div className="error-icon">
                <ErrorSvg />
              </div>
              <p>{error}</p>
            </div>
          )}

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
            className={showMoreInfo ? "active" : ""}
          >
            Saiba mais sobre o Açaíwave+ <ArrowSvg />
          </button>

          {showMoreInfo && (
            <div className="more-info-content">
              <p className="footer-title">
                O Açaíwave+ não é um serviço de streaming real.
              </p>
              <p className="login-footer-text">
                Não possui qualquer vínculo com a Disney ou suas subsidiárias.
                Todos os nomes, marcas e imagens são de seus respectivos donos.
              </p>
            </div>
          )}
        </div>

        <a href="">Não consegue entrar? redefina sua senha</a>
      </div>
    </>
  );
}

export default PasswordSection;
