import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { ChevronDown, CheckSquare, Square, X } from "lucide-react";

import { useIntersectionObserver } from "../../hooks/IntersectionObserver/useIntersationObserver.jsx";
import { toggleFilterModal } from "../../store/slices/modals.js";

import {
  filteredMediaType,
  genreConverter,
} from "../../functions/Converter.js";
import genresTemplate from "../../Services/genres/genres.json";

import SearchMediaList from "./SearchMediaList/SearchMediaList.jsx";
import SpinnerLoading from "../../assets/svgs/SpinnerLoading.jsx";

import "./styles.css";
import { tmdbService } from "../../services/tmdb/tmdbServices.js";

const Search = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [prevArray, setPrevArray] = useState([]);
  const [filteredMedias, setFilteredMedias] = useState([]);
  const [personNameInfo, setPersonNameInfo] = useState(null);
  const [selectedGenres, setSelectedGenres] = useState(null);
  const [movieFilter, setMovieFilter] = useState(false);
  const [tvFilter, setTvFilter] = useState(false);
  const [toVisible, setToVisible] = useState(false);

  const { t } = useTranslation();
  const { searchKey } = useParams();
  const language = useSelector((state) => state.lang.language);
  const visibleSections = useIntersectionObserver();
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.modals.filterModal);

  const [key, value] = searchKey.split("=");
  const personKey = key === "person" ? value.split("&") : "";
  const personId = personKey[0];
  const personName = personNameInfo ?? personKey[1];


  useEffect(() => {
    const fetchData = async () => {
      try {
        if (key === "person" && personId) {
          const data = await tmdbService.fetchSearchPerson({
            person_id: personId,
            language,
            page: pageNumber,
          });

          setPersonNameInfo(data.name);
          const movieArray = data.movie_credits?.cast ?? [];
          const tvArray = data.tv_credits?.cast ?? [];
          const uniqueIds = new Set();

          const combinedArray = [...movieArray, ...tvArray].filter((item) => {
            if (item.backdrop_path && !uniqueIds.has(item.id)) {
              uniqueIds.add(item.id);
              return true;
            }
            return false;
          });

          setPrevArray((prev) =>
            pageNumber === 1 ? combinedArray : [...prev, ...combinedArray]
          );
        } else if (key === "kw" && value) {
          const data = await tmdbService.fetchSearchMulti({
            query: value,
            language,
            page: pageNumber,
          });

          console.log("Requisição feita!:", "pagina:", pageNumber, data,);

          const rawResults = Array.isArray(data) ? data : [];

          const results = rawResults.filter(Boolean).filter((item) => {
            const mediaType = (item?.media_type || "").toLowerCase();
            const looksLikePerson =
              mediaType === "person" ||
              Object.prototype.hasOwnProperty.call(item, "known_for") ||
              Object.prototype.hasOwnProperty.call(
                item,
                "known_for_department"
              );

            return !looksLikePerson && !!item?.backdrop_path;
          });

          setPrevArray((prev) =>
            pageNumber === 1
              ? results
              : [
                  ...prev,
                  ...results.filter((r) => !prev.some((p) => p.id === r.id)),
                ]
          );
        }
      } catch (error) {
        console.error("Erro na busca:", error);
      }
    };

    if (pageNumber <= 5) fetchData();
  }, [searchKey, pageNumber, language]);

  // --- Filtros ---
  useEffect(() => {
    if (!prevArray.length) return;

    let filtered = prevArray;
    if (movieFilter && !tvFilter) {
      filtered = prevArray.filter(
        (item) =>
          item.backdrop_path &&
          (key === "person"
            ? filteredMediaType(item) !== "tv"
            : item.media_type !== "tv")
      );
    } else if (tvFilter && !movieFilter) {
      filtered = prevArray.filter(
        (item) =>
          item.backdrop_path &&
          (key === "person"
            ? filteredMediaType(item) !== "movie"
            : item.media_type !== "movie")
      );
    }

    setFilteredMedias(filtered);
  }, [prevArray, movieFilter, tvFilter, key]);

  // --- Scroll infinito ---
  useEffect(() => {
    if (key !== "person" && prevArray.length > 0) {
      if (visibleSections[0] > filteredMedias.length && pageNumber < 5) {
        const timer = setTimeout(() => setPageNumber((p) => p + 1), 3000);
        return () => clearTimeout(timer);
      }
    }
  }, [visibleSections, filteredMedias, prevArray, key, pageNumber]);


  useEffect(() => {
    setToVisible(
      !(visibleSections[0] > filteredMedias.length && prevArray.length > 0) &&
        visibleSections[0] >= 21
    );
  }, [visibleSections, filteredMedias, prevArray]);

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
        setMovieFilter((prev) => !prev);
        toggleFilterChecked(2);
        break;
      case "tvFilter":
        setTvFilter((prev) => !prev);
        toggleFilterChecked(2);
        break;
      default:
        console.log("Filter não reconhecido");
        break;
    }
  };

  const handleSetModal = () => {
    dispatch(toggleFilterModal());
  };

  const searchPage = t("searchPage.buttons");
  const recomendedTvAndSeries = t("sectionTitles.recomendedTvAndSeries");
  const { contentType, genre, infoLabels } = searchPage;

  return (
    <div className="Search-Page" data-open-modal={modal}>
      {modal && (
        <div className="searchModal">
          <div className="filter-tab">
            <span>Filters</span>
            <button onClick={handleSetModal}>
              <X />
            </button>
          </div>

          <div className="search-filters-modal">
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
                    (g) =>
                      g.name !== "TV Movie" &&
                      g.name !== "Animation" &&
                      g.name !== "Western"
                  )
                  .map((g) => (
                    <li
                      key={g.id}
                      className={
                        selectedGenres === g.id ? "selected-filter" : ""
                      }
                      onClick={() => {
                        setSelectedGenres((prev) =>
                          prev === g.id ? null : g.id
                        );
                        toggleFilterChecked(0);
                        handleSetModal();
                      }}
                    >
                      {g.name}
                    </li>
                  ))}
              </ul>
            </div>
            <div className="inner-btn content-type-filter">
              <button
                className="filter-btn"
                onClick={() => toggleFilterChecked(2)}
              >
                {contentType.title}
                {(() => {
                  let a = 0;
                  movieFilter && a++;
                  tvFilter && a++;
                  return a !== 0 ? <p>{a}</p> : "";
                })()}
                <ChevronDown />
              </button>
              <ul>
                <li
                  onClick={() => {
                    toggleContentType("movieFilter");
                    handleSetModal();
                  }}
                >
                  {movieFilter ? <CheckSquare /> : <Square />}
                  {contentType.movies}
                </li>
                <li
                  onClick={() => {
                    toggleContentType("tvFilter");
                    handleSetModal();
                  }}
                >
                  {tvFilter ? <CheckSquare /> : <Square />}
                  {contentType.tvShows}
                </li>
              </ul>
            </div>
          </div>

          <div className="close-modal-cointainer">
            <button onClick={handleSetModal}>Close</button>
          </div>
        </div>
      )}

      <div className="search-filters">
        <button
          className="filters-modal-btn filter-btn"
          onClick={handleSetModal}
        >
          Filters
        </button>

        <div className="filters-btns-container">
          <div className="inner-btn genre-filter">
            <button
              className="filter-btn"
              onClick={() => toggleFilterChecked(1)}
            >
              {selectedGenres
                ? `${genreConverter(selectedGenres, "en-US", "movie")}`
                : genre.title}
              <ChevronDown />
            </button>
            <ul>
              {genresTemplate.movie.en_us
                .filter(
                  (g) =>
                    g.name !== "TV Movie" &&
                    g.name !== "Animation" &&
                    g.name !== "Western"
                )
                .map((g) => (
                  <li
                    key={g.id}
                    className={selectedGenres === g.id ? "selected-filter" : ""}
                    onClick={() => {
                      setSelectedGenres((prev) =>
                        prev === g.id ? null : g.id
                      );
                      toggleFilterChecked(0);
                    }}
                  >
                    {g.name}
                  </li>
                ))}
            </ul>
          </div>

          <div className="inner-btn content-type-filter">
            <button
              className="filter-btn"
              onClick={() => toggleFilterChecked(2)}
            >
              {contentType.title}
              {(() => {
                let a = 0;
                movieFilter && a++;
                tvFilter && a++;
                return a !== 0 ? <p>{a}</p> : "";
              })()}
              <ChevronDown />
            </button>

            <ul>
              <li onClick={() => toggleContentType("movieFilter")}>
                {movieFilter ? <CheckSquare /> : <Square />}
                {contentType.movies}
              </li>
              <li onClick={() => toggleContentType("tvFilter")}>
                {tvFilter ? <CheckSquare /> : <Square />}
                {contentType.tvShows}
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
        infoLabels={infoLabels}
        recomendedTvAndSeries={recomendedTvAndSeries}
      />

      <SpinnerLoading toVisible={toVisible} />
    </div>
  );
};

export default Search;
