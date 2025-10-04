import { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import logo from "../../assets/acaiwaveLogo.png";
import logoblack from "../../assets/acaiwaveLogoBlack.png";

import "./styles.css";

function Identity({ children }) {
  return (
    <div className="Login">
      <div className="login-container">
        <Link to="/" className="login-logo">
          <img src={logo} alt="logo" />
        </Link>

        <div className="login-box">
          <Link to="/" className="login-logo-black">
            <img src={logoblack} alt="logo black" />
          </Link>

          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Identity;
