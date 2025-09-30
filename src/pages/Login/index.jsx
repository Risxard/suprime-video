import React, { useState, useEffect } from "react";

import "./styles.css";
import logo from '../../assets/acaiwaveLogo.png';
import SignIn from "../../Components/AuthComponents/SignIn";
import background from "../../assets/background.jpg";
import Footer from "../../components/Footer/Footer";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
function Login() {
  const { t } = useTranslation();
  const loginPage = t("loginPage");
  const signUpNow = t("signUpNow");
  const { title, subtitle } = loginPage;

  return (
    <div className="Login">
      <nav className="NavBar-Login">
        <Link to="/home" className="NavLogo">
          <img src={logo} alt="acaiwaveplus logo" />
        </Link>
        <Link to="./register" className="signUpNow">
          {signUpNow}
        </Link>
      </nav>

      <div className="Login-Intro">
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>
      <div className="Login-Background">
        <img src={background} alt="background" />
      </div>
      <div className="Intro-Container">
        <div className="H1-Container"></div>
        <SignIn />
      </div>

      <Footer />
    </div>
  );
}

export default Login;
