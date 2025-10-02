import "./styles.css";
import DropdownContainer from "../Layout/DropdownContainer/Index";
import { Categorieschildren } from "../Categories/CategoriesDropDown";

import { Link, useLocation, useMatch } from "react-router-dom";
import SubscriptionsSvg from "../Subscription/SubscriptionsSvg";
import { useEffect, useState, useRef } from "react";
import { ChevronDown } from "lucide-react";

import { isMobile } from "react-device-detect";
import { useTranslation } from "react-i18next";
import { set } from "react-hook-form";

export const HamMenuChildren = () => {
  const [isOpenCatgories, setIsOpenCatgories] = useState(false);
  const [isOpenSubscriptions, setIsOpenSubscriptions] = useState(false);

  const homeMatch = useMatch("/home");
  const moviesMatch = useMatch("/movies");
  const tvMatch = useMatch("/tv-series");
  const sportsMatch = useMatch("/sports");
  const liveTvMatch = useMatch("/live-tv");

  const { t } = useTranslation();

  const navigationMenu = t("navigation.menu");
  const {
    home,
    movies,
    tvShows,
    sports,
    liveTv,
    subscriptions,
    browser,
    myStuffs,
    browseAll,
  } = navigationMenu;

  useEffect(() => {
    const navLinks = document.querySelectorAll(".nav-links li");

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
    const handleResize = () => {
      if (window.innerWidth > 879) {
        setIsOpenCatgories(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="hamMenu-dropdown">
      <div className="dropdown-content-layout">
        <p>{browser}</p>
        <ul className="nav-links">
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

          <li
            className="hamMenu-categories-dropdown"
            onClick={() => setIsOpenCatgories(!isOpenCatgories)}
          >
            <p>
              Categories
              <ChevronDown className="hamMenuChevron" />
            </p>
          </li>
          {isOpenCatgories && (
            <Categorieschildren isOpenCatgories={isOpenCatgories} />
          )}

          <li className="hamMenu-categories-dropdown">
            <p>
              {myStuffs}
              <ChevronDown className="hamMenuChevron" />
            </p>
          </li>
        </ul>
      </div>

      <div className="dropdown-content-layout">
        <p>{subscriptions}</p>


        <span className="subscription-mobile">
          <Link to="/home">
            <SubscriptionsSvg />
            <p>{browseAll}</p>
          </Link>
        </span>
      </div>
    </div>
  );
};

const HamMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const hamMenuContainerRef = useRef(null);
  const location = useLocation();

  const handleOffIsOpen = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    handleOffIsOpen();
  }, [location]);

  useEffect(() => {
    if (window.innerWidth > 879) {
    }
  }, []);

  const handleSetIsOpen = () => {
    if (isMobile) {
      setIsOpen(!isOpen);
    }
  };

  const handleDocumentClick = (event) => {
    if (
      hamMenuContainerRef.current &&
      !hamMenuContainerRef.current.contains(event.target)
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

  return (
    <div
      className="hamMenu-container"
      data-mobile={isMobile}
      data-open={isOpen}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <span ref={hamMenuContainerRef}>
        <button className="btnMenu" onClick={() => handleSetIsOpen()}>
          <p>Menu</p>
          <ChevronDown color="white" className="hamMenuChevron" />
        </button>

        {isOpen && <DropdownContainer children={<HamMenuChildren />} />}
      </span>

      {isOpen && isMobile && <span className="focus-modal" />}
    </div>
  );
};

export default HamMenu;
