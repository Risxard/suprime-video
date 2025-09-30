import React from "react";

import "./styles.css";

import background from "../../assets/background.jpg";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import { useTranslation } from "react-i18next";
import SignUp from "../../components/AuthComponents/SignUp";
import logo from '../../assets/acaiwaveLogo.png';

function Register() {
  const { t } = useTranslation();
  const registerPage = t("registerPage");
  const { title, subTitle, signInNow} = registerPage;
  return (
    <div className="Register">
      <div className="Login-Background">
        <img src={logo} alt="acaiwaveplus logo" />
      </div>

      <nav className="NavBar-Login">
        <Link to="/" className="NavLogo">
          <img src={logo} alt="acaiwaveplus logo" />
        </Link>
        <Link to="/" className="signUpNow">
          {signInNow}
        </Link>
      </nav>
      <div className="Login-Intro">
        <h2>{title}</h2>
        <p>{subTitle}</p>
      </div>
      <div className="Intro-Container">
        <SignUp />
      </div>

      <Footer />
    </div>
  );
}

export default Register;
