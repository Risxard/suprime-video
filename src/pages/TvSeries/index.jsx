import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import Header from "../../Components/Header/Header.jsx";
import "./styles.css";
import SlideDistributor from "../../components/SlideDistributor/Index.jsx";
import { useTranslation } from "react-i18next";


import { tvSliderMap } from "../../utils/sliderMaps.js";
import { tmdbService } from "../../services/tmdb/tmdbServices.js";


const TvSeries = (SectionData) => {
  const [medias, setMedias] = useState([]);
  const [mediasRecommendations, setMediasRecommendations] = useState([]);

  const language = useSelector((state) => state.lang.language);
  const pageType = "tv";
  const mediaType = "tv";
  const timeWindow = "day";

  const api_path = "https://api.themoviedb.org/";

  const filterMode = "genre";
  const filterScope = "tv";

  const { t } = useTranslation();
  const sectionTitles = t("sectionTitles");
  const { originalsAndExclusives, top10TvShowsTMDB } = sectionTitles;

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const data = await tmdbService.fetchTrending({
          timeWindow: "week",
          pageType: pageType,
          language,
          page: 3,
        });
        setMedias(Array.isArray(data) ? data : data.results || []);
      } catch (err) {
        console.error("Erro ao buscar trendings:", err);
      }
    };

    fetchTrending();
  }, [timeWindow, pageType, language]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const data = await tmdbService.fetchRecommendations({
          mediaType: mediaType,
          mediaId: 1396,
          language,
          page: 1,
        });
        setMediasRecommendations(
          Array.isArray(data) ? data : data.results || []
        );
      } catch (err) {
        console.error("Erro ao buscar Recommendations:", err);
      }
    };

    fetchRecommendations();
  }, []);

  return (
    <div className="TvSeries">
      <Header pageType={pageType} timeWindow={timeWindow} page={1} />

      <main>
        {/* <Top10Slider></Top10Slider> */}

        <section className="home-main-section">


          <SlideDistributor
            language={language}
            mediaType={mediaType}
            defaultSlider={PosterSlider}
            sliderMap={tvSliderMap}
          />
        </section>
      </main>

      <span />
    </div>
  );
};

export default TvSeries;
