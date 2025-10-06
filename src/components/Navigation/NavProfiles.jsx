import { NavLink } from "react-router-dom";
import React from "react";
import logo from "../../assets/acaiwaveLogo.png";
import './Navigation.css'

var NavProfiles = () => {
  return (
    <nav className="nav-profiles">
      <div className="nav-logo-profiles">
        <img src={logo} alt="acaiwaveplus logo" />
      </div>
      <button>
        Editar perfis
      </button>
    </nav>
  );
};

export default NavProfiles;
