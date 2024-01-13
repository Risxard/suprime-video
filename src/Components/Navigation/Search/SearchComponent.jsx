import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

import { Search, X } from "lucide-react";
import "./SearchComponent.css";

import { guestApiKey } from "../../../Services/guestApi";

const SearchComponent = () => {
  const [isActive, setIsActive] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [searchResponse, setSearchResponse] = useState([]);

  const inputRef = useRef(null);
  const searchContainerRef = useRef(null);

  const language = localStorage.getItem("country");
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
          const mediaArray = data.results.slice(0, 10);
          console.log(mediaArray)
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

  return (
    <div
      className={`search-container ${isActive ? "ativo" : ""}`}
      ref={searchContainerRef}
    >
      {isActive ? (
        <X id="searchBtn" onClick={toggleClass} />
      ) : (
        <Search id="searchBtn" onClick={toggleClass} />
      )}
      {isActive ? (
        <div className="search-content">
          <span className="input-container">
            <Search color="#B3B4B7" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />

            {inputValue === "" ? (
              ""
            ) : (
              <span className="input-clear-btn"  onClick={(e) => clearInput(e)}>
                <p>Clear</p>
              </span>
            )}
          </span>
          {filteredResponse.length > 0 ? (
            <ul className="search-response">
              {filteredResponse.map((response) => (
                <Link
                  to={`/suprime-video/${response.media_type}/${response.id}`}
                  key={response.id}
                  onClick={toggleClass}
                >
                  <p>{response.title ? response.title : response.name}</p>
                </Link>
              ))}
            </ul>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default SearchComponent;
