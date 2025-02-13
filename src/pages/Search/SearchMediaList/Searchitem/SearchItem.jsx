import React from "react";

import { Check, MoreVertical } from "lucide-react";
import {
  runtimeConverter,
  dateConverter,
} from "../../../../functions/Converter";
import { Link } from "react-router-dom";
import playBtn from "../../../../assets/Buttons/playMovieBtn.svg";

import { Plus, Ban } from "lucide-react";

import { filteredMediaType } from "../../../../functions/Converter";
import useMediaClassification from "../../../../hooks/MediaClassification/useMediaClassification";
import { bgDetect } from "../../../../functions/Converter";
import { useDispatch, useSelector } from "react-redux";
import { addToWatchlist } from "../../../../services/firebase/profilesManager";

const SearchItem = (movie) => {
  const answer = movie.movie;

  const id = answer.id;
  const image_path = "https://image.tmdb.org/t/p/original/";
  const language = localStorage.getItem("country");

  const newMediaType = filteredMediaType(answer, answer.mediaType);
  const mediaTitle = newMediaType === "movie" ? answer.title : answer.name;
  const mediaDates =
    newMediaType === "movie" ? answer.release_date : answer.first_air_date;
  const mediaRuntime = newMediaType === "movie" ? answer.runtime : null;
  const mediaType = newMediaType;
  const mediaClass = useMediaClassification({
    id,
    language,
    mediaType,
  });
  const bgClass = bgDetect(mediaClass);

  const userId = useSelector((state) => state.auth.user);
  const profileId = useSelector((state) => state.auth.currentProfile.id);
  const watchlist = useSelector((state) => state.auth.watchList);
  const isInWatchlist = watchlist?.[mediaType]?.includes(id);
  const dispatch = useDispatch();

  const handleToWatchlist = async (userId, profileId, mediaType, mediaId) => {
    try {
      await addToWatchlist(userId, profileId, mediaType, mediaId, dispatch);
    } catch (error) {
      console.error("Error adding to watchlist:", error);
    }
  };

  return (
    <li>
      <Link to={`/detail/${mediaType}/${answer.id}`} className="Card-container">
        <img
          className="skeleton backdropImage"
          src={`${image_path}${answer.backdrop_path}`}
          alt={mediaType === "tv" ? movie.name : movie.title}
          loading="lazy"
        />
      </Link>

      <Link to={`/detail/${mediaType}/${movie.id}`} className="info-card">
        <span>
          <span className="info-card-mediaTitle">{mediaTitle}</span>
          <span className="info-card-mediaDates">
            {dateConverter(mediaDates)}
          </span>
        </span>
      </Link>
      <span className="more-btn">
        <MoreVertical color="white" />
      </span>

      <span className="backdrop-info-card">
        <span className="media-title">
          <h2>{mediaTitle}</h2>
        </span>
        <span className="featureBtns">
          <Link
            to={`/mediaplayer/${answer.videoKey}`}
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
              <p>Play</p>
            </div>
          </Link>
          <div className="option-btns">
            <span
              className="featureBtn-item"
              onClick={() =>
                handleToWatchlist(userId, profileId, mediaType, id)
              }
            >
              <div className="align-btn">
              {isInWatchlist ? <Check /> : <Plus />}
              </div>
            </span>

            <span className="featureBtn-item trailer-btn">
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

            <span className="featureBtn-item ban">
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
            included with Suprime
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
        <span className="backdrop-overview-card">{answer.overview}</span>
      </span>
    </li>
  );
};

export default SearchItem;
