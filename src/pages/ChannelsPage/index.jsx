import { useEffect, useState } from "react";
import GrandPosterCarousel from "../../components/Sliders/GrandPosterCarousel/GrandPosterCarousel";
import SectionBuilder from "../../components/utils/SectionBuilder/SectionBuilder";
import { tmdbService } from "../../services/tmdb/tmdbServices";
import i18n from "../../i18n";
import introDisneyImage from "./assets/introDisneyImage.webp";
import introDisneyDesktop from "./assets/introDisneyDesktop.webp";
import introDisneyMobile from "./assets/introDisneyMobile.webp";
import disneyVideo from "./assets/disneyVideo.mp4";
import "./styles.css";
import SimpleBackdropCarousel from "../../components/Sliders/SimpleBackdropCarousel";

const ChannelsPage = () => {
  const [medias, setMedias] = useState([]);
  const [mediasRecommendations, setMediasRecommendations] = useState([]);
  const [videoEnded, setVideoEnded] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [introOpacity, setIntroOpacity] = useState(1);
  const language = i18n.language;

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
  }, [language]);

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
        console.error("Erro ao buscar recomendações:", err);
      }
    };
    fetchRecommendations();
  }, []);

  const handleVideoPlay = () => {
    setIsVideoPlaying(true);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const fadeStart = 0;
      const fadeEnd = 400;
      const opacityRange = 1 - 0.2;
      const opacity = Math.max(
        0.2,
        1 - ((scrollY - fadeStart) / fadeEnd) * opacityRange
      );
      setIntroOpacity(opacity);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="channels-page">
      <section className="channel-intro" style={{ opacity: introOpacity }}>
        <div className="channel-intro-content">
          <span className="channel-intro-filter" />

          <video
            autoPlay
            muted
            playsInline
            src={disneyVideo}
            poster={introDisneyDesktop}
            onPlay={handleVideoPlay}
            onEnded={() => setVideoEnded(true)}
            className={`intro-video ${
              videoEnded ? "fade-out" : isVideoPlaying ? "fade-in" : "hidden"
            }`}
          />

          <div
            className={`channel-intro-content-image ${
              videoEnded ? "fade-in" : "hidden"
            }`}
          >
            <img src={introDisneyDesktop} alt="Disney Intro" />
            <img src={introDisneyMobile} alt="Disney Intro Mobile" />
          </div>
        </div>

        <div
          className={`channel-intro-image-container ${
            videoEnded ? "fade-in" : "hidden"
          }`}
        >
          <img src={introDisneyImage} alt="Disney Logo" />
        </div>
      </section>

      <div className="channels-page-content">
        <SectionBuilder
          children={
            <SimpleBackdropCarousel
              movies={medias}
              language={language}
              top10mode={false}
            />
          }
          sectionTitle={"Destaques"}
        />

        <SectionBuilder
          children={
            <SimpleBackdropCarousel
              movies={mediasRecommendations}
              language={language}
              top10mode={true}
            />
          }
          sectionTitle={"Top 10 filmes no Açaíwave+"}
        />
      </div>
    </div>
  );
};

export default ChannelsPage;
