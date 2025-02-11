import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

import { Plus, Check, AlertCircle, Volume1, VolumeX } from "lucide-react";

import { setDate, bgDetect } from "../../../../functions/Converter";

import useMediaClassification from "../../../../hooks/MediaClassification/useMediaClassification";
import Player from "../../../MediaDetail/Player/Player";

import "./FeatureItem.css";
import useGetVideoKey from "../../../../hooks/GetVideoKey/useGetVideoKeys";
import getLogoImages from "../../../../hooks/ApiCalls/useFetchImages";
import { addToWatchlist } from "../../../../services/firebase/profilesManager";
import { useSelector } from "react-redux";

const FeatureItem = ({ movie, language }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [startVideo, setStartVideo] = useState(false);
  const [startAnimationVideo, setStartAnimationVideo] = useState(false);
  const [userInPage, setUserInPage] = useState(true);
  const [logoImage, setLogoImage] = useState("");
  const [isMuted, setIsMuted] = useState(true);

  const handleMuteToggle = () => {
    setIsMuted((prevIsMuted) => !prevIsMuted);
  };

  const targetRef = useRef();
  const image_path = "https://image.tmdb.org/t/p/original/";
  const id = movie.id;
  const mediaType = movie.media_type;
  const userId = useSelector((state) => state.auth.user);
  const profileId = useSelector((state) => state.auth.currentProfile.id);
  const mediaClass = useMediaClassification({ id, language, mediaType });
  const bgClass = bgDetect(mediaClass);
  const videoSource = useGetVideoKey(id, language, mediaType);
  const videoKey = videoSource.videoKey;

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




  
  return (
    <li className={`slide no-video ${isVisible ? "targetVisible" : ""}`}>
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
              to={`/mediaplayer/${videoKey}`}
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

                <p>Watch now</p>
              </div>
            </Link>
            <span className="feature-options-btn">
              <span
                className="watchlist-btn"
                onClick={() => handleToWatchlist(userId, profileId, mediaType, id)}
              >
                <div className="align-btn">
                  <Plus />
                  {/* <Check/> */}
                </div>
              </span>

              <Link
                to={`/detail/${movie.media_type}/${movie.id}`}
                className="details-btn"
              >
                <div className="align-btn">
                  <AlertCircle />
                </div>
              </Link>
            </span>
          </span>

          <div className="class-container">
            <span className="includeBD">
              <span>
                <svg
                  viewBox="0 0 24 24"
                  height="24"
                  width="24"
                  role="img"
                  aria-hidden="true"
                >
                  <title>Entitled</title>
                  <svg
                    width="24"
                    height="24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.120 2.039 C 8.641 2.287,6.414 3.362,4.761 5.107 C 1.806 8.228,1.158 12.819,3.137 16.623 C 3.620 17.552,4.164 18.288,4.938 19.061 C 5.930 20.051,7.038 20.789,8.272 21.278 C 11.634 22.610,15.313 22.080,18.200 19.845 C 18.637 19.507,19.507 18.637,19.845 18.200 C 21.256 16.378,22.000 14.236,22.000 12.000 C 22.000 7.432,18.842 3.387,14.430 2.303 C 13.446 2.062,12.028 1.948,11.120 2.039 M17.092 8.191 C 17.410 8.341,17.660 8.592,17.816 8.920 C 17.926 9.151,17.940 9.221,17.940 9.541 C 17.940 9.869,17.928 9.927,17.805 10.181 C 17.679 10.443,17.480 10.651,14.545 13.588 C 11.578 16.558,11.406 16.723,11.140 16.848 C 10.888 16.967,10.824 16.980,10.500 16.980 C 10.176 16.980,10.112 16.967,9.860 16.848 C 9.604 16.726,9.466 16.600,8.193 15.328 C 6.915 14.051,6.794 13.918,6.672 13.660 C 6.554 13.408,6.540 13.344,6.540 13.020 C 6.540 12.700,6.554 12.631,6.664 12.400 C 6.821 12.070,7.070 11.821,7.400 11.664 C 7.631 11.554,7.700 11.540,8.020 11.540 C 8.343 11.540,8.408 11.554,8.654 11.670 C 8.891 11.782,9.036 11.907,9.714 12.578 L 10.500 13.356 13.020 10.843 C 15.629 8.240,15.687 8.188,16.110 8.081 C 16.380 8.013,16.817 8.061,17.092 8.191 "
                      fill="currentColor"
                      stroke="none"
                      fillRule="evenodd"
                    ></path>
                  </svg>
                </svg>
              </span>
              <p>included with Suprime</p>
            </span>

            {/* {mediaClass ? (
              <span
                className="ageClass"
                title=""
                style={{
                  backgroundColor: language === "pt-BR" ? "#FFFFFF" : "noneF",
                }}
              >
                <h3
                  style={{
                    backgroundColor: bgClass,
                    color: language === "pt-BR" ? "#FFFFFF" : "#E8ECEF",
                    border: language === "en-US" ? "2px solid #E8ECEF" : "none",
                  }}
                >
                  {mediaClass}
                </h3>
              </span>
            ) : (
              ""
            )} */}
          </div>
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
