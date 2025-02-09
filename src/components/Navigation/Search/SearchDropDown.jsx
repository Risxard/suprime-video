import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

import { Search, X } from "lucide-react";
import "./SearchDropDown.css";

import { guestApiKey } from "../../../Services/guestApi";
import { useSelector } from "react-redux";

const SearchDropDown = () => {
  const [isActive, setIsActive] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [searchResponse, setSearchResponse] = useState([]);

  const inputRef = useRef(null);
  const searchContainerRef = useRef(null);

  const language = useSelector((state) => state.lang.language);
  const APIKey = guestApiKey;

  const toggleClass = (e) => {
    e.stopPropagation();
    setIsActive(!isActive);
  };

  const handleDocumentClick = (event) => {
    if (
      searchContainerRef.current &&
      !searchContainerRef.current.contains(event.target)
    ) {
      setIsActive(false);
    }
  };

  useEffect(() => {
    if (isActive) {
      document.addEventListener("click", handleDocumentClick);
    }

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [isActive]);

  useEffect(() => {
    if (isActive && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isActive]);

  const clearInput = (e) => {
    e.stopPropagation();
    setInputValue("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const rawApiKey = `&api_key=${APIKey}`;
  const rawLanguage = `&language=${language}`;
  const api_path = "https://api.themoviedb.org/";

  useEffect(() => {
    const apiUrl = `${api_path}3/search/multi?query=${inputValue}&include_adult=false${rawLanguage}&page=1${rawApiKey}`;

    if (language && inputValue !== "" && inputValue.length > 1) {
      fetch(apiUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          const filteredMediaArray = data.results.filter(
            (item) =>
              !(item.media_type === "movie" || item.media_type === "tv") ||
              item.backdrop_path !== null
          );

          const mediaArray = filteredMediaArray.slice(0, 10);
          mediaArray.sort((a, b) => b.popularity - a.popularity);

          setSearchResponse(mediaArray);
        })
        .catch((error) => {
          console.error("Fetch error:", error);
        });
    } else {
      setSearchResponse([]);
    }
  }, [inputValue]);

  const filteredResponse = searchResponse.length > 0 ? searchResponse : [];

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      window.location.href = `/preview/suprime-video/search/kw=${encodeURIComponent(
        inputValue
      )}`;
      setInputValue("");
      setIsActive(false);
    }
  };

  const highlightMatchingLetters = (text) => {
    if (inputValue.length === 0) {
      return <p>{text}</p>;
    }

    const regex = new RegExp(`(${inputValue})`, "gi");
    return text.split(regex).map((part, index) => (
      <span
        key={index}
        className={
          part.toLowerCase() === inputValue.toLowerCase()
            ? "highlight-matching"
            : "default-text"
        }
      >
        {part}
      </span>
    ));
  };

  return (
    <li
      className={`nav-bubble-btn search-container ${isActive ? "ativo" : ""}`}
      ref={searchContainerRef}
    >
      <button className="search-ative-btn" onClick={toggleClass}>
        <svg

          viewBox="0 0 24 24"
          height="24"
          width="24"
          role="img"
          aria-hidden="true"
        >
          <title>Search</title>
          <svg
            width="24"
            height="24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.360 2.025 C 7.466 2.198,5.790 2.960,4.446 4.259 C 3.730 4.951,3.257 5.602,2.817 6.500 C 1.479 9.228,1.809 12.458,3.674 14.900 C 3.949 15.260,4.616 15.933,5.000 16.239 C 6.430 17.378,8.196 17.999,10.000 17.999 C 11.567 17.999,13.170 17.508,14.465 16.632 L 14.911 16.331 17.645 19.066 C 19.449 20.870,20.434 21.828,20.540 21.879 C 20.942 22.074,21.370 22.002,21.686 21.686 C 22.002 21.370,22.074 20.942,21.879 20.540 C 21.828 20.434,20.870 19.449,19.066 17.645 L 16.331 14.911 16.632 14.465 C 18.219 12.120,18.436 9.087,17.200 6.529 C 16.809 5.718,16.392 5.120,15.761 4.464 C 14.541 3.195,12.996 2.388,11.240 2.100 C 10.865 2.039,9.711 1.992,9.360 2.025 M11.041 4.097 C 12.371 4.333,13.638 5.046,14.506 6.045 C 15.229 6.879,15.707 7.879,15.909 8.980 C 15.999 9.468,15.999 10.532,15.909 11.020 C 15.805 11.587,15.653 12.064,15.423 12.545 C 14.584 14.296,13.102 15.462,11.174 15.887 C 10.603 16.013,9.397 16.013,8.826 15.887 C 6.341 15.339,4.548 13.496,4.090 11.020 C 4.000 10.531,4.000 9.469,4.090 8.980 C 4.394 7.335,5.309 5.928,6.660 5.025 C 7.725 4.313,8.873 3.981,10.140 4.019 C 10.448 4.029,10.853 4.063,11.041 4.097 "
              fill="currentColor"
              stroke="none"
              fillRule="evenodd"
            ></path>
          </svg>
        </svg>
      </button>

      {isActive ? (
        <div className="search-content">
          <div className="search-input-inner">
            <div className="input-inner-container">
              <span className="input-container">
                <svg
                  className="fbl-icon _30dE3d _1a_Ljt _0rfOXL"
                  viewBox="0 0 24 24"
                  height="24"
                  width="24"
                  role="img"
                  aria-hidden="true"
                >
                  <title>Search</title>
                  <svg
                    width="24"
                    height="24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.360 2.025 C 7.466 2.198,5.790 2.960,4.446 4.259 C 3.730 4.951,3.257 5.602,2.817 6.500 C 1.479 9.228,1.809 12.458,3.674 14.900 C 3.949 15.260,4.616 15.933,5.000 16.239 C 6.430 17.378,8.196 17.999,10.000 17.999 C 11.567 17.999,13.170 17.508,14.465 16.632 L 14.911 16.331 17.645 19.066 C 19.449 20.870,20.434 21.828,20.540 21.879 C 20.942 22.074,21.370 22.002,21.686 21.686 C 22.002 21.370,22.074 20.942,21.879 20.540 C 21.828 20.434,20.870 19.449,19.066 17.645 L 16.331 14.911 16.632 14.465 C 18.219 12.120,18.436 9.087,17.200 6.529 C 16.809 5.718,16.392 5.120,15.761 4.464 C 14.541 3.195,12.996 2.388,11.240 2.100 C 10.865 2.039,9.711 1.992,9.360 2.025 M11.041 4.097 C 12.371 4.333,13.638 5.046,14.506 6.045 C 15.229 6.879,15.707 7.879,15.909 8.980 C 15.999 9.468,15.999 10.532,15.909 11.020 C 15.805 11.587,15.653 12.064,15.423 12.545 C 14.584 14.296,13.102 15.462,11.174 15.887 C 10.603 16.013,9.397 16.013,8.826 15.887 C 6.341 15.339,4.548 13.496,4.090 11.020 C 4.000 10.531,4.000 9.469,4.090 8.980 C 4.394 7.335,5.309 5.928,6.660 5.025 C 7.725 4.313,8.873 3.981,10.140 4.019 C 10.448 4.029,10.853 4.063,11.041 4.097 "
                      fill="currentColor"
                      stroke="none"
                      fillRule="evenodd"
                    ></path>
                  </svg>
                </svg>

                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                />

                {inputValue === "" ? (
                  ""
                ) : (
                  <span
                    className="input-clear-btn"
                    onClick={(e) => clearInput(e)}
                  >
                    <p>Clear</p>
                  </span>
                )}
              </span>

              {filteredResponse.length > 0 ? (
                <ul className="search-response">
                  {filteredResponse.map((response) => (
                    <Link
                      to={`/search/${
                        response.media_type === "person"
                          ? response.media_type
                          : "kw"
                      }=${
                        response.media_type === "person"
                          ? `${response.id}&${response.name}`
                          : response.media_type === "tv"
                          ? response.name
                          : response.title
                      }`}
                      key={response.id}
                      onClick={toggleClass}
                    >
                      {highlightMatchingLetters(
                        response.title ? response.title : response.name
                      )}
                    </Link>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </li>
  );
};

export default SearchDropDown;
