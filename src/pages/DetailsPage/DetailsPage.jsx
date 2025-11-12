import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import "./styles.css";
import {
  image_path_500,
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
import LoadingComponent from "../../components/utils/LoadingComponent/index";
import {
  getWatchlist,
  updateWatchlist,
} from "../../services/firebase/profileServices";
import { useDispatch, useSelector } from "react-redux";

const DetailsPage = () => {
  const [media, setMedia] = useState(null);
  const [logo, setLogo] = useState(null);
  const [bgOpacity, setBgOpacity] = useState(1);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isWatchlistLoading, setIsWatchlistLoading] = useState(false);
  const [videoKey, setVideoKey] = useState("");
  const [showPlayer, setShowPlayer] = useState(false);
  const [isContentReady, setIsContentReady] = useState(false);
  const [shouldRenderDetails, setShouldRenderDetails] = useState(false);
  const [watchlist, setWatchlist] = useState([]);
  const [logoTried, setLogoTried] = useState(false);

  const imagesLoaded = useRef(0);
  const totalImagesToLoad = useRef(0);

  const { t } = useTranslation();
  const detailsPage = t("details-page", { returnObjects: true });

  const language = i18next.language;
  const { mediaType, id, referrer } = useParams();
  const dispatch = useDispatch();

  const profileId = useSelector((state) => state.auth.currentProfile.id);

  const fetchWatchlist = async () => {
    try {
      const list = await getWatchlist(profileId, dispatch);
      if (Array.isArray(list)) {
        setWatchlist(list);
      } else {
        setWatchlist([]);
      }
    } catch (error) {
      console.error("Erro ao buscar watchlist:", error);
    }
  };

  useEffect(() => {
    if (profileId) fetchWatchlist();
  }, [profileId]);

  const isInWatchlist = watchlist.some(
    (item) => String(item.id) === String(id) && item.media_type === mediaType
  );

  const action = isInWatchlist ? "remove" : "add";

  const handleToWatchlist = async (profileId, mediaType, mediaId, action) => {
    setIsWatchlistLoading(true);
    try {
      await updateWatchlist(profileId, mediaType, mediaId, action, dispatch);
      await fetchWatchlist();
    } catch (error) {
      console.error("Erro ao adicionar/remover da watchlist:", error);
    } finally {
      setIsWatchlistLoading(false);
    }
  };

  useEffect(() => {
    const fetchMediaData = async () => {
      setIsContentReady(false);
      setIsPageLoading(true);
      setLogoTried(false);
      imagesLoaded.current = 0;
      totalImagesToLoad.current = 0;

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

        if (response) {
          setLogo(response.file_path);
        } else {
          setLogo(null);
        }
      } catch (error) {
        console.error("Erro ao buscar mídia:", error);
      } finally {
        setLogoTried(true);
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

        if (response) {
          setVideoKey(response);
        } else {
          setShouldRenderDetails(true);
        }
      } catch (error) {
        console.error("Erro ao buscar videoKey:", error);
        setShouldRenderDetails(true);
      }
    };

    fetchVideoKey();
  }, [mediaType, id, language, media]);

  useEffect(() => {
    if (referrer === "play" && videoKey) {
      setShowPlayer(true);
      setShouldRenderDetails(false);
    } else {
      setShouldRenderDetails(true);
    }
  }, [referrer, videoKey]);

  const handleClosePlayer = () => {
    setShowPlayer(false);
    setShouldRenderDetails(true);
  };

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

  const handleImageLoaded = () => {
    imagesLoaded.current += 1;
    if (imagesLoaded.current >= totalImagesToLoad.current) {
      setTimeout(() => {
        setIsContentReady(true);
        setIsPageLoading(false);
      }, 250);
    }
  };

  useEffect(() => {
    let count = 1;
    if (logo) count += 1;
    totalImagesToLoad.current = count;
  }, [logo]);

  return (
    <>
      {isPageLoading && <LoadingComponent />}

      {showPlayer && videoKey && (
        <MediaPlayer propsKey={videoKey} onClose={handleClosePlayer} />
      )}

      {shouldRenderDetails && media && (
        <div
          className="details-page"
          data-set={isContentReady ? "true" : "false"}
        >
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
                    onLoad={handleImageLoaded}
                  />
                </div>
                <div className="details-page-media-background-filter" />
              </div>

              <section className="explore-ui-main-container">
                <div className="explore-ui-main-content">
                  <div className="explore-ui-main-content-logo">
                    {logo ? (
                      <img
                        src={`${image_path_500}${logo}`}
                        alt="Logo"
                        className="details-page-logo"
                        onLoad={handleImageLoaded}
                        style={{
                          opacity: isContentReady ? 1 : 0,
                          transition: "opacity 0.6s ease-in-out",
                        }}
                      />
                    ) : (
                      logoTried && (
                        <h2
                          style={{
                            opacity: isContentReady ? 1 : 0,
                            transition: "opacity 0.6s ease-in-out",
                          }}
                        >
                          {media?.title || media?.name}
                        </h2>
                      )
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
                      <button disabled={isWatchlistLoading}>
                        {isWatchlistLoading ? (
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
      )}

      <div className="app-background" />
    </>
  );
};

export default DetailsPage;
