import React, { useState } from "react";

import "../../../Pages/MediaPlayer/Movie.css";

import { useParams } from "react-router-dom";

import {
  bgDetect,
  dateConverter,
  genreConverter,
  runtimeConverter,
} from "../../../functions/Converter.js";
import playBtn from "../../../assets/svgs/buttons/playBtn.svg";
import { Link } from "lucide-react";
import MovieOptions from "../../Movie/MovieOptions/MovieOptions.jsx";
import useMediaClassification from "../../../hooks/MediaClassification/useMediaClassification.jsx";

var TvDetails = (SectionData) => {
  const mediaType = SectionData.mediaType;
  const language = SectionData.language;
  const title = SectionData.title;
  const original_title = SectionData.original_title;
  const runtime = SectionData.runtime;
  const overview = SectionData.overview;
  const tagline = SectionData.tagline;
  const backdrop_path = SectionData.backdrop_path;
  const release_date = SectionData.release_date;
  const similar = SectionData.similar;
  const genresId = SectionData.genres_Id;
  const vote_average = SectionData.vote_average;
  const vote = vote_average;

  const { id } = useParams();

  const mediaClass = useMediaClassification({ id, language, mediaType });
  const bgClass = bgDetect(mediaClass);



  const genre_ids_to_map = genresId || [];
  const genres = genre_ids_to_map.map((genre) =>
    genreConverter(genre.id, language, "movie")
  );

  return (
    <div className="MovieContent">
      <div className="MoviePanel">
        <div className="MovieTitle">
          <p>{title}</p>
        </div>
      </div>

      <div className="content-btns">
        <span className="IncludeBD">
          <svg
            className="fbl-icon _3UMk3x _1a_Ljt _3H1cN4"
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
          <p>Included with Suprime</p>
        </span>

        <div className="movie-details-container">
          <span className="movie-details-btns">
            <span className="play-btn">
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
              Play
            </span>
            <span className="download-btn">
              <svg
                className="fbl-icon _30dE3d _1a_Ljt"
                viewBox="0 0 24 24"
                height="24"
                width="24"
                role="img"
                aria-hidden="true"
              >
                <title>Downloads</title>
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.664 2.063 C 11.436 2.146,11.257 2.297,11.131 2.511 L 11.020 2.700 11.009 7.639 L 10.999 12.577 9.309 10.893 C 8.151 9.738,7.564 9.180,7.442 9.119 C 7.195 8.996,6.840 8.994,6.590 9.115 C 6.081 9.362,5.875 9.951,6.121 10.460 C 6.172 10.566,7.087 11.507,8.829 13.245 C 11.219 15.629,11.478 15.876,11.657 15.935 C 11.906 16.017,12.094 16.017,12.343 15.935 C 12.522 15.876,12.781 15.629,15.171 13.245 C 16.913 11.507,17.828 10.566,17.879 10.460 C 18.125 9.951,17.919 9.362,17.410 9.115 C 17.160 8.994,16.805 8.996,16.558 9.119 C 16.436 9.180,15.854 9.732,14.690 10.894 L 13.000 12.580 13.000 7.717 C 13.000 2.251,13.020 2.618,12.701 2.299 C 12.429 2.027,12.018 1.933,11.664 2.063 M2.664 15.063 C 2.436 15.146,2.257 15.297,2.131 15.511 L 2.020 15.700 2.020 18.500 L 2.020 21.300 2.131 21.489 C 2.260 21.709,2.437 21.854,2.678 21.939 C 2.830 21.993,3.916 22.000,11.998 22.000 C 22.265 22.000,21.375 22.027,21.701 21.701 C 22.009 21.394,22.000 21.486,22.000 18.500 C 22.000 15.513,22.009 15.607,21.700 15.298 C 21.390 14.988,20.932 14.920,20.531 15.126 C 20.315 15.238,20.103 15.491,20.042 15.711 C 20.016 15.805,20.000 16.627,20.000 17.930 L 20.000 20.000 12.000 20.000 L 4.000 20.000 4.000 17.927 C 4.000 15.581,4.002 15.600,3.701 15.299 C 3.429 15.027,3.018 14.933,2.664 15.063 "
                    fill="currentColor"
                    stroke="none"
                    fillRule="evenodd"
                  ></path>
                </svg>
              </svg>
              Download
            </span>
          </span>

          <span className="play-btn-2" style={{ textDecoration: "none" }}>
            <span className="play-btn-align">
              <img src={playBtn} alt="play" />
              <p>Play</p>
            </span>
          </span>

          <MovieOptions />
        </div>
      </div>

      <div className="description-and-genres">
        <div className="MovieDescriptionContainer">
          <p>{overview}</p>
        </div>
        <div className="time-info">
          <p>{runtime ? runtimeConverter(runtime) : ""}</p>
          <p>{release_date ? dateConverter(release_date) : ""}</p>

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
        {genres.length > 0 && (
          <ul className="genres">
            {genres.map((genre, index) => (
              <li key={index}>
                <p>{genre}</p>
                <h5>·</h5>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TvDetails;
