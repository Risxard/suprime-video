import React, { useEffect, useState } from "react";
import Header from "../../Components/Header/Header.jsx";
import "./styles.css";
import SlideDistributor from "../../components/SlideDistributor/Index.jsx";
import i18n from "../../i18n.js";
import { useTranslation } from "react-i18next";
import BackdropSlider from "../../components/Sliders/BackdropSlider/BackdropSlider.jsx";
import PosterSlider from "../../components/Sliders/PosterSlider/PosterSlider.jsx";
import { tmdbService } from "../../services/tmdb/tmdbServices.js";
import { movieSliderMap } from "../../utils/sliderMaps.js";

const Home = () => {
  const [medias, setMedias] = useState([]);
  const [mediasRecommendations, setMediasRecommendations] = useState([]);
  const language = i18n.language;
  const pageType = "all";
  const mediaType = "movie";
  const timeWindow = "day";
  const { t } = useTranslation();
  const componentsLang = t("sectionTitles");
  const { originalsAndExclusives } = componentsLang;

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
    <div className="Home">
      <Header pageType={pageType} timeWindow={timeWindow} page={1} />

      <main>
        <section className="home-main-section">
          <BackdropSlider
            sectionTitle={componentsLang.recommendedMovies2}
            medias={mediasRecommendations}
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
    </div>
  );
};

export default Home;
