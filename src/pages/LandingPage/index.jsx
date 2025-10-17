import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "./styles.css";
import acaiwaveLogo from "../../assets/acaiwaveLogo.png";

import img440_1x from "./assets/landing-440-1x.webp";
import img440_15x from "./assets/landing-440-1.5x.webp";
import img768_1x from "./assets/landing-768-1x.webp";
import img768_15x from "./assets/landing-768-1.5x.webp";
import img1024_1x from "./assets/landing-1024-1x.webp";
import img1024_15x from "./assets/landing-1024-1.5x.webp";
import img1600_1x from "./assets/landing-1600-1x.webp";
import img1600_15x from "./assets/landing-1600-1.5x.webp";
import img1920_1x from "./assets/landing-1920-1x.webp";
import img1920_15x from "./assets/landing-1920-1.5x.webp";
import img2560_1x from "./assets/landing-2560-1x.webp";
import img2560_15x from "./assets/landing-2560-1.5x.webp";
import Footer from "../../components/Footer/Footer";

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
      <div className="landing-nav">
        <button
          className="login-btn"
          onClick={() =>
            navigate("/identity/login/enter-email")
          }
        >
          Entrar
        </button>
      </div>

      <div className="landing-page-container">
        <div className="landing-bg">
          <picture>
            <source
              media="(max-width: 440px)"
              srcSet={`${img440_1x} 1x, ${img440_15x} 1.5x`}
            />
            <source
              media="(max-width: 768px)"
              srcSet={`${img768_1x} 1x, ${img768_15x} 1.5x`}
            />
            <source
              media="(max-width: 1024px)"
              srcSet={`${img1024_1x} 1x, ${img1024_15x} 1.5x`}
            />
            <source
              media="(max-width: 1600px)"
              srcSet={`${img1600_1x} 1x, ${img1600_15x} 1.5x`}
            />
            <source
              media="(max-width: 1920px)"
              srcSet={`${img1920_1x} 1x, ${img1920_15x} 1.5x`}
            />
            <source
              media="(min-width: 1921px)"
              srcSet={`${img2560_1x} 1x, ${img2560_15x} 1.5x`}
            />

            <img src={img1600_1x} alt="Landing Background" />
          </picture>
        </div>

        <div className="landing-page-content">
          <div className="landing-page-image-container">
            <img src={acaiwaveLogo} alt="Acaiwave Logo" />
          </div>

          <h1>Descubra os melhores filmes e séries em um só lugar</h1>
          <h4>
            <b>Um acervo para você se inspirar e</b> <b>conhecer novidades</b>
          </h4>
          <p>Digite o seu e-mail para começar</p>

          <form
            className="landing-page-form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
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
                <div className="landing-input-error">
                  {errors.email.message}
                </div>
              )}
            </div>

            <div className="landing-page-button-container">
              <button type="submit">Começar agora</button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LandingPage;
