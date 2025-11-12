import { NavLink, Link, useLocation } from "react-router-dom";
import React, { useEffect } from "react";
import "./Navigation.css";
import UserMenu from "./UserMenu/UserMenu.jsx";
import logo from "../../assets/acaiwaveLogo.png";
import { useTranslation } from "react-i18next";
import HomeSvg from "./Icons/HomeSvg.jsx";
import BrowseSvg from "./Icons/BrowseSvg.jsx";
import WatchlistSvg from "./Icons/WatchlistSvg.jsx";
import TvSvg from "./Icons/TvSvg.jsx";
import MoviesSvg from "./Icons/MoviesSvg.jsx";
import ExtendedMenu from "./ExtendedMenu/index.jsx";

const Navigation = () => {
  const { t } = useTranslation();
  const navigationMenu = t("navigation.menu", { returnObjects: true });
  const { home, search, myList, movies, tvShows, originals } = navigationMenu;

  const location = useLocation();

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
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const normalizePath = (p = "") => {
    if (!p) return "/";
    if (p !== "/" && p.endsWith("/")) return p.slice(0, -1);
    return p;
  };

  const handleLinkClick = (e, toPath) => {
    const current = normalizePath(location.pathname);
    const target = normalizePath(toPath);
    if (current === target) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <nav className="Navigation" id="nav">
      <div className="nav-content">
        <div className="nav-content-align">
          <NavLink
            to="/home"
            className="NavLogo"
            onClick={(e) => handleLinkClick(e, "/home")}
          >
            <img src={logo} alt="acaiwaveplus logo" />
          </NavLink>

          <ul className="NavigationLinks" id="nav-links">
            <li>
              <Link to="/home" onClick={(e) => handleLinkClick(e, "/home")}>
                <span>
                  <HomeSvg />
                </span>
                <p>{home}</p>
              </Link>
            </li>

            <li>
              <Link
                to="/search"
                onClick={(e) => handleLinkClick(e, "/search")}
              >
                <span>
                  <BrowseSvg />
                </span>
                <p>{search}</p>
              </Link>
            </li>

            <li>
              <Link
                to="/browse/watchlist/"
                onClick={(e) => handleLinkClick(e, "/browse/watchlist/")}
              >
                <span>
                  <WatchlistSvg />
                </span>
                <p>{myList}</p>
              </Link>
            </li>

            <li>
              <Link
                to="/browse/movies"
                onClick={(e) => handleLinkClick(e, "/browse/movies")}
              >
                <span>
                  <MoviesSvg />
                </span>
                <p>{movies}</p>
              </Link>
            </li>

            <li>
              <Link
                to="/browse/series"
                onClick={(e) => handleLinkClick(e, "/browse/series")}
              >
                <span>
                  <TvSvg />
                </span>
                <p>{tvShows}</p>
              </Link>
            </li>

            {/* <li>
              <Link
                to="/originals"
                onClick={(e) => handleLinkClick(e, "/originals")}
              >
                <span>
                  <StarSvg />
                </span>
                <p>{originals}</p>
              </Link>
            </li> */}
          </ul>

          <ExtendedMenu />
        </div>

        <UserMenu />
      </div>
    </nav>
  );
};

export default Navigation;
