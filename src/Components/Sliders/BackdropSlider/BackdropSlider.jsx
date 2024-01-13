import React, { useRef, useEffect, useState } from "react";
import { genreConverter } from "../../../functions/Converter";
import { useParams } from "react-router-dom";
import usePerGenre from "../../../hooks/ApiCalls/usePerGenres/usePerGenres";
import { ChevronRight, ChevronLeft } from "lucide-react";
import "./BackdropSlider.css";
import Backdropitem from "./BackdropItem/BackdropItem";

export default function BackdropSlider(SectionData) {
  const [reloadSlider, setReloadSlider] = useState(1);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [filteredMedia, setFilteredMedia] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const sliderRef = useRef(null);
  const [podeExecutar, setPodeExecutar] = useState(true);
  let currentPage = 1;

  const { id } = useParams();

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
  const suprimeTitle = SectionData.suprimeTitle;
  const movieId = id;
  const mediaType = SectionData.mediaType;

  const mediasPage1 = usePerGenre({
    language,
    filterMode,
    filterScope,
    selectedGenre,
    pageNumber: 1,
    movieId,
    mediaType,
  });
  const mediasPage2 = usePerGenre({
    language,
    filterMode,
    filterScope,
    selectedGenre,
    pageNumber: 2,
  });
  const mediasPage3 = usePerGenre({
    language,
    filterMode,
    filterScope,
    selectedGenre,
    pageNumber: 3,
  });

  useEffect(() => {
    if (mediasPage1.medias.length > 0) {
      setFilteredMedia((prevFilteredMedia) => {
        const uniqueMedias = mediasPage1.medias.filter(
          (newMedia) =>
            !prevFilteredMedia.some(
              (existingMedia) => existingMedia.id === newMedia.id
            )
        );
        return [...prevFilteredMedia, ...uniqueMedias];
      });
    }
  }, [mediasPage1.medias]);

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
          switch (currentPage) {
            case 1:
              setFilteredMedia((prevFilteredMedia) => {
                const uniqueMedias = mediasPage2.medias.filter(
                  (newMedia) =>
                    !prevFilteredMedia.some(
                      (existingMedia) => existingMedia.id === newMedia.id
                    )
                );
                return [...prevFilteredMedia, ...uniqueMedias];
              });
              currentPage++;
              break;
            case 2:
              setFilteredMedia((prevFilteredMedia) => {
                const uniqueMedias = mediasPage3.medias.filter(
                  (newMedia) =>
                    !prevFilteredMedia.some(
                      (existingMedia) => existingMedia.id === newMedia.id
                    )
                );
                return [...prevFilteredMedia, ...uniqueMedias];
              });
              currentPage++;
              break;

            default:
              break;
          }
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
  }, [sliderRef, mediasPage2.medias, mediasPage3.medias]);

  return (
    <section className="SliderContainer">
      <section className="SectionTitle">
        <h2>
          {suprimeTitle ? <strong>Suprime</strong> : ""} {SectionTitle}
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
