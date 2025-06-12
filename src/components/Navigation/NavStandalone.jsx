import { NavLink } from "react-router-dom";
import React from "react";

var NavStandalone = () => {
  return (
    <nav className="nav-standalone">
      <NavLink to="/home" className="NavLogo">
        <h2>Açaíwave+</h2>
      </NavLink>
    </nav>
  );
};

export default NavStandalone;
