import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "./styles.css";
import acaiwaveLogo from "../../assets/acaiwaveLogo.png";

const LandingPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const expiresInMinutes = 10;
    const expirationTime = Date.now() + expiresInMinutes * 60 * 1000;

    const authData = {
      email: data.email.trim(),
      entryPoint: "Register",
      expires: expirationTime,
    };

    localStorage.setItem("auth-data", JSON.stringify(authData));
    navigate("/identity/sign-up/create-password");
  };

  return (
    <div className="landing-page">
      <div className="landing-page-container">
        <div className="landing-page-content">
          <div className="landing-page-image-container">
            <img src={acaiwaveLogo} alt="Acaiwave Logo" />
          </div>

          <h1>
            Séries exclusivas, sucessos do cinema, esportes com a ESPN e muito mais
          </h1>
          <h4>
            <b>Escolha um plano a partir de</b> <b> R$ 27,99/mês</b>
          </h4>
          <p>Digite o seu e-mail para começar</p>


          <form className="landing-page-form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="landing-page-input-container">
              <input
                type="email"
                placeholder="E-mail"
                {...register("email", {
                  required: "Digite um e-mail.",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Digite um endereço de e-mail válido.",
                  },
                })}
              />


              {errors.email && (
                <div className="landing-input-error">{errors.email.message}</div>
              )}
            </div>

            <div className="landing-page-button-container">
              <button type="submit">Assinar agora</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
