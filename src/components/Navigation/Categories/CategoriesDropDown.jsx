import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import DropdownContainer from "../Layout/DropdownContainer/Index";

import "./styles.css";
import { isMobile } from "react-device-detect";
import { useTranslation } from "react-i18next";

export const Categorieschildren = () => {
  const { t } = useTranslation();

  const navigationCategories = t("navigation.categories");
  const { genres, featuredCollections } = navigationCategories;

  return (
    <>
      <div className="dropdown-content-layout">
        <p>{genres.title}</p>

        <ul className="dropdown-categories-list">
          <li>
            <Link to="/categories/28">
              <p>{genres.actionAndAdventure}</p>
            </Link>
          </li>
          <li>
            <Link to="/categories/16">
              <p>{genres.anime}</p>
            </Link>
          </li>
          <li>
            <Link to="/categories/35">
              <p>{genres.comedy}</p>
            </Link>
          </li>
          <li>
            <Link to="/categories/99">
              <p>{genres.documentary}</p>
            </Link>
          </li>
          <li>
            <Link to="/categories/18">
              <p>{genres.drama}</p>
            </Link>
          </li>
          <li>
            <Link to="/categories/14">
              <p>{genres.fantasy}</p>
            </Link>
          </li>
          <li>
            <Link to="/categories/27">
              <p>{genres.horror}</p>
            </Link>
          </li>
          <li>
            <Link to="/categories/10751">
              <p>{genres.kids}</p>
            </Link>
          </li>
          <li>
            <Link to="/categories/9648">
              <p>{genres.mysteryAndThriller}</p>
            </Link>
          </li>
          <li>
            <Link to="/categories/10749">
              <p>{genres.romance}</p>
            </Link>
          </li>
          <li>
            <Link to="/categories/878">
              <p>{genres.scienceFiction}</p>
            </Link>
          </li>
        </ul>
      </div>

      <div className="dropdown-content-layout">
        <p>{featuredCollections.title}</p>

        <ul>
          <li>
            <Link to="">
              <p>{featuredCollections.madeForYou}</p>
            </Link>
          </li>
          <li>
            <Link to="">
              <p>{featuredCollections.newAndUpcoming}</p>
            </Link>
          </li>
          <li>
            <Link to="">
              <p>{featuredCollections.homePremiere}</p>
            </Link>
          </li>
          <li>
            <Link to="">
              <p>{featuredCollections.criticallyAcclaimed}</p>
            </Link>
          </li>
          <li>
            <Link to="">
              <p>{featuredCollections.lgbtqiap}</p>
            </Link>
          </li>
          <li>
            <Link to="">
              <p>{featuredCollections.blackVoices}</p>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

const CategoriesDropDown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const categoriesRef = useRef(null);

  const handleSetIsOpen = () => {
    if (isMobile) {
      setIsOpen(!isOpen);
    }
  };

  const handleDocumentClick = (event) => {
    if (
      categoriesRef.current &&
      !categoriesRef.current.contains(event.target)
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
    <li
      className="nav-bubble-btn"
      data-mobile={isMobile}
      data-open={isOpen}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <span ref={categoriesRef}>
        <button onClick={() => handleSetIsOpen()}>
          <svg
            className="fbl-icon _30dE3d _1a_Ljt _0rfOXL"
            viewBox="0 0 24 24"
            height="24"
            width="24"
            role="img"
            aria-hidden="true"
          >
            <svg
              width="24"
              height="24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.580 3.047 C 3.859 3.185,3.199 3.848,3.044 4.592 C 2.905 5.257,3.105 5.912,3.596 6.404 C 4.393 7.200,5.607 7.200,6.404 6.404 C 7.200 5.607,7.200 4.393,6.404 3.596 C 5.913 3.106,5.277 2.914,4.580 3.047 M11.580 3.047 C 10.859 3.185,10.199 3.848,10.044 4.592 C 9.789 5.816,10.751 7.000,12.000 7.000 C 13.080 7.000,14.000 6.080,14.000 5.000 C 14.000 4.477,13.790 3.983,13.404 3.596 C 12.913 3.106,12.277 2.914,11.580 3.047 M18.580 3.047 C 17.859 3.185,17.199 3.848,17.044 4.592 C 16.789 5.816,17.751 7.000,19.000 7.000 C 19.920 7.000,20.768 6.310,20.956 5.408 C 21.095 4.743,20.895 4.088,20.404 3.596 C 19.913 3.106,19.277 2.914,18.580 3.047 M4.580 10.047 C 4.236 10.113,3.883 10.310,3.596 10.596 C 2.800 11.393,2.800 12.607,3.596 13.404 C 4.393 14.200,5.607 14.200,6.404 13.404 C 7.200 12.607,7.200 11.393,6.404 10.596 C 5.913 10.106,5.277 9.914,4.580 10.047 M11.580 10.047 C 10.707 10.214,10.000 11.087,10.000 12.000 C 10.000 12.920,10.690 13.768,11.592 13.956 C 12.816 14.211,14.000 13.249,14.000 12.000 C 14.000 11.477,13.790 10.983,13.404 10.596 C 12.913 10.106,12.277 9.914,11.580 10.047 M18.580 10.047 C 17.707 10.214,17.000 11.087,17.000 12.000 C 17.000 12.920,17.690 13.768,18.592 13.956 C 19.816 14.211,21.000 13.249,21.000 12.000 C 21.000 11.477,20.790 10.983,20.404 10.596 C 19.913 10.106,19.277 9.914,18.580 10.047 M4.580 17.047 C 3.859 17.185,3.199 17.848,3.044 18.592 C 2.789 19.816,3.751 21.000,5.000 21.000 C 5.920 21.000,6.768 20.310,6.956 19.408 C 7.095 18.743,6.895 18.088,6.404 17.596 C 5.913 17.106,5.277 16.914,4.580 17.047 M11.580 17.047 C 10.859 17.185,10.199 17.848,10.044 18.592 C 9.789 19.816,10.751 21.000,12.000 21.000 C 13.080 21.000,14.000 20.080,14.000 19.000 C 14.000 18.477,13.790 17.983,13.404 17.596 C 12.913 17.106,12.277 16.914,11.580 17.047 M18.580 17.047 C 17.859 17.185,17.199 17.848,17.044 18.592 C 16.789 19.816,17.751 21.000,19.000 21.000 C 20.080 21.000,21.000 20.080,21.000 19.000 C 21.000 18.477,20.790 17.983,20.404 17.596 C 19.913 17.106,19.277 16.914,18.580 17.047 "
                fill="currentColor"
                stroke="none"
                fillRule="evenodd"
              ></path>
            </svg>
          </svg>
        </button>
        {isOpen && <DropdownContainer children={<Categorieschildren />} />}
      </span>

      {isOpen && isMobile && <span className="focus-modal" />}
    </li>
  );
};

export default CategoriesDropDown;
