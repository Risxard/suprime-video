import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

import {
  Plus,
  Check,
  AlertCircle,
  Volume1,
  VolumeX,
  Loader,
  Loader2,
} from "lucide-react";

import { setDate, bgDetect } from "../../../../functions/Converter";
import useMediaClassification from "../../../../hooks/MediaClassification/useMediaClassification";
import LoadingIcon from "../../../../assets/svgs/LoadingIcon";
import "./FeatureItem.css";
import useGetVideoKey from "../../../../hooks/GetVideoKey/useGetVideoKeys";
import getLogoImages from "../../../../hooks/ApiCalls/useFetchImages";
import { updateWatchlist } from "../../../../services/firebase/profileServices";
import { useDispatch, useSelector } from "react-redux";
import Player from "../../../MediaPlayer/Player/Player";
import { useTranslation } from "react-i18next";
import IncludeWithSuprime from "../../../utils/IncludeWithSuprime";
import MovieOptionsModal from "../../../Modals/MovieOptionsModal/MovieOptionsModal";
import { setGlobalModal } from "../../../../store/slices/modals";

const FeatureItem = ({ movie, language }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [startVideo, setStartVideo] = useState(false);
  const [startAnimationVideo, setStartAnimationVideo] = useState(false);
  const [userInPage, setUserInPage] = useState(true);
  const [logoImage, setLogoImage] = useState("");
  const [isMuted, setIsMuted] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const buttonsLang = t("buttons");

  const { optionsButtons } = buttonsLang;

  const handleMuteToggle = () => {
    setIsMuted((prevIsMuted) => !prevIsMuted);
  };

  const targetRef = useRef();
  const image_path = "https://image.tmdb.org/t/p/original/";
  const id = movie.id;
  const mediaType = movie.media_type;
  const userId = useSelector((state) => state.auth.user.uid);
  const profileId = useSelector((state) => state.auth.currentProfile.id);
  const mediaClass = useMediaClassification({ id, language, mediaType });
  const bgClass = bgDetect(mediaClass);
  const videoKey = useGetVideoKey(id, language, mediaType);
  const watchlist = useSelector((state) => state.auth.watchList);
  const isInWatchlist = watchlist?.[mediaType]?.includes(id);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const callback = (entries) => {
      setTimeout(() => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      }, 300);
    };

    const observer = new IntersectionObserver(callback, options);
    observer.observe(targetRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (window.innerWidth > 880) {
      const animationTimeOut = setTimeout(() => {
        setStartAnimationVideo(true);
      }, 6000);

      if (isVisible && videoKey && userInPage) {
        return animationTimeOut, setStartVideo(true);
      } else {
        setStartVideo(false);
        setStartAnimationVideo(false);
        clearTimeout(animationTimeOut);
      }
    }
  }, [isVisible, videoKey, userInPage]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setUserInPage(false);
        setStartVideo(false);
        setStartAnimationVideo(false);
      } else {
        setUserInPage(true);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    if ((movie.id, movie.media_type, language)) {
      getLogoImages(movie.id, movie.media_type, language)
        .then((image) => {
          setLogoImage(image);
        })
        .catch((error) => {
          console.error("Error fetching logo image:", error);
        });
    }
  }, [movie.id, movie.media_type, language]);

  const handleToWatchlist = async (profileId, mediaType, mediaId, action) => {
    setIsLoading(true);
    try {
      await updateWatchlist(profileId, mediaType, mediaId, action, dispatch);
    } catch (error) {
      console.error("Error adding to watchlist:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSetGlobalModal = (movie) => {
    dispatch(setGlobalModal(<MovieOptionsModal props={movie} />));
  };

  const handleTouchStart = (e, movie) => {
    const timeout = setTimeout(() => handleSetGlobalModal(movie), 400);
    e.target.addEventListener("touchend", () => clearTimeout(timeout), {
      once: true,
    });
  };

  const action = isInWatchlist ? "remove" : "add";

  return (
    <li
      className={`slide no-video ${isVisible ? "targetVisible" : ""}`}
      onTouchStart={(e) => handleTouchStart(e, movie)}
    >
      <span className="animationTarget" ref={targetRef}>
        TRIGGER
        <input type="radio" checked={isVisible} onChange={() => {}} />
      </span>

      <div className="feature-intro">
        <div className="feature-info-title">
          <Link to={`/detail/${movie.media_type}/${movie.id}`}>
            {logoImage ? (
              <span className="feature-intro-logo">
                <img
                  src={`${image_path}${logoImage.file_path}`}
                  alt="media logo"
                />
              </span>
            ) : (
              <>
                {movie.title == null ? (
                  <h2>{movie.name} </h2>
                ) : (
                  <h2>{movie.title}</h2>
                )}
              </>
            )}
          </Link>

          <span className="feature-overview">
            <p>{movie.overview}</p>
          </span>
        </div>

        <div className="feature-btn">
          <span className="featureBtns">
            <Link
              to={`/detail/${movie.media_type}/${movie.id}/play`}
              className="playnow-btn"
              style={{ textDecoration: "none" }}
            >
              <div className="align-btn">
                <svg
                  className="fbl-icon _30dE3d _1a_Ljt"
                  viewBox="0 0 24 24"
                  height="24"
                  width="24"
                  role="img"
                  aria-hidden="true"
                >
                  <title>Play</title>
                  <svg
                    width="24"
                    height="24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.643 3.069 C 6.546 3.103,6.392 3.206,6.300 3.298 C 5.973 3.624,6.000 2.855,6.000 12.000 C 6.000 21.144,5.974 20.376,6.299 20.701 C 6.568 20.970,6.964 21.065,7.308 20.944 C 7.580 20.848,20.606 12.815,20.748 12.656 C 21.074 12.289,21.074 11.710,20.748 11.345 C 20.607 11.188,7.572 3.150,7.305 3.055 C 7.107 2.985,6.867 2.990,6.643 3.069 "
                      fill="currentColor"
                      stroke="none"
                      fillRule="evenodd"
                    ></path>
                  </svg>
                </svg>

                <p>{optionsButtons.play1}</p>
              </div>
            </Link>
            <span className="feature-options-btn">
              <span
                className="watchlist-btn"
                data-label={optionsButtons.watchlist}
                onClick={() =>
                  handleToWatchlist(profileId, mediaType, id, action)
                }
              >
                <div className="align-btn">
                  {isLoading ? (
                    <LoadingIcon />
                  ) : isInWatchlist ? (
                    <Check />
                  ) : (
                    <Plus />
                  )}
                </div>
              </span>

              <Link
                to={`/detail/${movie.media_type}/${movie.id}`}
                className="details-btn"
                data-label={optionsButtons.details}
              >
                <div className="align-btn">
                  <AlertCircle />
                </div>
              </Link>
            </span>
          </span>

          <IncludeWithSuprime />
        </div>
      </div>

      <span
        className={`mute-btn ${
          targetRef.current && startVideo && startAnimationVideo && userInPage
            ? "startVideo"
            : ""
        }`}
        onClick={handleMuteToggle}
      >
        {!isMuted ? <Volume1 /> : <VolumeX />}
      </span>

      {targetRef.current && startVideo && startAnimationVideo && userInPage ? (
        <span className="class-for-video" />
      ) : (
        ""
      )}

      <Link
        to={`/detail/${movie.media_type}/${movie.id}`}
        className={`filter`}
      ></Link>

      {targetRef.current &&
      startVideo &&
      startAnimationVideo &&
      userInPage &&
      window.innerWidth > 880 ? (
        <span className="feature-slider-video">
          <Player
            videoKey={videoKey}
            controlsMode={0}
            isMuted={isMuted}
          ></Player>
        </span>
      ) : (
        ""
      )}

      <img
        className="backdrop_image"
        src={`${image_path}${movie.backdrop_path}`}
        alt={movie.title}
        loading="lazy"
      />
    </li>
  );
};

export default FeatureItem;
