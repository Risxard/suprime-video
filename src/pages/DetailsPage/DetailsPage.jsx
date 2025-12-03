import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import "./styles.css";

import {
  image_path_500,
  image_path_92,
  image_path_original,
} from "../../utils/imagePaths";

import PlayActionIcon from "./assets/PlayActionIcon";
import PlusActionIcon from "./assets/PlusActionIcon";
import DoneActionIcon from "./assets/DoneActionIcon";
import LoadingIcon from "../../assets/svgs/LoadingIcon";

import DetailsTab from "./components/DetailsTab";
import MediaPlayer from "../../components/MediaPlayer/MediaPlayer";
import LoadingComponent from "../../components/utils/LoadingComponent";

import { useDispatch, useSelector } from "react-redux";
import { showPopup } from "../../store/slices/popupSlice";

import { useMediaDetails } from "../../hooks/useMediaDetails";
import { useMediaVideo } from "../../hooks/useMediaVideo";
import { useWatchlist } from "../../hooks/useWatchlist";
import { useScrollOpacity } from "../../hooks/useScrollOpacity";
import { useImageLoader } from "../../hooks/useImageLoader";

const DetailsPage = () => {
  const { mediaType, id, referrer } = useParams();
  const { t } = useTranslation();
  const detailsPage = t("details-page", { returnObjects: true });
  const messages = t("details-page", { returnObjects: true });
  const language = i18next.language;

  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const isGuest = user?.isAnonymous === true;

  const profileId = useSelector((state) => state.auth.currentProfile?.id);

  const {
    media,
    logo,
    logoTried,
    loading: loadingMedia,
  } = useMediaDetails(mediaType, id, language);

  const { videoKey } = useMediaVideo(media, mediaType, language);

  const {
    isInWatchlist,
    toggleWatchlist,
    loading: loadingWatchlist,
  } = isGuest
    ? {
        isInWatchlist: () => false,
        toggleWatchlist: async () => {},
        loadingWatchlist: false,
      }
    : useWatchlist(profileId, dispatch);

  const bgOpacity = useScrollOpacity();
  const { isReady, isLoading, onImageLoaded } = useImageLoader(logo);

  const [showPlayer, setShowPlayer] = useState(false);
  const [shouldRenderDetails, setShouldRenderDetails] = useState(true);
  const [autoPlayed, setAutoPlayed] = useState(false);

  useEffect(() => {
    setShowPlayer(false);
    setShouldRenderDetails(true);
    setAutoPlayed(false);
  }, [id]);

  useEffect(() => {
    if (referrer === "play" && videoKey && !autoPlayed) {
      setShowPlayer(true);
      setShouldRenderDetails(false);
      setAutoPlayed(true);
    }
  }, [referrer, videoKey, autoPlayed]);

  const handleClosePlayer = () => {
    setShowPlayer(false);
    setShouldRenderDetails(true);
  };

  const inWatchlist = isInWatchlist(id, mediaType);
  const pageIsLoading = loadingMedia || isLoading;


  const handleWatchlistClick = async () => {
    if (isGuest) {
      dispatch(
        showPopup({
          message: messages.notRegistred,
          iconType: "fail",
        })
      );
      return;
    }

    try {
      await toggleWatchlist(mediaType, id, inWatchlist);

      dispatch(
        showPopup({
          message: inWatchlist
            ? messages.removed
            : messages.added,
          iconType: inWatchlist ? "done" : "done",
        })
      );
    } catch (error) {
      console.error(error);
      dispatch(
        showPopup({
          message: messages.error,
          iconType: "fail",
        })
      );
    }
  };

  const handlePlayClick = () => {
    if (videoKey) {
      setShowPlayer(true);
      setShouldRenderDetails(false);
      return;
    }

    dispatch(
      showPopup({
        message: messages.videoNotFound,
        iconType: "fail",
      })
    );
  };

  return (
    <>
      {pageIsLoading && <LoadingComponent />}

      {showPlayer && videoKey && (
        <MediaPlayer propsKey={videoKey} onClose={handleClosePlayer} />
      )}

      {shouldRenderDetails && media && (
        <div className="details-page" data-set={isReady ? "true" : "false"}>
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
                    onLoad={onImageLoaded}
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
                        onLoad={onImageLoaded}
                        className="details-page-logo"
                        style={{
                          opacity: isReady ? 1 : 0,
                          transition: "opacity 0.6s ease-in-out",
                        }}
                      />
                    ) : (
                      logoTried && (
                        <h2
                          style={{
                            opacity: isReady ? 1 : 0,
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
                    <button className="play-action" onClick={handlePlayClick}>
                      <PlayActionIcon />
                      {detailsPage.actions.play}
                    </button>

                    <div className="watchlist-action">
                      <button
                        disabled={!isGuest && loadingWatchlist}
                        onClick={handleWatchlistClick}
                      >
                        {isGuest ? (
                          <PlusActionIcon />
                        ) : loadingWatchlist ? (
                          <LoadingIcon />
                        ) : inWatchlist ? (
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
