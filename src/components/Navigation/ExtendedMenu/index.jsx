import React, { useEffect, useRef, useState } from "react";
import "./styles.css";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MoviesSvg from "../Icons/MoviesSvg";
import TvSvg from "../Icons/TvSvg";
import { useTranslation } from "react-i18next";
import { isMobile } from "react-device-detect";
import StarSvg from "../Icons/StarSvg";
import ExpandSvg from "../Icons/ExpandSvg.jsx";

const UserMenuChildren = () => {
  const { t } = useTranslation();

  const navigationMenu = t("navigation.menu");
  const { home, movies, tvShows, sports, liveTv, subscriptions } =
    navigationMenu;

  return (
    <ul className="expand-menu-list-container">
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
  );
};

const ExtendedMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const avatarButtonRef = useRef(null);

  const handleSetIsOpen = () => {
    if (isMobile) {
      setIsOpen(!isOpen);
    }
  };

  const handleDocumentClick = (event) => {
    if (
      avatarButtonRef.current &&
      !avatarButtonRef.current.contains(event.target)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isMobile) {
      if (isOpen) {
        document.addEventListener("click", handleDocumentClick);
      }

      return () => {
        document.removeEventListener("click", handleDocumentClick);
      };
    }
  }, [isOpen]);

  const location = useLocation();

  const handleOffIsOpen = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    handleOffIsOpen();
  }, [location]);

 
  return (
    <ul
      className={`extendedMenu ${isOpen && "active"}`}
      data-mobile={isMobile}
      data-open={isOpen}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <li
        className="expand-menu"
        onClick={() => handleSetIsOpen()}
        ref={avatarButtonRef}
      >
        <ExpandSvg />
      </li>

      <UserMenuChildren />

      {isOpen && isMobile && <span className="focus-modal" />}
    </ul>
  );
};

export default ExtendedMenu;
