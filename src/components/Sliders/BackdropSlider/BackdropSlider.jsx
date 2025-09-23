import React, { useRef, useEffect, useState } from "react";
import { genreConverter } from "../../../functions/Converter";
import { ChevronRight, ChevronLeft } from "lucide-react";
import "./BackdropSlider.css";
import Backdropitem from "./BackdropItem/BackdropItem";
import i18n from "../../../i18n";

const BackdropSlider = ({medias, sectionTitle}) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (medias) {
      setMovies(medias);
    }
  }, [medias]);



  const sliderRef = useRef(null);
  const language = i18n.language;

  const sliderContentRef = useRef(null);
  const prevSliderBtnRef = useRef(null);
  const nextSliderBtnRef = useRef(null);

  const handleMouseEnter = () => {
    if (sliderContentRef.current) {
      sliderContentRef.current.classList.add("hovered-class");
    }
  };

  const handleMouseLeave = () => {
    if (sliderContentRef.current) {
      sliderContentRef.current.classList.remove("hovered-class");
    }
  };

  function prevSlider() {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft -= window.innerWidth;
    }
  }

  function nextSlider() {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft += window.innerWidth;
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const slider = sliderRef.current;
      const nextBtn = nextSliderBtnRef.current;
      const prevBtn = prevSliderBtnRef.current;

      if (slider) {
        const isAtEnd =
          slider.scrollLeft + slider.clientWidth >= slider.scrollWidth;
        const isAtStart = slider.scrollLeft === 0;

        if (isAtStart) {
          prevBtn.classList.add("off-btn");
        } else {
          prevBtn.classList.remove("off-btn");
        }

        if (isAtEnd) {
          nextBtn.classList.add("off-btn");
        } else {
          nextBtn.classList.remove("off-btn");
        }
      }
    };

    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (slider) {
        slider.removeEventListener("scroll", handleScroll);
      }
    };
  }, [sliderRef]);

  return (
    <section className="SliderContainer">
      <section className="SectionTitle">
        <h2>{sectionTitle}</h2>
      </section>

      <div
        ref={sliderContentRef}
        className={`SliderContent`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <span
          className="Backdrop-PrevBtn off-btn"
          ref={prevSliderBtnRef}
          onClick={() => prevSlider()}
        >
          <ChevronLeft color="white" />
        </span>
        <span
          className="Backdrop-NextBtn"
          ref={nextSliderBtnRef}
          onClick={() => {
            nextSlider();
          }}
        >
          <ChevronRight color="white" />
        </span>

        <ul className="Slide-List" ref={sliderRef}>
          {movies.map((mediaItem) => {
            const mediaType = mediaItem.first_air_date ? "tv" : "movie";
            const genre_ids_to_map = mediaItem.genre_ids.slice(0, 4);
            const genres = genre_ids_to_map.map((genre) =>
              genreConverter(genre, language, mediaType)
            );
            return (
              <Backdropitem
                movie={mediaItem}
                key={mediaItem.id}
                mediaType={mediaType}
                language={language}
              />
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default BackdropSlider;
