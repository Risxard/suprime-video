import React, { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { tmdbService } from "../../services/tmdb/tmdbServices.js";
import SearchMediaList from "./SearchMediaList/SearchMediaList.jsx";
import BackdropCarousel from "../../components/Carousels/BackdropCarousel/index.jsx";

import SearchSvg from "./assets/SearchSvg.jsx";
import SearchCancelSvg from "./assets/SearchCancelSvg.jsx";
import "./styles.css";
import LoadingComponent from "../../components/utils/LoadingComponent/index.jsx";
import SpinningLoading from "../../components/utils/SpinningLoading/index.jsx";
import BackdropInfoCarousel from "../../components/Carousels/BackdropInfoCarousel/index.jsx";

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(false);

  const language = useSelector((state) => state.lang.language);
  const { t } = useTranslation();

  const debouncedSearch = useDebounce(searchTerm, 800);

  useEffect(() => {
    const fetchResults = async () => {
      if (!debouncedSearch) {
        setResults([]);
        return;
      }

      setLoading(true);
      try {
        const data = await tmdbService.fetchSearchMulti({
          query: debouncedSearch,
          language,
          page: 1,
        });

        const results = Array.isArray(data) ? data : data.results || [];
        setResults(results);
      } catch (err) {
        console.error("Erro ao buscar:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [debouncedSearch, language]);

  const filteredResults = useMemo(() => {
    return results.filter((item) => {
      const type = item?.media_type?.toLowerCase();
      const isPerson =
        type === "person" ||
        Object.prototype.hasOwnProperty.call(item, "known_for");
      return !isPerson && !!item?.backdrop_path;
    });
  }, [results]);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const data = await tmdbService.fetchTrending({
          timeWindow: "day",
          pageType: "all",
          language,
          page: 1,
        });
        const items = Array.isArray(data) ? data : data.results || [];
        setTrending(items.slice(0, 20));
      } catch (err) {
        console.error("Erro ao buscar tendências:", err);
      }
    };

    fetchTrending();
  }, [language]);

  const placeholder = t("searchPage.placeholder");
  const clearLabel = t("searchPage.buttons.clear");
  const trendingSection = t("searchPage.trendingSection");
  const noResultsText = t("searchPage.noResults", { query: debouncedSearch });

  return (
    <div className="search-page-container">
      <div className="search-page">
        <div className="search-bar-container">
          <input
            id="search-input"
            type="text"
            placeholder={placeholder}
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
              setResults([]);
            }}
            aria-label={clearLabel}
          >
            <SearchCancelSvg />
          </button>
        </div>

        {loading ? (
          <SpinningLoading />
        ) : !debouncedSearch ? (
          <div className="set-group-search">
            <div className="search-carousel-container">
              <div className="section-title">
                <h4>{trendingSection}</h4>
              </div>
              <BackdropInfoCarousel movies={trending} />
            </div>
          </div>
        ) : filteredResults.length === 0 ? (
          <div className="search-not-found">
            <h2>{noResultsText}</h2>
          </div>
        ) : (
          <SearchMediaList medias={filteredResults} />
        )}
      </div>

      <div className="app-background" />
    </div>
  );
};

export default Search;
