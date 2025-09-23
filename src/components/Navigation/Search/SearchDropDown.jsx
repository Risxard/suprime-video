import React, { useState, useRef, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import "./SearchDropDown.css";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import debounce from "lodash.debounce";
import { tmdbService } from "../../../services/tmdb/tmdbServices";

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
  const navigate = useNavigate();

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
    return () => document.removeEventListener("click", handleDocumentClick);
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

  const fetchSearch = useCallback(
    debounce(async (query) => {
      if (!query || query.length < 2) {
        setSearchResponse([]);
        return;
      }

      try {
        const data = await tmdbService.fetchSearchMulti({
          query,
          language,
          page: 1,
        });

        const filteredMediaArray = data.filter(
          (item) =>
            !(item.media_type === "movie" || item.media_type === "tv") ||
            item.backdrop_path !== null
        );

        const mediaArray = filteredMediaArray
          .slice(0, 10)
          .sort((a, b) => b.popularity - a.popularity);

        setSearchResponse(mediaArray);
      } catch (error) {
        console.error("Erro ao buscar:", error);
      }
    }, 500),
    [language]
  );

  useEffect(() => {
    fetchSearch(inputValue);
  }, [inputValue, fetchSearch]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      navigate(`/search/kw=${encodeURIComponent(inputValue)}`);
      setInputValue("");
      setIsActive(false);
    }
  };

  const highlightMatchingLetters = (text) => {
    if (inputValue.length === 0) return <p>{text}</p>;

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

              {searchResponse.length > 0 && (
                <ul className="search-response">
                  {searchResponse.map((response) => (
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
