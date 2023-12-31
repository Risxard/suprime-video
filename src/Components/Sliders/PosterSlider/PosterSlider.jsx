import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import "./PosterSlider.css";

import usePerGenre from "../../../hooks/ApiCalls/usePerGenres/usePerGenres";
import prevBtn from "../../../assets/svgs/buttons/prevBtn.svg";
import nextBtn from "../../../assets/svgs/buttons/nextBtn.svg";
import seeAllBtn from "../../../assets/svgs/buttons/seeAllBtn.svg";

import { genreConverter, setDate } from "../../../functions/Converter";

export default function PosterSlider(SectionData) {
  const language = SectionData.language;

  const selectedGenre = SectionData.selectedGenre;

  const SectionTitle = SectionData.sectionTitle;

  const filterMode = SectionData.filterMode;
  const filterScope = SectionData.filterScope;

  const idParam = SectionData.idParam;

  const mediasArray = usePerGenre({
    language,
    filterMode,
    filterScope,
    selectedGenre,
  });

  const medias = mediasArray.medias;

  const image_path = "https://image.tmdb.org/t/p/original/";

  const NextButton = idParam + "-Poster-NextBtn";
  const PrevButton = idParam + "-Poster-PrevBtn";
  const SlideList = idParam + "-Poster-Slide-List";
  const SlideItem = idParam + "-Poster-Slide-Item";

  const Slider = document.getElementById(SlideList);

  function prevSlider() {
    if (Slider) {
      Slider.scrollLeft -= 300;
    }
  }
  function nextSlider() {
    if (Slider) {
      Slider.scrollLeft += 300;
    }
  }

  return (
    <section className="poster-slider">
      <div className="poster-section-title">
        <h2>{SectionTitle}</h2>

        <Link className="SeeAll">
          <h3>See all</h3>
          <img src={seeAllBtn} className="SeeAllSvg"></img>
        </Link>
      </div>

      <div className="poster-content">
        <img
          src={prevBtn}
          id={PrevButton}
          alt="Prev Slider Btn"
          className="posterPrevBtn"
          onClick={prevSlider}
        />
        <img
          src={nextBtn}
          id={NextButton}
          alt="Next Slider Btn"
          className="posterNextBtn"
          onClick={nextSlider}
        />

        <div className="poster-slide-inner">
          <div className="poster-slide-list" id={SlideList}>
            {medias.map((movie) => {
              const mediaLink = movie.first_air_date ? "tv" : "movie";

              const genre_ids_to_map = movie.genre_ids.slice(0, 2);
              const genres = genre_ids_to_map.map((genre) =>
                genreConverter(genre, language, mediaLink)
              );

              return (
                <Link
                  to={`/suprime-video/${mediaLink}/${movie.id}`}
                  className="poster-item"
                  key={movie.id}
                  id={SlideItem}
                >
                  <div className="poster-card-inner">
                    <div className="poster-card-container">

                      <img
                        className="skeleton"
                        src={`${image_path}${movie.poster_path}`}
                        alt={movie.title}
                      />

                      <span className="poster-item-title">
                        <h2>
                          {mediaLink === "movie" ? movie.title : movie.name}
                        </h2>
                      </span>

                      <span className="poster-card-btn"></span>
                    </div>
                    <div className="poster-info-container">
                      <div className="VoteRank">
                        <h3>{`${
                          mediaLink === "movie"
                            ? setDate(movie.release_date)
                            : setDate(movie.first_air_date)
                        } • `}</h3>{" "}
                        <span className="voteAvarage">
                          <h3>{movie.vote_average.toFixed(1)}</h3>
                        </span>
                      </div>

                      <p>{`${genres.join("/")} `}</p>
                    </div>
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
