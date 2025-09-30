import React, { useState, useEffect } from "react";

import "./styles.css";
import SignIn from "../../Components/AuthComponents/SignIn";
import background from "../../assets/background.jpg";
import Footer from "../../components/Footer/Footer";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import logo from "../../assets/acaiwaveLogo.png";

function EmailVerificationPage() {
  const ref = useParams();

  const { t } = useTranslation();
  const emailVerificationPage = t("emailVerificationPage");
  const signUpNow = t("signUpNow");
  const { title, subTitle, subTitle2 } = emailVerificationPage;

  return (
    <div className="verifyPage">
      <nav className="NavBar-verifyPage">
        <Link to="/home" className="NavLogo">
          <img src={logo} alt="acaiwaveplus logo" />
        </Link>

        
        <Link to="./register" className="signUpNow">
          {signUpNow}
        </Link>
      </nav>

      <div className="Login-Background">
        <img src={background} alt="background" />
      </div>

      <div className="Intro-Container">
        <div className="Register-Container verifyPageMessage">
          <h2>{title}</h2>
          <p>{subTitle}</p>

          <p>{subTitle2}</p>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default EmailVerificationPage;
