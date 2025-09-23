import React, { useEffect, useRef, useState } from "react";

import "./PosterSlider.css";

import PosterSliderItem from "./Components/PosterSliderItem.jsx";
import { ChevronLeft, ChevronRight } from "lucide-react";

import {
  prevSlider,
  nextSlider,
} from "../../../functions/carousels/carouselScripts.js";
import {
  posterHandleCallback,
  posterHandleEnterSectionHover,
  posterHandleLeaveSectionHover,
} from "./scripts/posterScripts.js";

const PosterSlider = ({ medias, sectionTitle, language}) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (medias) {
      setMovies(medias);
    }
  }, [medias]);

  const sliderRef = useRef(null);
  const posterRef = useRef(null);
  const nextSliderBtnRef = useRef(null);
  const prevSliderBtnRef = useRef(null);

  return (
    <section
      className="poster-slider"
      onMouseEnter={() => posterHandleEnterSectionHover(posterRef)}
      onMouseLeave={() => posterHandleLeaveSectionHover(posterRef, sliderRef)}
    >
      <div className="SectionTitle">
        <h2>{sectionTitle}</h2>
      </div>

      <div className="poster-content" ref={posterRef}>
        <span
          className="posterPrevBtn"
          ref={prevSliderBtnRef}
          onMouseEnter={() =>
            posterHandleLeaveSectionHover(posterRef, sliderRef)
          }
        >
          <span
            id="PrevButton"
            alt="Prev Slider Btn"
            onClick={() => prevSlider(sliderRef)}
          >
            <ChevronLeft />
          </span>
        </span>

        <ul
          className="poster-slide-list"
          align={"default-start"}
          ref={sliderRef}
        >
          {movies
            ? movies.map((movie, index) => {
                const mediaLink = movie.first_air_date ? "tv" : "movie";
                return (
                  <PosterSliderItem
                    key={movie.id}
                    id={movie.id}
                    media={movie}
                    language={language}
                    mediaType={mediaLink}
                    original_language={movie.original_language}
                    index={index}
                    handleCB={() =>
                      posterHandleCallback(index, sliderRef, posterRef)
                    }
                  />
                );
              })
            : null}
        </ul>

        <span
          className="posterNextBtn"
          ref={nextSliderBtnRef}
          onMouseEnter={() =>
            posterHandleLeaveSectionHover(posterRef, sliderRef)
          }
        >
          <span
            id="NextButton"
            alt="Next Slider Btn"
            onClick={() => nextSlider(sliderRef)}
          >
            <ChevronRight />
          </span>
        </span>
      </div>
    </section>
  );
};

export default PosterSlider
