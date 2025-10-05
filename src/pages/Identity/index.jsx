import { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import logo from "../../assets/acaiwaveLogo.png";
import logoblack from "../../assets/acaiwaveLogoBlack.png";

import "./styles.css";

function Identity({ children }) {
  return (
    <div className="identity">
      <div className="identity-container">
        <Link to="/" className="identity-logo">
          <img src={logo} alt="logo" />
        </Link>

        <div className="identity-box">
          <Link to="/" className="identity-logo-black">
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
