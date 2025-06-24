import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, X } from "lucide-react";
import "./SearchDropDown.css";
import { guestApiKey } from "../../../Services/guestApi";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const SearchDropDown = () => {
  const [isActive, setIsActive] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [searchResponse, setSearchResponse] = useState([]);

  const { t } = useTranslation();

  const navigationSearch = t("navigation.search");
  const { placeholder, button } = navigationSearch;

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
  }, [inputValue, language, rawApiKey, rawLanguage, api_path]);

  const filteredResponse = searchResponse.length > 0 ? searchResponse : [];
  const navigate = useNavigate();

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      navigate(`/search/kw=${encodeURIComponent(inputValue)}`);
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
    >
      <button className="search-ative-btn" onClick={toggleClass}>
        <Search />
      </button>

      {isActive && (
        <div className="search-content">
          <div className="search-input-inner" ref={searchContainerRef}>
            <div className="input-inner-container">
              <span className="input-container">
                <Search />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder={placeholder}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                {inputValue !== "" && (
                  <span className="input-clear-btn" onClick={clearInput}>
                    {button}
                  </span>
                )}
              </span>

              {filteredResponse.length > 0 && (
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
              )}
            </div>
          </div>
        </div>
      )}

      {isActive && <span className="focus-modal" />}
    </li>
  );
};

export default SearchDropDown;
