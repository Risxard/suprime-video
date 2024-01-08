import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import useHero from "../../hooks/Sliders/useHero/useHero.jsx";
import useTop10 from "../../hooks/Sliders/useTop10/useTop10.jsx";

import Top10Slider from "../../Components/Sliders/Top10Slider/Top10Slider.jsx";

import { useIntersectionObserver } from "../../hooks/IntersectionObserver/useIntersationObserver.jsx";

import { guestApiKey } from "../../Services/guestApi.js";

import PosterSlider from "../../Components/Sliders/PosterSlider/PosterSlider.jsx";
import { setSectionTitle } from "../../functions/Converter.js";

import Header from "../../Components/Header/Header.jsx";

import "./TvSeries.css";

var Tv = (SectionData) => {
  const [genresArray, setGenresArray] = useState([]);
  const logged = localStorage.getItem("statusLog");
  const language = SectionData.language;
  const pageType = "tv";
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
        const genres = data.genres;

        setGenresArray(genres);
      });
  }, []);

  const selectedBackground =
    "https://image.tmdb.org/t/p/original//9zcbqSxdsRMZWHYtyCd1nXPr2xq.jpg";

  const filterMode = "genre";
  const filterScope = "tv";

  return logged === "true" ? (
    <div className="Home">
      <span className="feature-background">
        <img src={selectedBackground} alt="selected background" />
        <span className="feature-filter-background"></span>
      </span>

      <Header heroSlider={heroSlider} language={language} pageType={pageType} />

      <main>
        <Top10Slider
          language={language}
          pageType={pageType}
          medias={top10}
        ></Top10Slider>

        <section className="tv-main-section">
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

      {visibleSections.length > 0 && visibleSections[0] < genresArray.length ? (
        <span id="InfiniteCheck" />
      ) : (
        <span id="InfiniteCheck" style={{ visibility: "hidden" }} />
      )}
    </div>
  ) : null;
};

const mapStateToProps = (state) => {
  return {
    language: state.lang.dataLang,
  };
};

export default connect(mapStateToProps)(Tv);
