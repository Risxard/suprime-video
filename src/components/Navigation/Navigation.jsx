import { NavLink, Link } from "react-router-dom";
import React, { useEffect, useState, useRef } from "react";
import "./Navigation.css";
import Pesquisa from "./Search/SearchDropDown.jsx";
import UserMenu from "./UserMenu/UserMenu";
import LogoIcon from "../../assets/Logo.svg";

import suprimeTitle from "./suprime-titles.png";

import { Home, ChevronDown, Youtube, Layers3 } from "lucide-react";

import SearchComponent from "./Search/SearchDropDown.jsx";

import { connect } from "react-redux";
import { useMatch } from "react-router-dom";
import SubscriptionsSvg from "./Subscription/SubscriptionsSvg.jsx";
import CategoriesDropDown from "./Categories/CategoriesDropDown.jsx";
import MyStuffsDropDown from "./MyStuffs/MyStuffsDropDown.jsx";

var NavMenu = (SectionData) => {
  const [isSectionOptionsOpen, setIsSectionOptionsOpen] = useState(false);

  const homeMatch = useMatch("/home");
  const moviesMatch = useMatch("/movies");
  const tvMatch = useMatch("/tv-series");
  const sportsMatch = useMatch("/sports");
  const liveTvMatch = useMatch("/live-tv");

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
            <div className="hamMenu">
              <p onTouchEnd={() => addClass()} className="btnMenu">
                Menu
                <ChevronDown color="white" className="hamMenuChevron" />
              </p>
              <div className="hamMenu-ul">
                <span className="hamMenu-li">
                  <Home />
                  <p>Home</p>
                </span>
                <span className="hamMenu-li">
                  <Layers3 />
                  <p>Categories</p>
                  <ChevronDown />
                </span>
                <span className="hamMenu-li">
                  <Youtube />
                  <p>My Stuff</p>
                </span>
              </div>
            </div>

            <NavLink to="/home" className="NavLogo">
              <h2>suprime video</h2>
            </NavLink>

            <ul className="NavigationLinks" id="nav-links">
              <li>
                <Link to="/home">
                  <p>Home</p>
                </Link>
              </li>

              <li>
                <Link to="/movies">
                  <p>Movies</p>
                </Link>
              </li>

              <li>
                <Link to="/tv-series">
                  <p>TV shows</p>
                </Link>
              </li>
              <li>
                <Link to="/tv-series">
                  <p>Sports</p>
                </Link>
              </li>
              <li>
                <Link to="/tv-series">
                  <p>Live TV</p>
                </Link>
              </li>
            </ul>

            <div className="separator-div">
              <div></div>
            </div>

            <span className="suprime-logo-titles">
              <div>
                <img src={suprimeTitle} alt="" />
              </div>
            </span>

            <ul className="NavigationLinks subscriptions">
              <li className="">
                <Link to="/home">
                  <SubscriptionsSvg />
                  <p>Subscriptions</p>
                </Link>
              </li>
            </ul>
          </div>

          <NavLink to="/home" className="NavLogo NavLogoOut">
            <h2>suprime video</h2>
          </NavLink>

          <span className="nav-user">
            {/* <div id="lang-container" ref={langContainerRef}>
            <span id="MultiLang">
              <p>{}</p>
            </span>

            <div
              id="select-options"
              className={isSectionOptionsOpen ? "active" : ""}
            >
              <span>
                <input
                  type="radio"
                  name="opcao"
                  value="en-US"
                  id="EN"
                  onChange={() => handleSelectChange("en-US")}
                  checked={selectedOption === "en-US"}
                />
                <label htmlFor="EN">English (United States)</label>
              </span>

              <span>
                <input
                  type="radio"
                  name="opcao"
                  value="pt-BR"
                  id="PT"
                  onChange={() => handleSelectChange("pt-BR")}
                  checked={selectedOption === "pt-BR"}
                />
                <label htmlFor="PT">Português (Brasil)</label>
              </span>
            </div>
          </div> */}

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
