import { NavLink } from "react-router-dom";
import React from "react";
import logo from "../../assets/acaiwaveLogo.png";

var NavStandalone = () => {
  return (
    <nav className="nav-standalone">
      <NavLink to="/home" className="NavLogo">
        <img src={logo} alt="acaiwaveplus logo" />
      </NavLink>
    </nav>
  );
};

export default NavStandalone;
