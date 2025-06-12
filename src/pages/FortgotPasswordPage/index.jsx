import React, { useState, useEffect } from "react";

import "./styles.css";
import SignIn from "../../Components/AuthComponents/SignIn";
import background from "../../assets/background.jpg";
import Footer from "../../components/Footer/Footer";
import { Link, useParams } from "react-router-dom";
import ForgotPassword from "../../components/AuthComponents/forgotPassword";
import { useTranslation } from "react-i18next";

function FortgotPasswordPage() {
  const ref = useParams();
  const refTrue = ref?.ref === "done";

  const { t } = useTranslation();
  const forgotPasswordPage = t("forgotPasswordPage");
  const signUpNow = t("signUpNow");
  const { introMessage1, introMessage2 } = forgotPasswordPage;

  return (
    <div className="verifyPage forgotPage">
      <nav className="NavBar-verifyPage">
        <Link to="/home" className="NavLogo">
          <h2>
            Açaíwave<span>+</span>
          </h2>
        </Link>
        <Link to="./register" className="signUpNow">
          {signUpNow}
        </Link>
      </nav>

      {refTrue ? (
        <div className="Login-Intro">
          <h2>{introMessage1.title}</h2>
          <p>{introMessage1.subTitle}</p>
        </div>
      ) : (
        <div className="Login-Intro">
          <h2>{introMessage2.title}</h2>
          <p>{introMessage2.subTitle}</p>
        </div>
      )}

      <div className="Login-Background">
        <img src={background} alt="background" />
      </div>

      {!refTrue && (
        <div className="Intro-Container">
          <ForgotPassword />
        </div>
      )}

      <Footer />
    </div>
  );
}

export default FortgotPasswordPage;
