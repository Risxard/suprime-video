import React, { useEffect, useRef, useState } from "react";
import "./Top10Slider.css";
import { genreConverter } from "../../../functions/Converter.js";
import useTop10 from "../../../hooks/Sliders/useTop10/useTop10.jsx";
import Top10SliderItem from "./Top10SliderItem/Top10SliderItem.jsx";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useNowPlaying from "../../../hooks/Sliders/nowPlaying/useNowPlaying.jsx";

const Top10Slider = (props) => {
  const [medias, setMedias] = useState([]);

  const sliderRef = useRef(null);
  const { language, sectionTitle, mediaType } = props;

  const timeWindow = "day";
  const page = 1;

  const region = language.includes("-") ? language.split("-")[1] : language;



  const top10 = useNowPlaying({
    pageType: mediaType,
    language,
    region,
    page,
  });

  useEffect(() => {
    if (top10.movies.length > 0) {
      setMedias(top10.movies);
    }
  }, [top10.movies]);

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
    const rootStyles = getComputedStyle(document.getElementById("root"));
    const gapRaw = rootStyles.getPropertyValue("--dv-card-gap-number").trim();
    const match = gapRaw.match(/calc\(([\d.]+)\s*-\s*([\d.]+)\)/);
    const gap = match ? Number(match[1]) - Number(match[2]) : Number(gapRaw);

    const li = sliderRef.current?.firstElementChild;
    const liWidth = li ? li.getBoundingClientRect().width : 0;

    if (sliderRef.current) {
      sliderRef.current.scrollLeft -= gap * liWidth;
    }
  }

  function nextSlider() {
    const rootStyles = getComputedStyle(document.getElementById("root"));
    const gapRaw = rootStyles.getPropertyValue("--dv-card-gap-number").trim();
    const match = gapRaw.match(/calc\(([\d.]+)\s*-\s*([\d.]+)\)/);
    const gap = match ? Number(match[1]) - Number(match[2]) : Number(gapRaw);

    const li = sliderRef.current?.firstElementChild;
    const liWidth = li ? li.getBoundingClientRect().width : 0;

    if (sliderRef.current) {
      sliderRef.current.scrollLeft += gap * liWidth;
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
    <section className="SliderContainer Top10Slider">
      <section className="SectionTitle">
        <h2>
          {sectionTitle}
          <svg
            className="fbl-icon _30dE3d _1a_Ljt"
            viewBox="0 0 24 24"
            height="24"
            width="24"
            role="img"
            aria-hidden="true"
          >
            <title>Trending</title>
            <svg
              width="24"
              height="24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.120 2.039 C 8.641 2.287,6.414 3.362,4.761 5.107 C 1.806 8.228,1.158 12.819,3.137 16.623 C 3.620 17.552,4.164 18.288,4.938 19.061 C 5.930 20.051,7.038 20.789,8.272 21.278 C 11.634 22.610,15.313 22.080,18.200 19.845 C 18.637 19.507,19.507 18.637,19.845 18.200 C 21.256 16.378,22.000 14.236,22.000 12.000 C 22.000 7.432,18.842 3.387,14.430 2.303 C 13.446 2.062,12.028 1.948,11.120 2.039 M13.218 4.099 C 16.677 4.634,19.365 7.335,19.907 10.820 C 20.001 11.424,20.001 12.586,19.908 13.186 C 19.500 15.808,17.827 18.074,15.469 19.200 C 12.651 20.546,9.381 20.165,6.956 18.209 C 6.318 17.694,5.515 16.768,5.150 16.126 L 5.040 15.933 5.986 15.145 L 6.933 14.356 7.936 15.352 C 9.009 16.417,9.121 16.499,9.500 16.499 C 9.917 16.499,9.865 16.544,12.530 13.886 L 15.000 11.421 15.000 12.281 C 15.000 12.753,15.019 13.207,15.042 13.289 C 15.103 13.509,15.315 13.762,15.531 13.874 C 15.932 14.080,16.390 14.012,16.700 13.702 C 17.003 13.399,17.000 13.429,17.000 11.000 C 17.000 8.573,17.003 8.601,16.701 8.299 C 16.399 7.997,16.428 8.000,13.998 8.000 C 11.670 8.000,11.664 8.000,11.374 8.222 C 11.301 8.277,11.192 8.408,11.131 8.511 C 11.036 8.672,11.020 8.744,11.020 9.000 C 11.020 9.256,11.036 9.328,11.131 9.489 C 11.192 9.592,11.301 9.723,11.374 9.778 C 11.633 9.975,11.781 10.000,12.715 10.000 L 13.580 10.000 11.541 12.039 L 9.502 14.078 8.521 13.105 C 7.668 12.259,7.514 12.123,7.343 12.066 C 7.234 12.030,7.080 12.000,7.000 12.000 C 6.673 12.000,6.526 12.095,5.384 13.046 C 4.775 13.554,4.267 13.960,4.256 13.949 C 4.245 13.938,4.201 13.760,4.160 13.554 C 3.646 11.005,4.426 8.346,6.240 6.465 C 7.605 5.049,9.374 4.206,11.360 4.025 C 11.705 3.993,12.823 4.038,13.218 4.099 "
                fill="currentColor"
                stroke="none"
                fillRule="evenodd"
              ></path>
            </svg>
          </svg>
        </h2>
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
          {medias.map((mediaItem, index) => {
            const mediaType = mediaItem.first_air_date ? "tv" : "movie";
            const genre_ids_to_map = mediaItem.genre_ids.slice(0, 4);
            const genres = genre_ids_to_map.map((genre) =>
              genreConverter(genre, language, mediaType)
            );
            return (
              <Top10SliderItem
                movie={mediaItem}
                key={mediaItem.id}
                index={index}
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

export default Top10Slider;
