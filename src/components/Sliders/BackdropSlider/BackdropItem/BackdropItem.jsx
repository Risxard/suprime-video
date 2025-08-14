import React, { useState } from "react";

import { Link } from "react-router-dom";

import { Plus, Ban, Check } from "lucide-react";

import "./BackdropItem.css";
import {
  bgDetect,
  dateConverter,
  filteredMediaType,
  runtimeConverter,
} from "../../../../functions/Converter";
import useMediaClassification from "../../../../hooks/MediaClassification/useMediaClassification";
import playBtn from "../../../../assets/Buttons/playMovieBtn.svg";
import { fetchMediaClassification } from "./fetchMediaClassification";
import { updateWatchlist } from "../../../../services/firebase/profileServices";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { setGlobalModal } from "../../../../store/slices/modals";
import MovieOptionsModal from "../../../Modals/MovieOptionsModal/MovieOptionsModal";
import LoadingIcon from "../../../../assets/svgs/LoadingIcon";

export default function Backdropitem({ movie, mediaType, language }) {
  const [mediaClass, setMediaClass] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const newMediaType = filteredMediaType(movie, mediaType);
  const mediaTitle = newMediaType === "movie" ? movie.title : movie.name;
  const mediaDates =
    newMediaType === "movie" ? movie.release_date : movie.first_air_date;
  const mediaRuntime = newMediaType === "movie" ? movie.runtime : null;
  const image_path = "https://image.tmdb.org/t/p/original/";
  const id = movie.id;
  const profileId = useSelector((state) => state.auth.currentProfile.id);
  const watchlist = useSelector((state) => state.auth.watchList);
  const isInWatchlist = watchlist?.[mediaType]?.includes(id);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const buttonsLang = t("buttons");
  const componentsLang = t("components");

  const { includeWithAcaiwave } = componentsLang;

  const { optionsButtons } = buttonsLang;

  const bgClass = bgDetect(mediaClass);

  async function handleMediaClass() {
    // if (mediaClass !== null) {
    //   const classe = await fetchMediaClassification({ id, language, mediaType });
    //   setMediaClass(classe);
    // }
  }

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

  const handleSetGlobalModal = (movie, mediaType) => {
    if (movie && mediaType) {
      dispatch(
        setGlobalModal(
          <MovieOptionsModal props={movie} mediaType={mediaType} />
        )
      );
    }
  };

  const handleTouchStart = (e, movie, mediaType) => {
    e.preventDefault();

    let isScrolling = false;

    const handleScroll = () => {
      isScrolling = true;
    };

    const handleTouchMove = () => {
      isScrolling = true;
    };

    const handleTouchEnd = () => {
      clearTimeout(timeout);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("touchmove", handleTouchMove);
    };

    const timeout = setTimeout(() => {
      if (!isScrolling) {
        handleSetGlobalModal(movie, mediaType);
      }
    }, 500);

    e.target.addEventListener("touchend", handleTouchEnd, { once: true });
    window.addEventListener("scroll", handleScroll, { once: true });
    window.addEventListener("touchmove", handleTouchMove, { once: true });
  };


  const action = isInWatchlist ? "remove" : "add";
  return (
    <li
      className="Slide-Item"
      key={movie.id}
      onMouseEnter={() => handleMediaClass()}
      onTouchStart={(e) => handleTouchStart(e, movie, mediaType)}
    >
      <div className="Slide-item-container">
        <Link
          to={`/detail/${mediaType}/${movie.id}`}
          className="Card-container"
        >
          <img
            className="skeleton backdropImage"
            src={`${image_path}${movie.backdrop_path}`}
            alt={mediaType === "tv" ? movie.name : movie.title}
            loading="lazy"
          />
        </Link>

        <span className="backdrop-info-card">
          <span className="media-title">
            <h2>{mediaTitle}</h2>
          </span>
          <span className="featureBtns">
            <Link
              to={`/detail/${mediaType}/${movie.id}/play`}
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
                <p>{optionsButtons.play2}</p>
              </div>
            </Link>

            <div className="option-btns">
              <span
                className="featureBtn-item"
                data-label={optionsButtons.watchlist}
                onClick={() =>
                  handleToWatchlist(profileId, mediaType, id, action)
                }
              >
                <div className="align-btn">
                  {isLoading ? <LoadingIcon /> : isInWatchlist ? <Check /> : <Plus />}
                </div>
              </span>

              <span
                className="featureBtn-item trailer-btn"
                data-label={optionsButtons.trailer}
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
                    <title>Trailer</title>
                    <svg
                      width="24"
                      height="24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.503 3.042 C 3.487 3.214,2.556 3.976,2.202 4.925 C 1.994 5.481,2.001 5.233,2.001 11.992 C 2.000 18.878,1.989 18.550,2.234 19.151 C 2.521 19.857,3.143 20.479,3.849 20.766 C 4.453 21.012,4.024 21.000,12.000 21.000 C 19.974 21.000,19.547 21.012,20.150 20.767 C 20.850 20.482,21.482 19.850,21.767 19.150 C 22.011 18.551,22.000 18.876,22.000 12.000 C 22.000 5.123,22.011 5.449,21.766 4.849 C 21.499 4.193,20.964 3.633,20.296 3.312 C 19.636 2.994,20.412 3.023,12.120 3.015 C 8.039 3.012,4.611 3.024,4.503 3.042 M19.340 5.066 C 19.455 5.105,19.603 5.201,19.701 5.299 C 20.023 5.621,20.000 5.097,20.000 12.000 C 20.000 18.903,20.023 18.379,19.701 18.701 C 19.377 19.025,20.023 19.000,12.000 19.000 C 3.977 19.000,4.623 19.025,4.299 18.701 C 3.977 18.379,4.000 18.903,4.000 12.000 C 4.000 5.096,3.976 5.621,4.300 5.298 C 4.616 4.982,3.975 5.007,11.983 5.003 C 18.550 5.000,19.162 5.006,19.340 5.066 M5.660 6.652 C 5.495 6.817,5.467 6.980,5.486 7.649 C 5.501 8.185,5.537 8.291,5.749 8.429 C 5.840 8.489,5.953 8.500,6.500 8.500 C 7.047 8.500,7.160 8.489,7.251 8.429 C 7.463 8.291,7.499 8.185,7.514 7.649 C 7.533 6.980,7.505 6.817,7.340 6.652 L 7.208 6.520 6.500 6.520 L 5.792 6.520 5.660 6.652 M16.660 6.652 C 16.495 6.817,16.467 6.980,16.486 7.649 C 16.501 8.185,16.537 8.291,16.749 8.429 C 16.840 8.489,16.953 8.500,17.500 8.500 C 18.047 8.500,18.160 8.489,18.251 8.429 C 18.463 8.291,18.499 8.185,18.514 7.649 C 18.533 6.980,18.505 6.817,18.340 6.652 L 18.208 6.520 17.500 6.520 L 16.792 6.520 16.660 6.652 M10.208 9.081 C 9.955 9.235,9.960 9.175,9.960 12.000 C 9.960 14.825,9.955 14.763,10.208 14.921 C 10.473 15.088,10.486 15.081,12.720 13.687 C 14.134 12.806,14.808 12.363,14.870 12.276 C 14.974 12.128,14.986 11.927,14.901 11.761 C 14.856 11.675,14.332 11.328,12.831 10.389 C 11.725 9.698,10.762 9.103,10.692 9.066 C 10.522 8.978,10.369 8.983,10.208 9.081 M5.768 11.067 C 5.534 11.182,5.500 11.301,5.500 12.000 C 5.500 12.952,5.548 13.000,6.500 13.000 C 7.452 13.000,7.500 12.952,7.500 12.000 C 7.500 11.047,7.452 10.999,6.494 11.001 C 6.028 11.002,5.872 11.016,5.768 11.067 M16.768 11.067 C 16.534 11.182,16.500 11.301,16.500 12.000 C 16.500 12.952,16.548 13.000,17.500 13.000 C 18.452 13.000,18.500 12.952,18.500 12.000 C 18.500 11.047,18.452 10.999,17.494 11.001 C 17.028 11.002,16.872 11.016,16.768 11.067 M5.660 15.652 C 5.495 15.817,5.467 15.980,5.486 16.649 C 5.501 17.185,5.537 17.291,5.749 17.429 C 5.840 17.489,5.953 17.500,6.500 17.500 C 7.047 17.500,7.160 17.489,7.251 17.429 C 7.463 17.291,7.499 17.185,7.514 16.649 C 7.533 15.980,7.505 15.817,7.340 15.652 L 7.208 15.520 6.500 15.520 L 5.792 15.520 5.660 15.652 M16.660 15.652 C 16.495 15.817,16.467 15.980,16.486 16.649 C 16.501 17.185,16.537 17.291,16.749 17.429 C 16.840 17.489,16.953 17.500,17.500 17.500 C 18.047 17.500,18.160 17.489,18.251 17.429 C 18.463 17.291,18.499 17.185,18.514 16.649 C 18.533 15.980,18.505 15.817,18.340 15.652 L 18.208 15.520 17.500 15.520 L 16.792 15.520 16.660 15.652 "
                        fill="currentColor"
                        stroke="none"
                        fillRule="evenodd"
                      ></path>
                    </svg>
                  </svg>
                </div>
              </span>

              <span
                className="featureBtn-item ban"
                data-label={
                  mediaType === "movie"
                    ? optionsButtons.hideMediaMovie
                    : optionsButtons.hideMediaSerie
                }
              >
                <div className="align-btn">
                  <Ban />
                </div>
              </span>
            </div>
          </span>
          <div className="class-container">
            <span className="includeBD">
              <span>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_437_254)">
                    <path
                      d="M11.1198 2.03902C8.64083 2.28702 6.41383 3.36202 4.76083 5.10702C1.80583 8.22802 1.15783 12.819 3.13683 16.623C3.61983 17.552 4.16383 18.288 4.93783 19.061C5.92983 20.051 7.03783 20.789 8.27183 21.278C11.6338 22.61 15.3128 22.08 18.1998 19.845C18.6368 19.507 19.5068 18.637 19.8448 18.2C21.2558 16.378 21.9998 14.236 21.9998 12C21.9998 7.43202 18.8418 3.38702 14.4298 2.30302C13.4458 2.06202 12.0278 1.94802 11.1198 2.03902ZM17.0918 8.19102C17.4098 8.34102 17.6598 8.59202 17.8158 8.92002C17.9258 9.15102 17.9398 9.22102 17.9398 9.54102C17.9398 9.86902 17.9278 9.92702 17.8048 10.181C17.6788 10.443 17.4798 10.651 14.5448 13.588C11.5778 16.558 11.4058 16.723 11.1398 16.848C10.8878 16.967 10.8238 16.98 10.4998 16.98C10.1758 16.98 10.1118 16.967 9.85983 16.848C9.60383 16.726 9.46583 16.6 8.19283 15.328C6.91483 14.051 6.79383 13.918 6.67183 13.66C6.55383 13.408 6.53983 13.344 6.53983 13.02C6.53983 12.7 6.55383 12.631 6.66383 12.4C6.82083 12.07 7.06983 11.821 7.39983 11.664C7.63083 11.554 7.69983 11.54 8.01983 11.54C8.34283 11.54 8.40783 11.554 8.65383 11.67C8.89083 11.782 9.03583 11.907 9.71383 12.578L10.4998 13.356L13.0198 10.843C15.6288 8.24002 15.6868 8.18802 16.1098 8.08102C16.3798 8.01302 16.8168 8.06102 17.0918 8.19102Z"
                      fill="#7B26D2"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_437_254">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </span>
              {includeWithAcaiwave.title}
            </span>
          </div>

          <div className="backdrop-runtime-card">
            {dateConverter(mediaDates)}

            {mediaRuntime ? runtimeConverter(mediaRuntime) : ""}
            {mediaClass ? (
              <span
                className="ageClass"
                title=""
                style={{
                  backgroundColor: language === "pt" ? "#FFFFFF" : "noneF",
                }}
              >
                <h4
                  style={{
                    backgroundColor: bgClass,
                    color: language === "pt" ? "#FFFFFF" : "#E8ECEF",
                    border: language === "en" ? "2px solid #E8ECEF" : "none",
                  }}
                >
                  {mediaClass}
                </h4>
              </span>
            ) : (
              ""
            )}
          </div>
          <span className="backdrop-overview-card">{movie.overview}</span>
        </span>
      </div>
    </li>
  );
}
