import React, { useRef, useEffect, useState } from "react";
import { genreConverter } from "../../../functions/Converter";
import { ChevronRight, ChevronLeft } from "lucide-react";
import "./BackdropSlider.css";
import Backdropitem from "./BackdropItem/BackdropItem";
import { getPerGenres } from "../../../Services/callFunctions/getPerGenres";

export default function BackdropSlider(props) {
  const sliderRef = useRef(null);
  const {
    receivingMode,
    language,
    sectionTitle,
    suprimeTitle,
    dataReceived,
    selectedGenre,
  } = props;

  const dataFiltered = dataReceived ? dataReceived : [];

  const [medias, setMedias] = useState(dataFiltered);

  const sliderContentRef = useRef(null);

  async function getMedias(props) {
    const mediasArray = await getPerGenres(props);
    setMedias(mediasArray.slice(0, 20));
  }

  useEffect(() => {
    if (receivingMode === false) {
      getMedias(props);
    }
  }, [props]);

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
      if (slider) {
        const isAtEnd =
          slider.scrollLeft + slider.clientWidth >= slider.scrollWidth;
        if (isAtEnd) {
          console.log("Fim do slider");
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
        <h2>
          {suprimeTitle ? <strong>Suprime</strong> : ""} {sectionTitle}
        </h2>
      </section>

      <div
        ref={sliderContentRef}
        className={`SliderContent`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <span className="Backdrop-PrevBtn" onClick={() => prevSlider()}>
          <ChevronLeft color="white" />
        </span>
        <span
          className="Backdrop-NextBtn"
          onClick={() => {
            nextSlider();
          }}
        >
          <ChevronRight color="white" />
        </span>

        <ul className="Slide-List" ref={sliderRef}>
          {medias.map((mediaItem) => {
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
}
