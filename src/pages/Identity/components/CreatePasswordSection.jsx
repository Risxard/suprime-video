import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import ArrowSvg from "../assets/ArrowSvg";
import ErrorSvg from "../assets/ErrorSvg";
import { createNewAccount } from "../../../services/firebase/CreateNewAccount";
import LoaderOverlooping from "../assets/LoaderOverlooping";
import "./styles.css";
import { sendEmailVerificationLink } from "../../../services/firebase/profileServices";
import { auth } from "../../../services/firebase/firebaseconfig";

function CreatePasswordSection() {
  const [isActive, setIsActive] = useState(false);
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const passwordRef = useRef(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: { password: "" },
  });

  const passwordValue = watch("password");

  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem("auth-data") || "{}");
    if (authData?.email) {
      setEmail(authData.email);
    } else {
      navigate("/identity/sign-up/enter-email");
    }
  }, [navigate]);

  const calculateStrength = (password) => {
    if (!password) return 0;

    let strength = 0;

    if (password.length >= 6) strength += 25;
    if (/[A-Z]/.test(password)) strength += 20;
    if (/[0-9]/.test(password)) strength += 20;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 20;
    if (password.length >= 12) strength += 15;

    if (password.length > 0 && strength < 25) strength = 25;

    return Math.min(strength, 100);
  };

  const getStrengthLabelAndColor = (strength) => {
    if (strength < 40) return { label: "Fraca", color: "#ff4d4f" };
    if (strength < 70) return { label: "Regular", color: "#ffcc00" };
    if (strength < 90) return { label: "Boa", color: "#4caf50" };
    return { label: "Ótima", color: "#2e7d32" };
  };

  const strength = calculateStrength(passwordValue);
  const { label: strengthLabel, color: strengthColor } =
    getStrengthLabelAndColor(strength);

  const onSubmit = async (data) => {
    setError(null);
    setIsLoading(true);
    try {
      await createNewAccount({
        email,
        password: data.password,
        name: "Novo Usuário",
      });

      await sendEmailVerificationLink(auth.currentUser);

      navigate("/identity/login/verify-email");
    } catch (err) {
      console.error(err);
      if (err.code === "auth/email-already-in-use") {
        setError("Este e-mail já está em uso. Tente outro ou faça login.");
      } else {
        setError(
          "Ocorreu um erro ao criar a conta. Certifique-se de que a senha atende aos requisitos."
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (e) => {
    e.preventDefault();
    localStorage.removeItem("auth-data");
    navigate("/identity/sign-up/enter-email");
  };

  const handleContainerClick = () => {
    setIsActive(true);
    passwordRef.current?.focus();
  };

  const handleBlur = () => {
    if (!passwordValue) setIsActive(false);
  };

  const toggleMoreInfo = () => setShowMoreInfo(!showMoreInfo);

  const passwordPattern =
    /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/;

  return (
    <>
      {isLoading ? (
        <LoaderOverlooping />
      ) : (
        <>
          <h1 className="identity-title">Crie uma conta para continuar</h1>
          <div className="identity-subtitle">
            <p>Crie sua conta com o e-mail</p>
            <b>{email}</b>{" "}
            <a href="" onClick={handleEdit}>
              (Editar)
            </a>
          </div>

          <form className="identity-form" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <div
                className={`identity-form-input-container ${
                  isActive ? "active" : ""
                }`}
                onClick={handleContainerClick}
              >
                <label htmlFor="password">Escolha sua senha</label>
                <input
                  id="password"
                  type="password"
                  className="identity-input"
                  ref={passwordRef}
                  {...register("password", {
                    required: "Senha é obrigatória",
                    minLength: { value: 6, message: "Mínimo 6 caracteres" },
                    pattern: {
                      value: passwordPattern,
                      message:
                        "Senha deve conter ao menos 1 maiúscula, 1 número e 1 caractere especial",
                    },
                  })}
                  onBlur={handleBlur}
                  disabled={isLoading}
                />
              </div>

              <div className="security-password-bar-wrapper-container">
                {passwordValue && (
                  <div
                    className="security-password-bar-wrapper"
                    style={{
                      width: "187px",
                      height: "6px",
                      backgroundColor: "#e0e0e0",
                      borderRadius: "3px",
                      marginTop: "8px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      className="security-password-bar"
                      style={{
                        width: `${(strength / 100) * 187}px`,
                        backgroundColor: strengthColor,
                        height: "100%",
                        borderRadius: "3px",
                        transition: "width 0.3s ease",
                      }}
                    ></div>
                  </div>
                )}
                {passwordValue && (
                  <p
                    className="password-strength-text"
                    style={{ color: strengthColor, marginTop: "4px" }}
                  >
                    {strengthLabel}
                  </p>
                )}
              </div>

              {errors.password && (
                <div className="password-prompt error-message">
                  <div className="error-icon">
                    <ErrorSvg />
                  </div>
                  <p>{errors.password.message}</p>
                </div>
              )}

              {error && (
                <div className="password-prompt error-message">
                  <div className="error-icon">
                    <ErrorSvg />
                  </div>
                  <p>{error}</p>
                </div>
              )}

              <div className="password-prompt">
                <p>
                  Use no mínimo 6 caracteres (com distinção entre maiúsculas e
                  minúsculas) com pelo menos um número ou caractere especial.
                </p>
              </div>
            </div>

            <button
              type="submit"
              className="identity-button"
              disabled={isLoading}
            >
              {isLoading ? "Criando conta..." : "Concordar e Continuar"}
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
          </div>
        </>
      )}
    </>
  );
}

export default CreatePasswordSection;
