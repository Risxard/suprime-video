import React from "react";
import { Link } from "react-router-dom";
import "./FeatureSlider.css";

import { genreConverter } from "../../../functions/Converter";

import { guestApiKey } from "../../../services/guestApi";

import FeatureItem from "./Components/FeatureItem.jsx";


import {ChevronLeft, ChevronRight } from 'lucide-react'

const FeatureSlider = (SectionData) => {
  const APIKey = guestApiKey;

  const medias = SectionData.medias.movies;
  const language = SectionData.language;

  const featureSlider = document.querySelector(".slider");

  function prevSlider() {
    if (featureSlider) {
      featureSlider.scrollLeft -= 1000;
    }
  }
  function nextSlider() {
    if (featureSlider) {
      featureSlider.scrollLeft += 1000;
    }
  }

  return (
    <div className="feature-container">
      <span id="FeaturePrevBtn" onClick={prevSlider}>
      <ChevronLeft color="#ffffff" />
      </span>
      <span id="FeatureNextBtn" onClick={nextSlider}>
      <ChevronRight color="#ffffff" />
      </span>

      <div className="slide-content">
        <div className="slider">
          {medias.map((movie) => {
            const genre_ids_to_map = movie.genre_ids.slice(0, 5);
            const genres = genre_ids_to_map.map((genre) =>
              genreConverter(genre, language, movie.media_type)
            );

            const vote_average = movie.vote_average;
            const vote = vote_average;

            const dateMovie = movie.release_date;
            const dateTv = movie.first_air_date;

            return (
              <FeatureItem key={movie.id} movie={movie} language={language} />
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default FeatureSlider;
