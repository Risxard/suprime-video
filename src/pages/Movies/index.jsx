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

const Movie = (SectionData) => {
  const [genresArray, setGenresArray] = useState([]);
  const logged = localStorage.getItem("statusLog");
  const language = useSelector((state) => state.lang.language);
  const pageType = "movie";
  const mediaType = "movie";

  const APIKey = guestApiKey;

  const api_path = "https://api.themoviedb.org/";

  const filterMode = "genre";
  const filterScope = "movie";


  return (
    <div className="Movies">
      {/* <Header pageType={pageType}/> */}

      <main>
        {/* <Top10Slider></Top10Slider> */}

        <section className="home-main-section">
          {/* <PosterSlider
            suprimeTitle={true}
            sectionTitle={"The week's most popular"}
            idParam={58}
            language={language}
            filterMode={"trending"}
            filterScope={"all"}
            timeWindow={"week"}
          ></PosterSlider> */}

          {/* <SlideDistributor language={language} mediaType={mediaType}/> */}
        </section>
      </main>

      <span />
    </div>
  );
};

export default Movie;
