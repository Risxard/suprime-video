import React, { useState, useEffect } from "react";
import "./styles.css";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { tmdbService } from "../../services/tmdb/tmdbServices";
import { profileService } from "../../services/firebase/profileServices";
import SearchMediaList from "../Search/SearchMediaList/SearchMediaList";
import LoadingComponent from "../../components/utils/LoadingComponent";

const WatchListPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [medias, setMedias] = useState([]);

  const profileId = useSelector((state) => state.auth.currentProfile?.id);
  const language = useSelector((state) => state.lang.language);
  const { t } = useTranslation();

  const title = t("watchlist-page.title");
  const emptyTitle = t("watchlist-page.empty.title");
  const emptySubtitle = t("watchlist-page.empty.subtitle");
  const loadingText = t("watchlist-page.loading");

  useEffect(() => {
    const fetchWatchlistFromBackend = async () => {
      if (!profileId) return;
      setIsLoading(true);

      try {
        const watchlist = await profileService.getWatchlist(profileId);

        if (!Array.isArray(watchlist) || watchlist.length === 0) {
          setMedias([]);
          return;
        }

        const fetched = await Promise.all(
          watchlist.map(async (item) => {
            try {
              const data = await tmdbService.fetchMediaDetails({
                mediaType: item.media_type,
                mediaId: item.id,
                language,
              });
              return { ...data, media_type: item.media_type };
            } catch (err) {
              console.error("Erro ao buscar item da watchlist:", err);
              return null;
            }
          })
        );

        setMedias(fetched.filter(Boolean));
      } catch (error) {
        console.error("Erro ao buscar watchlist do backend:", error);
        setMedias([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWatchlistFromBackend();
  }, [profileId, language]);

  return (
    <div className="watchlist-page">
      <h1>{title}</h1>

      <div className="tablist-carousel-list-container">
        <div role="tablist" className="tablist-carousel-list">
          <button>{t("watchlist-page.tabs.all")}</button>
        </div>
      </div>

      <div className="watchlist-content">
        {isLoading ? (
          <LoadingComponent text={loadingText} />
        ) : medias.length === 0 ? (
          <div className="watchlist-empty">
            <h3>{emptyTitle}</h3>
            <p>{emptySubtitle}</p>
          </div>
        ) : (
          <SearchMediaList medias={medias} />
        )}
      </div>
    </div>
  );
};

export default WatchListPage;
