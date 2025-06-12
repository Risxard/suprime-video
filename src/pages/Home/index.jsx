import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";

import useHero from "../../hooks/Sliders/useHero/useHero.jsx";
import useTop10 from "../../hooks/Sliders/useTop10/useTop10.jsx";

import Top10Slider from "../../Components/Sliders/Top10Slider/Top10Slider.jsx";

import SpinnerLoading from "/src/assets/svgs/SpinnerLoading.jsx";

import { useIntersectionObserver } from "../../hooks/IntersectionObserver/useIntersationObserver.jsx";

import { guestApiKey } from "../../Services/guestApi.js";

import PosterSlider from "../../Components/Sliders/PosterSlider/PosterSlider.jsx";
import { setSectionTitle } from "../../functions/Converter.js";

import Header from "../../Components/Header/Header.jsx";

import { lazy } from "react";

import "./styles.css";
import SlideDistributor from "../../components/SlideDistributor/Index.jsx";
import i18n from "../../i18n.js";
import { useTranslation } from "react-i18next";
import BackdropSlider from "../../components/Sliders/BackdropSlider/BackdropSlider.jsx";

const Home = (SectionData) => {
  const [genresArray, setGenresArray] = useState([]);
  const logged = localStorage.getItem("statusLog");
  const language = i18n.language;
  const pageType = "all";
  const mediaType = "movie";

  const APIKey = guestApiKey;

  const api_path = "https://api.themoviedb.org/";

  const filterMode = "genre";
  const filterScope = "tv";
  const { t } = useTranslation();
  const componentsLang = t("sectionTitles");

  const { originalsAndExclusives } = componentsLang;

  return (
    <div className="Home">
      <Header pageType={pageType} />

      <main>
        <section className="home-main-section">
          <BackdropSlider
            sectionTitle={componentsLang.recommendedMovies2}
            language={language}
            recomendations={true}
            mediaId={346698}
            mediaType={mediaType}
          ></BackdropSlider>

          <PosterSlider
            sectionTitle={originalsAndExclusives}
            idParam={58}
            language={language}
            filterMode={"trending"}
            filterScope={"all"}
            timeWindow={"week"}
            pageNumber={3}
          ></PosterSlider>

          <SlideDistributor language={language} mediaType={mediaType} />
        </section>
      </main>

      <span />
    </div>
  );
};

export default Home;
