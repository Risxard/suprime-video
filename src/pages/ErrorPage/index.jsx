import { useTranslation } from "react-i18next";
import "./styles.css";
import { NavLink } from "react-router-dom";
import logo from "../../assets/acaiwaveLogo.png";

const Errorpage = () => {
  const { t } = useTranslation();
  const errorPage = t("error-page");
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
        <h1>{title}</h1>
        <p>{description}</p>

        <NavLink to="/home" className="error-page-button">
          {button}
        </NavLink>
      </div>
    </section>
  );
};

export default Errorpage;
