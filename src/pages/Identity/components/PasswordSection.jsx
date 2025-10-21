import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ArrowSvg from "../assets/ArrowSvg";
import ErrorSvg from "../assets/ErrorSvg";
import LoaderOverlooping from "../assets/LoaderOverlooping";
import { loginUser } from "../../../services/firebase/loginUser";
import ShowPassword from "../../../assets/ShowPassword";

function PasswordSection() {
  const [tempPassword, setTempPassword] = useState("");
  const [error, setError] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const passwordRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem("auth-data"));
    if (authData?.email) {
      setEmail(authData.email);
    } else {
      navigate("/identity/login/enter-email");
    }
  }, [navigate]);

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
    setIsLoading(true);

    if (!email) {
      setError("Email não encontrado. Volte e insira seu email novamente.");
      setIsLoading(false);
      return;
    }

    const { success, error, needsVerification } = await loginUser(
      email,
      tempPassword
    );

    if (success) {
      navigate("/home");
    } else if (needsVerification) {
      navigate("/identity/login/verify-email");
      setError(error);
    } else {
      setError(error);
    }

    setIsLoading(false);
  };

  const handleEdit = (e) => {
    e.preventDefault();
    localStorage.removeItem("auth-data");
    navigate("/identity/login/enter-email");
  };

  const toggleMoreInfo = () => setShowMoreInfo(!showMoreInfo);

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  return (
    <>
      {isLoading ? (
        <LoaderOverlooping />
      ) : (
        <>
          <h1 className="identity-title">Digite a senha</h1>
          <div className="identity-subtitle">
            <p>Entre no Açaíwave+ com sua conta usando o e⁠-⁠mail</p>
            <b>{email}</b>{" "}
            <a href="" onClick={handleEdit}>
              (Editar)
            </a>
          </div>

          <form className="identity-form" onSubmit={handleSubmit}>
            <div>
              <div
                className={`identity-form-input-container ${
                  isActive ? "active" : ""
                }`}
                onClick={handleContainerClick}
              >
                <label htmlFor="password">Senha</label>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="identity-input"
                  ref={passwordRef}
                  value={tempPassword}
                  onChange={(e) => setTempPassword(e.target.value)}
                  onBlur={handleBlur}
                  disabled={isLoading}
                />
                <div className="show-password">
                  <button
                    type="button"
                    onClick={toggleShowPassword}
                    aria-label={
                      showPassword ? "Ocultar senha" : "Mostrar senha"
                    }
                  >
                    <ShowPassword showPassword={showPassword} />
                  </button>
                </div>
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

            <button
              type="submit"
              className="identity-button"
              disabled={isLoading}
            >
              {isLoading ? "Entrando..." : "Entrar"}
            </button>
          </form>

          <div className="identity-footer">
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
                  <p className="identity-footer-text">
                    Não possui qualquer vínculo com a Disney ou suas
                    subsidiárias. Todos os nomes, marcas e imagens são de seus
                    respectivos donos.
                  </p>
                </div>
              )}
            </div>

            <a href="">Não consegue entrar? redefina sua senha</a>
          </div>
        </>
      )}
    </>
  );
}

export default PasswordSection;
