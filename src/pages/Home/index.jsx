import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header.jsx";
import "./styles.css";
import i18n from "../../i18n.js";
import { useTranslation } from "react-i18next";
import { tmdbService } from "../../services/tmdb/tmdbServices.js";
import ChannelSection from "../../components/ChannelSection/index.jsx";

const Home = () => {
  const [medias, setMedias] = useState([]);
  const [mediasRecommendations, setMediasRecommendations] = useState([]);
  const language = i18n.language;
  const pageType = "all";
  const mediaType = "movie";
  const timeWindow = "day";
  const { t } = useTranslation();
  const componentsLang = t("sectionTitles");
  const { originalsAndExclusives, top10MoviesTMDB } = componentsLang;

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const data = await tmdbService.fetchTrending({
          timeWindow: "week",
          pageType: "movie",
          language,
          page: 3,
        });

        const items = Array.isArray(data) ? data : data.results || [];
        setMedias(items.slice(0, 20));
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

        const items = Array.isArray(data) ? data : data.results || [];
        setMediasRecommendations(items.slice(0, 10));
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
          <ChannelSection />
          {/* <BackdropSlider
            sectionTitle={componentsLang.recommendedMovies2}
            medias={mediasRecommendations}
          /> */}

          {/* <PosterSlider
            sectionTitle={originalsAndExclusives}
            medias={medias}
            language={language}
          /> */}

          {/* <SlideDistributor
            language={language}
            mediaType={mediaType}
            defaultSlider={PosterSlider}
            sliderMap={movieSliderMap}
          /> */}
        </section>
      </main>

      <div className="app-background" />
    </div>
  );
};

export default Home;
