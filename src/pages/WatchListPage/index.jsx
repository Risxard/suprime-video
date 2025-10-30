import React, { useState, useEffect } from "react";
import "./styles.css";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { tmdbService } from "../../services/tmdb/tmdbServices";
import SearchMediaList from "../Search/SearchMediaList/SearchMediaList";
import LoadingComponent from "../../components/utils/LoadingComponent";

const WatchListPage = () => {
  const { filterId } = useParams();
  const [medias, setMedias] = useState({ movies: [], tv: [] });
  const [filterType, setFilterType] = useState(filterId);
  const [isLoading, setIsLoading] = useState(false);

  const watchlist = useSelector((state) => state.auth.watchList);
  const language = useSelector((state) => state.lang.language);
  const { t } = useTranslation();


  const title = t("watchlist-page.title");
  const subtitle = t("watchlist-page.subtitle");
  const emptyTitle = t("watchlist-page.empty.title");
  const emptySubtitle = t("watchlist-page.empty.subtitle");
  const loadingText = t("watchlist-page.loading");

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
      } catch (err) {
        console.error("Erro ao buscar watchlist:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (watchlist) {
      fetchMedia();
    }
  }, [watchlist, language]);

  const movies = medias.movies;
  const tv = medias.tv;

  const filteredMedia =
    filterType === "movies"
      ? movies
      : filterType === "tv"
      ? tv
      : [...movies, ...tv];

  return (
    <div className="watchlist-page">
      <h1>{title}</h1>

      <div className="tablist-carousel-list-container">
        <div role="tablist" className="tablist-carousel-list">
          <button className="active">{subtitle}</button>
        </div>
      </div>

      <div className="watchlist-content">
        {isLoading ? (
          <LoadingComponent text={loadingText} />
        ) : filteredMedia.length === 0 ? (
          <div className="watchlist-empty">
            <h3>{emptyTitle}</h3>
            <p>{emptySubtitle}</p>
          </div>
        ) : (
          <SearchMediaList filteredMedias={filteredMedia} />
        )}
      </div>
    </div>
  );
};

export default WatchListPage;
