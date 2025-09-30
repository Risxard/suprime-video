import { NavLink, Link } from "react-router-dom";
import React, { useEffect, useState, useRef } from "react";
import "./Navigation.css";
import UserMenu from "./UserMenu/UserMenu";
import logo from "../../assets/acaiwaveLogo.png";
import { useTranslation } from "react-i18next";
import HomeSvg from "./Icons/HomeSvg.jsx";
import i18n from "../../i18n.js";
import BrowseSvg from "./Icons/BrowseSvg.jsx";
import WatchlistSvg from "./Icons/WatchlistSvg.jsx";
import TvSvg from "./Icons/TvSvg.jsx";

import StarSvg from "./Icons/StarSvg.jsx";
import MoviesSvg from "./Icons/MoviesSvg.jsx";
import ExtendedMenu from "./ExtendedMenu/index.jsx";

var Nav = () => {
  const language = i18n.language;

  const { t } = useTranslation();

  const navigationMenu = t("navigation.menu");
  const { home, movies, tvShows, sports, liveTv, subscriptions } =
    navigationMenu;

  useEffect(() => {
    const handleScroll = () => {
      const nav = document.getElementById("nav");
      if (window.scrollY > 0) {
        nav.classList.add("active");
      } else {
        nav.classList.remove("active");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className="Navigation" id="nav">
      <div className="nav-container">
        <div className="nav-content">
          <div className="nav-content-align">
            <NavLink to="/home" className="NavLogo">
              <img src={logo} alt="acaiwaveplus logo" />
            </NavLink>

            <ul className="NavigationLinks" id="nav-links">
              <li>
                <Link to="/home">
                  <span>
                    <HomeSvg />
                  </span>
                  <p>{home}</p>
                </Link>
              </li>

              <li>
                <Link to="/search/kw=batman">
                  <span>
                    <BrowseSvg />
                  </span>
                  <p>Pesquisa</p>
                </Link>
              </li>
              <li>
                <Link to="/tv-series">
                  <span>
                    <WatchlistSvg />
                  </span>
                  <p>Minha lista</p>
                </Link>
              </li>

              <li>
                <Link to="/movies">
                  <span>
                    <MoviesSvg />
                  </span>
                  <p>{movies}</p>
                </Link>
              </li>

              <li>
                <Link to="/tv-series">
                  <span>
                    <TvSvg />
                  </span>
                  <p>{tvShows}</p>
                </Link>
              </li>

              <li>
                <Link to="/tv-series">
                  <span>
                    <StarSvg />
                  </span>
                  <p>Originais</p>
                </Link>
              </li>
            </ul>

            <ExtendedMenu />
          </div>

          <UserMenu></UserMenu>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
