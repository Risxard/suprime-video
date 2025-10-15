import React, { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { tmdbService } from "../../services/tmdb/tmdbServices.js";
import SearchMediaList from "./SearchMediaList/SearchMediaList.jsx";

import "./styles.css";
import SearchSvg from "./assets/SearchSvg.jsx";
import SearchCancelSvg from "./assets/SearchCancelSvg.jsx";
import SectionBuilder from "../../components/utils/SectionBuilder/SectionBuilder.jsx";
import SimpleBackdropCarousel from "../../components/Sliders/SimpleBackdropCarousel/SimpleBackdropCarousel.jsx";


function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [mediasTrending, setMediasTrending] = useState([]);

  const { t } = useTranslation();
  const language = useSelector((state) => state.lang.language);
  const debouncedSearch = useDebounce(searchTerm, 800);


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

        setResults(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Erro na busca:", error);
      }
    };

    fetchData();
  }, [debouncedSearch, language]);


  const filteredResults = useMemo(() => {
    return results.filter((item) => {
      const mediaType = (item?.media_type || "").toLowerCase();
      const looksLikePerson =
        mediaType === "person" ||
        Object.prototype.hasOwnProperty.call(item, "known_for") ||
        Object.prototype.hasOwnProperty.call(item, "known_for_department");

      return !looksLikePerson && !!item?.backdrop_path;
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
        setMediasTrending(items.slice(0, 20));
      } catch (err) {
        console.error("Erro ao buscar filmes:", err);
      }
    };

    fetchTrending();
  }, [language]);

  const searchPage = t("searchPage.buttons");
  const recomendedTvAndSeries = t("sectionTitles.recomendedTvAndSeries");



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
              setResults([]);
            }}
          >
            <SearchCancelSvg />
          </button>
        </div>


        {filteredResults.length === 0 ? (
          <div className="set-group-search">

            <SectionBuilder
              children={<SimpleBackdropCarousel movies={mediasTrending} />}
              sectionTitle={"Buscas em Alta Hoje"}
            />
          </div>
        ) : (
          <SearchMediaList
            filteredMedias={filteredResults}
            recomendedTvAndSeries={recomendedTvAndSeries}
          />
        )}
      </div>
      <div className="app-background" />
    </div>
  );
};

export default Search;
