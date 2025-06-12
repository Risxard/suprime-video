import React, { useRef, useEffect, useState } from "react";
import { genreConverter } from "../../../functions/Converter";
import { ChevronRight, ChevronLeft } from "lucide-react";
import "./BackdropSlider.css";
import Backdropitem from "./BackdropItem/BackdropItem";
import { getPerGenres } from "../../../Services/callFunctions/getPerGenres";
import { guestApiKey } from "../../../Services/guestApi";

const BackdropSlider = (props) => {
  const [data, setData] = useState([]);
  const [medias, setMedias] = useState([]);

  const sliderRef = useRef(null);
  const {
    receivingMode,
    language,
    sectionTitle,
    dataReceived,
    selectedGenre,
    mediaId,
    recomendations,
    trending,
    mediaType,
  } = props;

  const dataFiltered = dataReceived ? dataReceived : [];

  const api_path = "https://api.themoviedb.org/";
  useEffect(() => {
    if (recomendations && mediaType && language && guestApiKey && mediaId) {


      const fetchRecommendations = async () => {
        try {
          const response = await fetch(
            `${api_path}3/${mediaType}/${mediaId}/recommendations?language=${language}&page=1&api_key=${guestApiKey}`
          );
          const data = await response.json();

          setMedias(data.results);
        } catch (error) {
          console.error("Error fetching recommendations:", error);
        }
      };

      fetchRecommendations();
    }
  }, [recomendations]);

  useEffect(() => {
    if (trending && mediaType && language && guestApiKey) {

      const fetchTrending = async () => {
        try {
          const response = await fetch(
            `${api_path}3/trending/all/day?language=${language}&page=1&api_key=${guestApiKey}`
          );
          const data = await response.json();

          setMedias(data.results);
        } catch (error) {
          console.error("Error fetching recommendations:", error);
        }
      };

      fetchTrending();
    }
  }, [trending]);

  const sliderContentRef = useRef(null);
  const prevSliderBtnRef = useRef(null);
  const nextSliderBtnRef = useRef(null);

  async function getMedias(props) {
    const mediasArray = await getPerGenres(props);
    setMedias(mediasArray.slice(0, 20));
  }

  useEffect(() => {
    if (receivingMode === false && !recomendations) {
      getMedias(props);
    }
  }, [props]);

  useEffect(() => {
    if (dataFiltered.length > 0) {
      setMedias(dataFiltered);
    }
  }, [dataFiltered]);

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
        <span className="Backdrop-PrevBtn off-btn" ref={prevSliderBtnRef} onClick={() => prevSlider()}>
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


export default BackdropSlider;