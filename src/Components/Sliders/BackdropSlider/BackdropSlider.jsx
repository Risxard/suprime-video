import React, { useRef, useEffect, useState } from "react";
import { genreConverter } from "../../../functions/Converter";
import { useParams } from "react-router-dom";
import usePerGenre from "../../../hooks/ApiCalls/usePerGenres/usePerGenres";
import { ChevronRight, ChevronLeft } from "lucide-react";
import "./BackdropSlider.css";
import Backdropitem from "./BackdropItem/BackdropItem";


export default function BackdropSlider(SectionData) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [filteredMedia, setFilteredMedia] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const sliderRef = useRef(null);
  const [podeExecutar, setPodeExecutar] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const language = SectionData.language;
  const SectionTitle = SectionData.sectionTitle;
  const filterMode = SectionData.filterMode;
  const filterScope = SectionData.filterScope;
  const selectedGenre = SectionData.selectedGenre;

  const mediasArray = usePerGenre({
    language,
    filterMode,
    filterScope,
    selectedGenre,
    pageNumber,
  });

  const updateNewMedias = () => {
    setPageNumber((prevPageNumber) => {
      const newPageNumber = prevPageNumber + 1;
      console.log(newPageNumber);
      return newPageNumber;
    });
  };

  useEffect(() => {
    if (mediasArray.medias.length > 0) {
      setFilteredMedia((prevFilteredMedia) => {
        const uniqueMedias = mediasArray.medias.filter(
          (newMedia) =>
            !prevFilteredMedia.some(
              (existingMedia) => existingMedia.id === newMedia.id
            )
        );
        return [...prevFilteredMedia, ...uniqueMedias];
      });
    }
  }, [mediasArray.medias]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  function prevSlider() {
    if (podeExecutar) {
      if (sliderRef.current) {
        sliderRef.current.scrollLeft -= windowWidth;
      }
      setPodeExecutar(false);

      setTimeout(() => {
        setPodeExecutar(true);
      }, 1000);
    }
  }

  function nextSlider() {
    if (podeExecutar) {
      if (sliderRef.current) {
        sliderRef.current.scrollLeft += windowWidth;
      }
      setPodeExecutar(false);
      setTimeout(() => {
        setPodeExecutar(true);
      }, 1000);
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const slider = sliderRef.current;
      if (slider) {
        const isAtEnd =
          slider.scrollLeft + slider.clientWidth >= slider.scrollWidth;
        if (isAtEnd) {
          updateNewMedias();
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
          <strong>Suprime</strong> {SectionTitle}
        </h2>
      </section>

      <div
        className={`SliderContent ${isHovered ? "hovered-class" : ""}`}
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
          {filteredMedia.map((mediaItem) => {
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
                SlideItem={mediaItem}
                language={language}
              />
            );
          })}
        </ul>
      </div>
    </section>
  );
}
