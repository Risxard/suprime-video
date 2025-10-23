import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import "./styles.css";
import {
  image_path_342,
  image_path_92,
  image_path_original,
} from "../../utils/imagePaths";
import { tmdbService } from "../../services/tmdb/tmdbServices";
import PlayActionIcon from "./assets/PlayActionIcon";
import PlusActionIcon from "./assets/PlusActionIcon";
import DoneActionIcon from "./assets/DoneActionIcon";
import LoadingIcon from "../../assets/svgs/LoadingIcon";
import DetailsTab from "./components/DetailsTab";
import MediaPlayer from "../../components/MediaPlayer/MediaPlayer";
import { updateWatchlist } from "../../services/firebase/profileServices";
import { useDispatch, useSelector } from "react-redux";

const DetailsPage = () => {
  const [media, setMedia] = useState(null);
  const [logo, setLogo] = useState(null);
  const [bgOpacity, setBgOpacity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [videoKey, setVideoKey] = useState("");
  const [showPlayer, setShowPlayer] = useState(false);

  const { t } = useTranslation();
  const detailsPage = t("details-page", { returnObjects: true });

  const language = i18next.language;
  const { mediaType, id } = useParams();
  const dispatch = useDispatch();

  const profileId = useSelector((state) => state.auth.currentProfile.id);
  const watchlist = useSelector((state) => state.auth.watchList);
  const isInWatchlist = watchlist?.[mediaType]?.includes(id);
  const action = isInWatchlist ? "remove" : "add";

  const handleToWatchlist = async (profileId, mediaType, mediaId, action) => {
    setIsLoading(true);
    try {
      await updateWatchlist(profileId, mediaType, mediaId, action, dispatch);
    } catch (error) {
      console.error("Erro ao adicionar/remover da watchlist:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchMediaData = async () => {
      setIsLoading(true);
      try {
        const details = await tmdbService.fetchMediaDetails({
          mediaType,
          mediaId: id,
          language,
        });
        setMedia(details);

        const response = await tmdbService.fetchMediaLogoImage({
          mediaId: id,
          mediaType,
          language,
          originalLanguage: details.original_language,
        });

        if (response) setLogo(response.file_path);
      } catch (error) {
        console.error("Erro ao buscar mídia:", error);
      } finally {
        setIsLoading(false);
      }
    };

    setMedia(null);
    setLogo(null);
    setVideoKey("");
    fetchMediaData();
  }, [id, language, mediaType]);

  useEffect(() => {
    if (!media) return;

    const fetchVideoKey = async () => {
      try {
        const response = await tmdbService.fetchVideoKey({
          mediaType,
          mediaId: media.id,
          language,
          originalLanguage: media.original_language,
        });
        if (response) setVideoKey(response);
      } catch (error) {
        console.error("Erro ao buscar videoKey:", error);
      }
    };

    fetchVideoKey();
  }, [mediaType, id, language, media]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const halfScreen = window.innerHeight / 5;
      let newOpacity = 1 - (scrollY / halfScreen) * 0.8;
      if (newOpacity < 0.2) newOpacity = 0.2;
      if (newOpacity > 1) newOpacity = 1;
      setBgOpacity(newOpacity);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {showPlayer && videoKey && (
        <MediaPlayer propsKey={videoKey} onClose={() => setShowPlayer(false)} />
      )}

      <div className="details-page">
        <div className="details-page-container">
          <div className="details-page-content">
            <div
              className="details-page-media-background"
              style={{ opacity: bgOpacity }}
            >
              <div className="details-page-media-background-image">
                <img
                  src={`${image_path_92}${media?.backdrop_path}`}
                  alt=""
                  className="details-page-media-background-image-blurred"
                />
                <img
                  src={`${image_path_original}${media?.backdrop_path}`}
                  alt=""
                  className="details-page-media-background-image-original"
                />
              </div>
              <div className="details-page-media-background-filter" />
            </div>

            <section className="explore-ui-main-container">
              <div className="explore-ui-main-content">
                <div className="explore-ui-main-content-logo">
                  {logo ? (
                    <img
                      src={`${image_path_342}${logo}`}
                      alt="Logo"
                      className="details-page-logo"
                    />
                  ) : (
                    <h2>{media?.title || media?.name}</h2>
                  )}
                </div>

                <div className="explore-ui-main-content-overview">
                  <p>{media?.overview}</p>
                </div>

                <div className="explore-ui-main-content-actions">
                  <button
                    className="play-action"
                    onClick={() => setShowPlayer(true)}
                  >
                    <PlayActionIcon />
                    {detailsPage.actions.play}
                  </button>

                  <div
                    className="watchlist-action"
                    onClick={() =>
                      handleToWatchlist(profileId, mediaType, id, action)
                    }
                  >
                    <button>
                      {isLoading ? (
                        <LoadingIcon />
                      ) : isInWatchlist ? (
                        <DoneActionIcon />
                      ) : (
                        <PlusActionIcon />
                      )}
                    </button>
                    <span className="watchlist-action-showup">
                      {detailsPage.actions.myList}
                    </span>
                  </div>
                </div>
              </div>
            </section>

            <DetailsTab media={media} />
          </div>
        </div>
      </div>

      <div className="app-background" />
    </>
  );
};

export default DetailsPage;
