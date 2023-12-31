import React from "react";
import { NavLink } from "react-router-dom";
import "./MenuSlider.css";

import {Home} from 'lucide-react'


var menuslider = () => {
  return (
    <ul className="Menu-Slider">
    <li>
      <NavLink to="/suprime-video/home" className="NavLinks">
        <Home/>
      </NavLink>
    </li>

    <li>
      <NavLink to="/suprime-video/movies" className="NavLinks">
        Movies
      </NavLink>
    </li>
    <li>
      <NavLink to="/suprime-video/tv-series" className="NavLinks">
        TV Shows
      </NavLink>
    </li>
  </ul>
  );
};

export default menuslider;
