import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import { guestApiKey } from "../../Services/guestApi.js";
import Header from "../../Components/Header/Header.jsx";
import "./styles.css";
import SlideDistributor from "../../components/SlideDistributor/Index.jsx";
import BackdropSlider from "../../components/Sliders/BackdropSlider/BackdropSlider.jsx";
import { set } from "react-hook-form";
import { useTranslation } from "react-i18next";
import Top10Slider from "../../components/Sliders/Top10Slider/Top10Slider.jsx";
import PosterSlider from "../../Components/Sliders/PosterSlider/PosterSlider.jsx";

const Movie = (SectionData) => {
  const [genresArray, setGenresArray] = useState([]);
  const [medias, setMedias] = useState([]);
  const logged = localStorage.getItem("statusLog");
  const language = useSelector((state) => state.lang.language);
  const pageType = "movie";
  const mediaType = "movie";

  const APIKey = guestApiKey;

  const api_path = "https://api.themoviedb.org/";

  const filterMode = "genre";
  const filterScope = "movie";

  const { t } = useTranslation();
  const sectionTitles = t("sectionTitles");
  const { originalsAndExclusives, top10MoviesTMDB} = sectionTitles;

  return (
    <div className="Movies">
      <Header pageType={pageType} />

      <main>
        <section className="home-main-section">
          <BackdropSlider
            sectionTitle={sectionTitles.recommendedMovies}
            language={language}
            recomendations={true}
            mediaId={346698}
            mediaType={mediaType}
          ></BackdropSlider>
          <Top10Slider
            language={language}
            mediaType={mediaType}
            sectionTitle={top10MoviesTMDB}
          />
          <PosterSlider
            sectionTitle={originalsAndExclusives}
            idParam={58}
            language={language}
            filterMode={"trending"}
            filterScope={"movie"}
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

export default Movie;
