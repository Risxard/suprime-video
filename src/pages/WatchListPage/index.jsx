import React, { useState, useEffect } from "react";

import "./styles.css";
import { useSelector } from "react-redux";
import { ChevronDown } from "lucide-react";

import { toggleFilterChecked } from "./scripts/watchlistScript";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Trans } from "react-i18next";
import { tmdbService } from "../../services/tmdb/tmdbServices";
import DetailCardList from "../../components/Cards/DetailCardList/DetailCardList";
import SearchMediaList from "../Search/SearchMediaList/SearchMediaList";
import LoadingComponent from "../../components/utils/LoadingComponent";
import { setLoading } from "../../store/auth";

const WatchListPage = () => {
  const { filterId } = useParams();
  const [medias, setMedias] = useState({ movies: [], tv: [] });
  const [filterType, setFilterType] = useState(filterId);
  const [isLoading, setIsLoading] = useState(false);

  const watchlist = useSelector((state) => state.auth.watchList);
  const language = useSelector((state) => state.lang.language);
  const { t } = useTranslation();

  const watchlistPage = t("watchlistPage");
  const watchlistButtonsPage = t("watchlistPage.buttons");
  const { genres, featuredCollections } = watchlistPage;
  const { all, moviesLang, tvShowsLang, mostRecent, orderAz, orderZa } =
    watchlistButtonsPage;

  useEffect(() => {
    const fetchMedia = async () => {
      setIsLoading(true);
      try {
        const fetchedMovies = watchlist.movie
          ? await Promise.all(
              watchlist.movie.map(async (id) => {
                const data = await tmdbService.fetchMediaDetails({
                  mediaType: "movie",
                  mediaId: id,
                  language,
                });
                return data;
              })
            )
          : [];

        const fetchedTVShows = watchlist.tv
          ? await Promise.all(
              watchlist.tv.map(async (id) => {
                const data = await tmdbService.fetchMediaDetails({
                  mediaType: "tv",
                  mediaId: id,
                  language,
                });
                return data;
              })
            )
          : [];

        setMedias({ movies: fetchedMovies, tv: fetchedTVShows });
        setIsLoading(false);
      } catch (err) {
        console.error("Erro ao buscar watchlist:", err);
      }
    };

    if (watchlist) {
      fetchMedia();
    }
  }, [watchlist, language]);

  const mostRecentSort = mostRecent;
  const azSort = orderAz;
  const zaSort = orderZa;
  const [mediaSort, setMediaSort] = useState(mostRecentSort);

  const movies = medias.movies;
  const tv = medias.tv;

  const sortedMovies = [...movies].sort((a, b) => {
    if (mediaSort === azSort) {
      return a.title.localeCompare(b.title);
    } else if (mediaSort === zaSort) {
      return b.title.localeCompare(a.title);
    }
    return 0;
  });

  const sortedTV = [...tv].sort((a, b) => {
    if (mediaSort === azSort) {
      return a.name.localeCompare(b.name);
    } else if (mediaSort === zaSort) {
      return b.name.localeCompare(a.name);
    }
    return 0;
  });

  const filteredMedia =
    filterType === "movies"
      ? sortedMovies
      : filterType === "tv"
      ? sortedTV
      : [...sortedMovies, ...sortedTV];

  return (
    <div className="watchlist-page">
      <h1>Minha Lista</h1>

      <div className="tablist-carousel-list-container">
        <div role="tablist" className="tablist-carousel-list">
          <button className={"active"}>Meus Filmes e Séries</button>
        </div>
      </div>

      <div className="watchlist-content">
        {isLoading ? (
          <LoadingComponent />
        ) : filteredMedia.length === 0 ? (
          <div className="watchlist-empty">
            <h3>Você ainda não adicionou nada</h3>
            <p>Coloque os títulos que você quer assistir na Minha Lista.</p>
          </div>
        ) : (
          <SearchMediaList filteredMedias={filteredMedia} />
        )}
      </div>
    </div>
  );
};

export default WatchListPage;
