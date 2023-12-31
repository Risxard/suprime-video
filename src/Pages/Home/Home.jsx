import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import useHero from "../../hooks/Sliders/useHero/useHero.jsx";
import useTop10 from "../../hooks/Sliders/useTop10/useTop10.jsx";

import Top10Slider from "../../components/Sliders/Top10Slider/Top10Slider.jsx";

import SpinnerLoading from "/src/assets/svgs/SpinnerLoading.jsx";

import { useIntersectionObserver } from "../../hooks/IntersectionObserver/useIntersationObserver.jsx";

import { guestApiKey } from "../../services/guestApi.js";

import PosterSlider from "../../components/Sliders/PosterSlider/PosterSlider.jsx";
import { setSectionTitle } from "../../functions/Converter.js";

import Header from "../../components/Header/Header.jsx";

import "./Home.css";

const Home = (SectionData) => {
  const [genresArray, setGenresArray] = useState([]);
  const logged = localStorage.getItem("statusLog");
  const language = SectionData.language;
  const pageType = "all";
  const mediaType = "tv";

  const visibleSections = useIntersectionObserver();

  const APIKey = guestApiKey;

  const heroSlider = useHero({ language, pageType });
  const top10 = useTop10({ language, pageType });

  const api_path = "https://api.themoviedb.org/";

  useEffect(() => {
    fetch(
      `${api_path}3/genre/${mediaType}/list?language=${language}&api_key=${APIKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        const genres = data.genres.slice(0, 6);

        setGenresArray(genres);
      });
  }, []);



  const filterMode = "genre";
  const filterScope = "tv";

  return logged === "true" ? (
    <div className="Home">
      <Header heroSlider={heroSlider} language={language} pageType={pageType} />

      <main>
        <Top10Slider
          language={language}
          pageType={pageType}
          medias={top10}
        ></Top10Slider>

        <section className="home-main-section">
          <PosterSlider
            sectionTitle={setSectionTitle(28, "movie", language)}
            idParam={28}
            language={language}
            selectedGenre={28}
            filterMode={"genre"}
            filterScope={"movie"}
          ></PosterSlider>
          <PosterSlider
            sectionTitle={setSectionTitle(12, "movie", language)}
            idParam={12}
            language={language}
            selectedGenre={12}
            filterMode={"genre"}
            filterScope={"movie"}
          ></PosterSlider>
          <PosterSlider
            sectionTitle={setSectionTitle(16, "movie", language)}
            idParam={16}
            language={language}
            selectedGenre={16}
            filterMode={"genre"}
            filterScope={"movie"}
          ></PosterSlider>

          {genresArray.slice(0, visibleSections).map((genre) => (
            <PosterSlider
              key={genre.name}
              sectionTitle={setSectionTitle(genre.id, mediaType, language)}
              idParam={genre.id}
              language={language}
              selectedGenre={genre.id}
              filterMode={filterMode}
              filterScope={filterScope}
            ></PosterSlider>
          ))}
        </section>
      </main>

      <span />

      <svg
        id="InfiniteCheck"
        style={{
          visibility:
            visibleSections[0] < genresArray.length ? "visible" : "hidden",
        }}
        
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        width="200px"
        height="200px"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
      >
        <circle
          cx="50"
          cy="50"
          fill="none"
          stroke="#4f4e50"
          strokeWidth="10"
          r="35"
          strokeDasharray="164.93361431346415 56.97787143782138"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            repeatCount="indefinite"
            dur="0.5319148936170213s"
            values="0 50 50;360 50 50"
            keyTimes="0;1"
          />
        </circle>
      </svg>
    </div>
  ) : null;
};

const mapStateToProps = (state) => {
  return {
    language: state.lang.dataLang,
  };
};

export default connect(mapStateToProps)(Home);
