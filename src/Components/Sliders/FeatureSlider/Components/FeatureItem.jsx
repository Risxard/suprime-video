import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

import playBtn from "../../../../assets/svgs/buttons/playBtn.svg";
import { Plus, Check } from "lucide-react";

import { setDate, bgDetect } from "../../../../functions/Converter";
import VoteAvarage from "../../../VoteAvarage/voteAvarage";

import useMediaClassification from "../../../../hooks/MediaClassification/useMediaClassification";
import { useFeatureAnimation } from "../../../../hooks/IntersectionObserver/Animation/useFeatureAnimation";

import "./style.css";

const FeatureItem = ({ movie, language, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const targetRef = useRef();

  const image_path = "https://image.tmdb.org/t/p/original/";

  const id = movie.id;
  const mediaType = movie.media_type;

  const mediaClass = useMediaClassification({ id, language, mediaType });
  const bgClass = bgDetect(mediaClass);

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

  return (
    <div className={`slide ${isVisible ? "targetVisible" : ""}`}>
      <span className="animationTarget" ref={targetRef}>
        TRIGGER
        <input type="radio" checked={isVisible} onChange={() => {}} />
      </span>

      <div className="feature-intro">
        <div className="feature-info-title animationIn">
          <div>
            <Link to={`/suprime-video/${movie.media_type}/${movie.id}`}>
              {movie.title == null ? (
                <h2>{movie.name} </h2>
              ) : (
                <h2>{movie.title}</h2>
              )}
            </Link>
          </div>
        </div>

        <div className="feature-btn">
          <div className="class-container animationIn">
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
              <h3>included with Suprime</h3>
            </span>

            {mediaClass ? (
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
            )}
          </div>

          <span className="featureBtns animationIn">
            <Link
              to={`/suprime-video/${movie.media_type}/${movie.id}`}
              className="playnow-btn"
              style={{ textDecoration: "none" }}
            >
              <div className="align-btn">
                <img src={playBtn} alt="play" />
                <p>Play</p>
              </div>
            </Link>
            <span className="watchlist-btn">
              <div className="align-btn">
                <Plus />
              </div>
            </span>
          </span>
        </div>
      </div>

      <Link
        to={`/suprime-video/${movie.media_type}/${movie.id}`}
        className="filter"
      ></Link>
      <img src={`${image_path}${movie.backdrop_path}`} alt={movie.title} />
    </div>
  );
};

export default FeatureItem;
