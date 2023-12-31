import React from "react";

import "./Top10Slider.css";
import { Link } from "react-router-dom";

import { genreConverter, setDate } from "../../../functions/Converter";

import VoteAvarage from "../../VoteAvarage/voteAvarage.jsx";
import prevBtn from '../../../assets/svgs/buttons/prevBtn.svg'
import nextBtn from '../../../assets/svgs/buttons/nextBtn.svg'
import playBtn from '../../../assets/svgs/buttons/playBtn.svg'

export default function Top10Slider(SectionData) {
  const language = SectionData.language;

  const medias = SectionData.medias.movies;

  const image_path = "https://image.tmdb.org/t/p/original/";

  const top10Slider = document.querySelector(".top10-slider");

  function prevSlider() {
    if (top10Slider) {
      top10Slider.scrollLeft -= 300;
    }
  }
  function nextSlider() {
    if (top10Slider) {
      top10Slider.scrollLeft += 300;
    }
  }

  return (
    <section className="Top10">
      <div className="Top10-Title">
        <h2>
          {language == "en-US"
            ? "Top 10 in US"
            : language == "pt-BR"
            ? "Top 10 no Brasil"
            : ""}
        </h2>
      </div>

      <div className="top10-inner">
        <img src={prevBtn} alt="" onClick={prevSlider} id="top10PrevBtn" />
        <img src={nextBtn} alt="" onClick={nextSlider} id="top10NextBtn" />

        <div className="top10-wrapper">
          <ul className="top10-slider">
            {medias.map((media, indice) => {
              const sumType = media.media_type === "tv" ? "Tv Serie" : "Movie";

              const genre_ids_to_map = media.genre_ids.slice(0, 2);
              const genres = genre_ids_to_map.map((genre) =>
                genreConverter(genre, language, media.media_type)
              );

              return (
                <li className="top10-item" key={media.id}>
                  <h3 className="bigH3">{indice + 1}</h3>
                  <span className="top10-img">
                    <Link to={`/suprime-video/${media.media_type}/${media.id}`}>
                      <img src={playBtn} alt="" className="top10PlayBtn" />
                      <img
                        src={`${image_path}${media.poster_path}`}
                        alt={media.id}
                      />
                    </Link>
                  </span>
                  <span className="top10-info-item">
                    <p className="Type">{sumType}</p>

                    <Link
                      to={`/suprime-video/${media.media_type}/${media.id}`}
                      className="TopTittle"
                    >
                      <h4>
                        {media.media_type === "tv" ? media.name : media.title}
                      </h4>
                    </Link>

                    <h5>
                      {`${genres.join("/")} `}
                    </h5>

                    <div className="VoteRank">
                      <h3>{`${
                        media.media_type === "movie"
                          ? setDate(media.release_date)
                          : setDate(media.first_air_date)
                      }`}</h3>
                      {"•"}
                      <VoteAvarage votes={media.vote_average} />
                    </div>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
