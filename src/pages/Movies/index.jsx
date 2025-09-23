import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import Header from "../../Components/Header/Header.jsx";
import "./styles.css";
import SlideDistributor from "../../components/SlideDistributor/Index.jsx";
import { useTranslation } from "react-i18next";
import Top10Slider from "../../components/Sliders/Top10Slider/Top10Slider.jsx";
import PosterSlider from "../../components/Sliders/PosterSlider/PosterSlider.jsx";
import i18n from "../../i18n.js";
import { tmdbService } from "../../services/tmdb/tmdbServices.js";
import { movieSliderMap } from "../../utils/sliderMaps.js";
import BackdropSlider from "../../Components/Sliders/BackdropSlider/BackdropSlider.jsx";

const Movie = () => {
  const [medias, setMedias] = useState([]);
  const [mediasRecommendations, setMediasRecommendations] = useState([]);
  const language = i18n.language;
  const pageType = "movie";
  const mediaType = "movie";
  const timeWindow = "day";

  const { t } = useTranslation();
  const sectionTitles = t("sectionTitles");
  const { originalsAndExclusives, top10MoviesTMDB } = sectionTitles;

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const data = await tmdbService.fetchTrending({
          timeWindow: "week",
          pageType: "movie",
          language,
          page: 3,
        });
        setMedias(Array.isArray(data) ? data : data.results || []);
      } catch (err) {
        console.error("Erro ao buscar filmes:", err);
      }
    };

    fetchTrending();
  }, [timeWindow, pageType, language]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const data = await tmdbService.fetchRecommendations({
          mediaType: "movie",
          mediaId: 1035259,
          language,
          page: 1,
        });
        setMediasRecommendations(
          Array.isArray(data) ? data : data.results || []
        );
      } catch (err) {
        console.error("Erro ao buscar filmes:", err);
      }
    };

    fetchRecommendations();
  }, []);

  return (
    <div className="Movies">
      <Header pageType={pageType} timeWindow={timeWindow} page={1} />

      <main>
        <section className="home-main-section">
          <BackdropSlider
            sectionTitle={sectionTitles.recommendedMovies}
            medias={mediasRecommendations}
          />

          <Top10Slider
            language={language}
            mediaType={mediaType}
            sectionTitle={top10MoviesTMDB}
          />

          <PosterSlider
            sectionTitle={originalsAndExclusives}
            medias={medias}
            language={language}
          />

          <SlideDistributor
            language={language}
            mediaType={mediaType}
            defaultSlider={PosterSlider}
            sliderMap={movieSliderMap}
          />
        </section>
      </main>

      <span />
    </div>
  );
};

export default Movie;
