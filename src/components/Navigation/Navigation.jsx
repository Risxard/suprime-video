import { NavLink, Link } from "react-router-dom";
import React, { useEffect, useState, useRef } from "react";
import "./Navigation.css";
import Pesquisa from "./Search/SearchDropDown.jsx";
import UserMenu from "./UserMenu/UserMenu";

import logo from "../../assets/acaiwaveLogo.png";
import acaiWaveTitle from "../../assets/acaiWaveTitle.png";
import SearchComponent from "./Search/SearchDropDown.jsx";

import { connect } from "react-redux";
import { useMatch } from "react-router-dom";
import SubscriptionsSvg from "./Subscription/SubscriptionsSvg.jsx";
import CategoriesDropDown from "./Categories/CategoriesDropDown.jsx";
import MyStuffsDropDown from "./MyStuffs/MyStuffsDropDown.jsx";
import HamMenu from "./HamMenu/HamMenu.jsx";
import DropdownContainer from "./Layout/DropdownContainer/Index.jsx";
import { useTranslation } from "react-i18next";

var NavMenu = () => {
  const homeMatch = useMatch("/home");
  const moviesMatch = useMatch("/movies");
  const tvMatch = useMatch("/tv-series");
  const sportsMatch = useMatch("/sports");
  const liveTvMatch = useMatch("/live-tv");

  const { t } = useTranslation();

  const navigationMenu = t("navigation.menu");
  const { home, movies, tvShows, sports, liveTv, subscriptions } =
    navigationMenu;

  useEffect(() => {
    const navLinks = document.querySelectorAll("#nav-links li");

    navLinks.forEach((link) => {
      link.classList.remove("active-page");
    });

    if (homeMatch) {
      navLinks[0].classList.add("active-page");
    } else if (moviesMatch) {
      navLinks[1].classList.add("active-page");
    } else if (tvMatch) {
      navLinks[2].classList.add("active-page");
    } else if (sportsMatch) {
      navLinks[3].classList.add("active-page");
    } else if (liveTvMatch) {
      navLinks[4].classList.add("active-page");
    }
  }, [homeMatch, moviesMatch, tvMatch, sportsMatch, liveTvMatch]);

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
          <div>
            <HamMenu />

            <NavLink to="/home" className="NavLogo">
              <img src={logo} alt="acaiwaveplus logo" />
            </NavLink>

            <ul className="NavigationLinks" id="nav-links">
              <li>
                <Link to="/home">
                  <p>{home}</p>
                </Link>
              </li>

              <li>
                <Link to="/movies">
                  <p>{movies}</p>
                </Link>
              </li>

              <li>
                <Link to="/tv-series">
                  <p>{tvShows}</p>
                </Link>
              </li>
              <li>
                <Link to="/tv-series">
                  <p>{sports}</p>
                </Link>
              </li>
              <li>
                <Link to="/tv-series">
                  <p>{liveTv}</p>
                </Link>
              </li>
            </ul>

            <div className="separator-div">
              <div></div>
            </div>

            <span className="suprime-logo-titles">
              <div>
                <img src={acaiWaveTitle} alt="" />
              </div>
            </span>

            <ul className="NavigationLinks subscriptions">
              <li className="">
                <Link to="/home">
                  <SubscriptionsSvg />
                  <p>{subscriptions}</p>
                </Link>
              </li>
            </ul>
          </div>

          <NavLink to="/home" className="NavLogo NavLogoOut">
            <img src={logo} alt="acaiwaveplus logo" />
          </NavLink>

          <span className="nav-user">
            <ul className="nav-bubble-list">
              <SearchComponent />
              <CategoriesDropDown />
              <MyStuffsDropDown />
              <UserMenu></UserMenu>
            </ul>
          </span>
        </div>
      </div>
    </nav>
  );
};

export default NavMenu;
