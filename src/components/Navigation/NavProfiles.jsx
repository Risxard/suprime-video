import { NavLink } from "react-router-dom";
import React from "react";
import logo from "../../assets/acaiwaveLogo.png";
import "./Navigation.css";

const NavProfiles = ({ onSubmitNavBtn, text }) => {
  return (
    <nav className="nav-profiles">
      <div className="nav-logo-profiles">
        <img src={logo} alt="acaiwaveplus logo" />
      </div>
      <button onClick={() => onSubmitNavBtn()}>{text}</button>
    </nav>
  );
};

export default NavProfiles;
