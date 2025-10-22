import { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import logo from "../../assets/acaiwaveLogo.png";
import logoblack from "../../assets/acaiwaveLogoBlack.png";

import "./styles.css";

function Identity({ children, updatePage }) {
  return (
    <div className={`identity ${updatePage ? "update-page" : ""}`}>
      <div className="identity-container">
        <Link to="/home" className="identity-logo">
          <img src={updatePage ? logoblack : logo} alt="logo" />
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
