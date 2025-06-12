import React, { useEffect, useRef, useState } from "react";

import "./PosterSlider.css";

import { getPerGenres } from "../../../Services/callFunctions/getPerGenres.js";
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
import { use } from "react";
import { useSelector } from "react-redux";

  const PosterSlider = (SectionData) => {
  const [medias, setMedias] = useState([]);
  const { sectionTitle } = SectionData;

  const language = SectionData.language;

  const sliderRef = useRef(null);
  const posterRef = useRef(null);
  const nextSliderBtnRef = useRef(null);
  const prevSliderBtnRef = useRef(null);

  async function getMedias(SectionData) {
    const mediasArray = await getPerGenres(SectionData);

    setMedias(mediasArray.slice(0, 20));
  }

  useEffect(() => {
    getMedias(SectionData);
  }, []);



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
          {medias
            ? medias.map((movie, index) => {
                const mediaLink = movie.first_air_date ? "tv" : "movie";
                return (
                  <PosterSliderItem
                    key={movie.id}
                    id={movie.id}
                    media={movie}
                    language={language}
                    mediaType={mediaLink}
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
}

export default PosterSlider;