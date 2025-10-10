import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { tmdbService } from "../../services/tmdb/tmdbServices.js";
import SearchMediaList from "./SearchMediaList/SearchMediaList.jsx";

import "./styles.css";
import SearchSvg from "./assets/SearchSvg.jsx";
import SearchCancelSvg from "./assets/SearchCancelSvg.jsx";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [results, setResults] = useState([]);

  const { t } = useTranslation();
  const language = useSelector((state) => state.lang.language);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 2000);

    return () => clearTimeout(handler);
  }, [searchTerm]);


  useEffect(() => {
    const fetchData = async () => {
      if (!debouncedSearch) {
        setResults([]);
        return;
      }

      try {
        const data = await tmdbService.fetchSearchMulti({
          query: debouncedSearch,
          language,
          page: 1,
        });

        const rawResults = Array.isArray(data) ? data : [];

        const filtered = rawResults.filter(Boolean).filter((item) => {
          const mediaType = (item?.media_type || "").toLowerCase();
          const looksLikePerson =
            mediaType === "person" ||
            Object.prototype.hasOwnProperty.call(item, "known_for") ||
            Object.prototype.hasOwnProperty.call(item, "known_for_department");

          return !looksLikePerson && !!item?.backdrop_path;
        });

        setResults(filtered);
      } catch (error) {
        console.error("Erro na busca:", error);
      }
    };

    fetchData();
  }, [debouncedSearch, language]);

  const searchPage = t("searchPage.buttons");
  const recomendedTvAndSeries = t("sectionTitles.recomendedTvAndSeries");
  const { infoLabels } = searchPage;



  return (
    <div className="search-page-container">
      <div className="search-page">
        <div className="search-bar-container">
          <input
            id="search-input"
            type="text"
            placeholder="Pesquise por título, gênero, time ou liga"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <label htmlFor="search-input">
            <SearchSvg />
          </label>
          <button
            className={searchTerm ? "active" : ""}
            onClick={() => {
              setSearchTerm("");
              setDebouncedSearch("");
              setResults([]);
            }}
          >
            <SearchCancelSvg />
          </button>
        </div>

        <SearchMediaList
          filteredMedias={results}
          recomendedTvAndSeries={recomendedTvAndSeries}
        />
      </div>
      <div className="app-background" />
    </div>
  );
};

export default Search;
