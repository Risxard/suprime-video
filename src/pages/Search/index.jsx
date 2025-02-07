import React, { useEffect, useMemo, useState } from "react";

import "./styles.css";
import { useParams } from "react-router-dom";

import { ChevronDown, MoreVertical, Square, CheckSquare } from "lucide-react";
import { guestApiKey } from "../../Services/guestApi.js";
import { useIntersectionObserver } from "../../hooks/IntersectionObserver/useIntersationObserver.jsx";
import genresTemplate from "../../Services/genres/genres.json";
import {
  filteredMediaType,
  genreConverter,
} from "../../functions/Converter.js";
import SearchMediaList from "./SearchMediaList/SearchMediaList.jsx";
import SpinnerLoading from "../../assets/svgs/SpinnerLoading.jsx";

import { connect } from "react-redux";

const Search = (props) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [prevArray, setPrevArray] = useState([]);
  const [toVisible, setToVisible] = useState(false);
  const [filteredMedias, setFilteredMedias] = useState([]);

  const [selectedGenres, setSelectedGenres] = useState(null);

  const [movieFilter, setMovieFilter] = useState(false);
  const [tvFilter, setTvFilter] = useState(false);

  const { searchKey } = useParams();

  const parts = searchKey.split("=");
  const language = props.language;

  const key = parts[0];
  const value = parts[1];

  const personKey = key === "person" ? value.split("&") : "";

  const personId = personKey[0];
  const personName = personKey[1];

  const APIKey = guestApiKey;

  const rawApiKey = `&api_key=${APIKey}`;
  const rawLanguage = `&language=${language}`;

  const personRaw = `https://api.themoviedb.org/3/person/${personId}?append_to_response=movie_credits%2Ctv_credits${rawLanguage}${rawApiKey}`;
  const multiRaw = `https://api.themoviedb.org/3/search/multi?query=${value}&include_adult=false${rawLanguage}&page=${pageNumber}${rawApiKey}`;

  const selectedRaw = key === "person" ? personRaw : multiRaw;
  

  useEffect(() => {
    if (
      (key === "person" && personId && rawApiKey) ||
      (key === "kw" && value && pageNumber && rawApiKey)
    ) {
      if (pageNumber <= 5) {
        fetch(selectedRaw)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            if (prevArray.length <= 0) {
              if (key === "person") {
                const movieArray = data.movie_credits;
                const tvArray = data.tv_credits;

                const personMovies = [];
                const personTv = [];
                const uniqueIds = new Set();

                movieArray.cast.forEach((item) => {
                  if (item.backdrop_path !== null && !uniqueIds.has(item.id)) {
                    personMovies.push(item);
                    uniqueIds.add(item.id);
                  }
                });

                tvArray.cast.forEach((item) => {
                  if (item.backdrop_path !== null && !uniqueIds.has(item.id)) {
                    personTv.push(item);
                    uniqueIds.add(item.id);
                  }
                });

                const combinedArray = [...personMovies, ...personTv];

                setPrevArray(combinedArray);
              } else {
                const res = data.results.filter(
                  (item) =>
                    item.backdrop_path !== null && item.media_type !== "person"
                );

                setPrevArray(res);
              }
            } else {
              if (key !== "person") {
                const res = data.results.filter(
                  (item) =>
                    item.backdrop_path !== null && item.media_type !== "person"
                );

                const novosItens = res.filter((novoItem) => {
                  return !prevArray.some(
                    (itemExistente) => itemExistente.id === novoItem.id
                  );
                });
                const resultadoConcatenacao = [...prevArray, ...novosItens];
                setPrevArray(resultadoConcatenacao);
              }
            }
          })
          .catch((error) => {
            console.error("Fetch error:", error);
          });
      }
    }
  }, [searchKey, pageNumber, language]);

  useEffect(() => {
    if (prevArray.length > 0) {
      let filterType = [];

      if (movieFilter && !tvFilter) {
        if (key !== "person") {
          const array = prevArray.filter(
            (item) =>
              item.backdrop_path !== null &&
              item.media_type !== "person" &&
              item.media_type !== "tv"
          );

          filterType = array;
        } else {
          const array = prevArray.filter(
            (item) =>
              item.backdrop_path !== null && filteredMediaType(item) !== "tv"
          );

          filterType = array;
        }
      } else if (tvFilter && !movieFilter) {
        if (key !== "person") {
          const array = prevArray.filter(
            (item) =>
              item.backdrop_path !== null &&
              item.media_type !== "person" &&
              item.media_type !== "movie"
          );
          filterType = array;
        } else {
          const array = prevArray.filter(
            (item) =>
              item.backdrop_path !== null && filteredMediaType(item) !== "movie"
          );

          filterType = array;
        }
      } else {
        filterType = prevArray;
      }

      setFilteredMedias(filterType);
    }
  }, [prevArray, movieFilter, tvFilter, language]);

  const visibleSections = useIntersectionObserver();

  useEffect(() => {
    if (key !== "person" && prevArray.length > 0) {
      if (visibleSections[0] > filteredMedias.length && pageNumber < 5) {
        setTimeout(() => {
          setPageNumber(pageNumber + 1);
        }, 3000);
      }
    }
  }, []);

  useEffect(() => {
    if (visibleSections[0] > filteredMedias.length && prevArray.length > 0) {
      setToVisible(false);
    } else {
      if (visibleSections[0] >= 21 && prevArray.length > 0) {
        setToVisible(true);
      }
    }
  }, [visibleSections, language]);

  const toggleFilterChecked = (filter) => {
    const contentTypeBtn = document.querySelector(".content-type-filter");
    const genreFilterBtn = document.querySelector(".genre-filter");
    switch (filter) {
      case 1:
        genreFilterBtn.classList.toggle("selectedFilter");
        contentTypeBtn.classList.remove("selectedFilter");
        break;

      case 2:
        contentTypeBtn.classList.toggle("selectedFilter");
        genreFilterBtn.classList.remove("selectedFilter");
        break;
      default:
        genreFilterBtn.classList.remove("selectedFilter");
        contentTypeBtn.classList.remove("selectedFilter");
        break;
    }
  };

  const toggleContentType = (filter) => {
    switch (filter) {
      case "movieFilter":
        if (movieFilter === false) {
          setMovieFilter(true);
        } else {
          setMovieFilter(false);
        }
        break;

      case "tvFilter":
        if (tvFilter === false) {
          setTvFilter(true);
        } else {
          setTvFilter(false);
        }
        break;
      default:
        console.log("Filter não reconhecido");
        break;
    }
  };

  return (
    <div className="Search-Page">
      <div className="search-filters">
        <button className="filters-modal-btn filter-btn">Filters</button>
        <div className="filters-btns-container">
          <div className="inner-btn genre-filter">
            <button
              className="filter-btn"
              onClick={() => toggleFilterChecked(1)}
            >
              {selectedGenres
                ? `${genreConverter(selectedGenres, "en-US", "movie")}`
                : "Genre"}
              <ChevronDown />
            </button>
            <ul>
              {genresTemplate.movie.en_us
                .filter(
                  (genre) =>
                    genre.name !== "TV Movie" &&
                    genre.name !== "Animation" &&
                    genre.name !== "Western"
                )
                .map((genre) => {
                  return (
                    <li
                      key={genre.id}
                      className={`${
                        selectedGenres === genre.id ? "selected-filter" : ""
                      }`}
                      onClick={() => {
                        selectedGenres === genre.id
                          ? setSelectedGenres(null)
                          : setSelectedGenres(genre.id);
                        toggleFilterChecked(0);
                      }}
                    >
                      {genre.name}
                    </li>
                  );
                })}
            </ul>
          </div>

          <div className="inner-btn content-type-filter">
            <button
              className="filter-btn"
              onClick={() => toggleFilterChecked(2)}
            >
              Content Type
              <p>
                {(() => {
                  let a = 0;
                  movieFilter && a++;
                  tvFilter && a++;
                  return a !== 0 ? a : "";
                })()}
              </p>
              <ChevronDown />
            </button>
            <ul>
              <li onClick={() => toggleContentType("movieFilter")}>
                {movieFilter ? <CheckSquare /> : <Square />}
                Movies
              </li>
              <li onClick={() => toggleContentType("tvFilter")}>
                {tvFilter ? <CheckSquare /> : <Square />}
                Tv Shows
              </li>
            </ul>
          </div>
        </div>
      </div>

      <SearchMediaList
        language={language}
        filteredMedias={filteredMedias}
        keyType={key}
        personName={personName}
        selectedGenres={selectedGenres}
        typeValue={value}
        visibleSections={visibleSections}
      />

      <SpinnerLoading toVisible={toVisible} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    language: state.lang.dataLang,
  };
};
export default connect(mapStateToProps)(Search);
