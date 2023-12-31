import React from "react";
import { Link } from "react-router-dom";

import { useState, useEffect } from "react";
import { guestApiKey } from "../../../services/guestApi";

import { genreConverter } from "../../../functions/Converter";
import { dateConverter } from "../../../functions/Converter";
import { useParams } from "react-router-dom";

import seeAllBtn from '../../../assets/svgs/buttons/seeAllBtn.svg'
import prevBtn from "../../../assets/svgs/buttons/prevBtn.svg";
import nextBtn from "../../../assets/svgs/buttons/nextBtn.svg";
import playBtn from "../../../assets/svgs/buttons/playBtn.svg";
import shareBtn from "../../../assets/svgs/buttons/shareBtn.svg";
import downloadBtn from "../../../assets/svgs/buttons/downloadBtn.svg";
import watchListBtn from "../../../assets/svgs/buttons/watchListBtn.svg";

import "./BackdropSlider.css";

export default function BackdropSlider(SectionData) {
  const language = SectionData.language;

  const APIKey = guestApiKey;

  const image_path = "https://image.tmdb.org/t/p/original/";
  const api_path = "https://api.themoviedb.org/";
  const [movies, setMovies] = useState([]);

  const { id } = useParams();

  const mediaType = SectionData.mediaType;

  const idParam = SectionData.id;
  const API_ADRESS = SectionData.genre;
  const SectionTitle = SectionData.sectionTitle;

  const NextButton = idParam + "-NextBtn";
  const PrevButton = idParam + "-PrevBtn";
  const SlideList = idParam + "-Slide-List";
  const SlideItem = idParam + "-Slide-Item";

  useEffect(() => {
    fetch(`${api_path}${API_ADRESS}&api_key=${APIKey}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.results.length <= 0) {
          fetch(`${api_path}3/${mediaType}/popular?page=1&api_key=${APIKey}`)
            .then((response) => response.json())
            .then((data) => {
              const dados = data.results.slice(0, 10);
              const filtered_data = dados.filter(
                (item) => item.backdrop_path !== null
              );
              setMovies(filtered_data);
            });
        } else {
          const dados = data.results.slice(0, 10);
          const filtered_data = dados.filter(
            (item) => item.backdrop_path !== null
          );
          setMovies(filtered_data);
        }
      });

    const NextBtn = document.getElementById(NextButton);
    const PrevBtn = document.getElementById(PrevButton);

    PrevBtn.addEventListener("click", function () {
      const slideList = document.getElementById(SlideList);
      const slideItem = document.getElementById(SlideItem);

      if (slideList && slideItem) {
        const scrollValue = slideItem.offsetWidth * 2;
        slideList.scrollLeft -= scrollValue;
      }
    });

    NextBtn.addEventListener("click", function () {
      const slideList = document.getElementById(SlideList);
      const slideItem = document.getElementById(SlideItem);

      if (slideList && slideItem) {
        const scrollValue = slideItem.offsetWidth * 2;
        slideList.scrollLeft += scrollValue;
      }
    });
  }, [id, language]);

  return (
    <section className="SliderContainer">
      <div className="SectionTitle">
        <h2>{SectionTitle}</h2>
        <span className="SeeAll">
          <h3>See all</h3>
          <img src={seeAllBtn} className="SeeAllSvg" />
        </span>
      </div>
      <div className="SliderContent">
        <img src={prevBtn} id={PrevButton} className="Backdrop-PrevBtn" />
        <img src={nextBtn} id={NextButton} className="Backdrop-NextBtn" />
        <div className="Slider-Inner">
          <div className="Slide-List" id={SlideList}>
            {movies.map((movie) => {
              const mediaType = movie.first_air_date ? "tv" : "movie";
              const genre_ids_to_map = movie.genre_ids.slice(0, 4);
              const genres = genre_ids_to_map.map((genre) =>
                genreConverter(genre, language, mediaType)
              );
              return (
                <Link
                  to={`/suprime-video/${mediaType}/${movie.id}`}
                  className="Slide-Item"
                  key={movie.id}
                  id={SlideItem}
                >
                  <div className="Card-inner">
                    <div className="Card-container">
                      <div className="bg-filter"></div>
                      <img
                        className="skeleton backdrop"
                        src={`${image_path}${movie.backdrop_path}`}
                        alt={mediaType === "tv" ? movie.name : movie.title}
                      />
                      <span className="ItemTitle">
                        <h2>{mediaType === "tv" ? movie.name : movie.title}</h2>
                      </span>
                      <img src={playBtn} className="Card-Btn" />
                    </div>
                    <div className="Info-Container">
                      <div className="VoteRank">
                        <h3>
                          {mediaType === "tv"
                            ? `${dateConverter(movie.first_air_date)} • `
                            : `${dateConverter(movie.release_date)} • `}
                        </h3>
                        <span className="voteAvarage">
                          <h3>{movie.vote_average.toFixed(1)}</h3>
                        </span>
                      </div>
                      <p>{`${genres.join(", ")} `}</p>
                    </div>
                    <img src={downloadBtn} className="downloadCard" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
