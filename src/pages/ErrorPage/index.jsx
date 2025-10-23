import { useTranslation } from "react-i18next";
import "./styles.css";
import notfroundbackground from "../../assets/404background.jpg";
import { NavLink } from "react-router-dom";
import logo from "../../assets/acaiwaveLogo.png";

const Errorpage = () => {
  const { t } = useTranslation();
  const errorPage = t("errorPage");
  const { title, description, button } = errorPage;

  return (
    <section className="error-page not-found-background-container">
      <div className="overlay-notfound" />

      <nav>
        <NavLink to="/" className="NavLogo">
          <img src={logo} alt="acaiwaveplus logo" />
        </NavLink>
      </nav>

      <div className="eror-page-content">
        <h1>A página que você estava procurando não foi encontrada.</h1>
        <p>
          Clique no botão abaixo para acessar a página de início do Açaíwave+
        </p>

        <NavLink to="/home" className="error-page-button">
          INÍCIO DO AÇAÍWAVE+
        </NavLink>
      </div>
    </section>
  );
};

export default Errorpage;
