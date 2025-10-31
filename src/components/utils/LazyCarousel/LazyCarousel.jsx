import React, { useEffect, useRef, useState } from "react";
import SimpleBackdropCarousel from "../../Sliders/SimpleBackdropCarousel";
import GrandPosterCarousel from "../../Sliders/GrandPosterCarousel/GrandPosterCarousel";
import SimpleBackdropSkeleton from "../../Sliders/SimpleBackdropCarousel/components/SimpleBackdropSkeleton";
import HeroSection from "../../HeroSection";
import "./styles.css";
import { image_path_500 } from "../../../utils/imagePaths";
import PosterCarouselSkeleton from "../../Sliders/GrandPosterCarousel/components/PosterCarouselSkeleton";
import HeroSectionSkeleton from "../../HeroSection/components/HeroSectionSkeleton";

const LazyCarousel = ({
  title,
  type = "simple-backdrop",
  fetchFn,
  fetchParams = {},
  top10mode,
  card_size,
}) => {
  const [visible, setVisible] = useState(false);
  const [movies, setMovies] = useState([]);
  const [mediaDetails, setMediaDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || hasLoadedOnce) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetchFn(fetchParams);

        if (type === "hero-section") {
          setMediaDetails(data);
        } else {
          const items = Array.isArray(data) ? data : data.results || [];
          const limited = items.slice(0, 20);

          await Promise.all(
            limited.map(
              (m) =>
                new Promise((resolve) => {
                  const img = new Image();
                  img.src = `${image_path_500}${
                    m.poster_path || m.backdrop_path
                  }`;
                  img.onload = resolve;
                  img.onerror = resolve;
                })
            )
          );

          setMovies(limited);
        }

        setHasLoadedOnce(true);
      } catch (err) {
        console.error("Erro ao buscar dados:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [visible, hasLoadedOnce, fetchFn, fetchParams, type]);

  const renderCarousel = () => {
    if (loading && !hasLoadedOnce) {
      if (type === "grand-poster") return <PosterCarouselSkeleton card_size={card_size} />
      if (type === "hero-section") return <HeroSectionSkeleton />
      if (type === "simple-backdrop") return <SimpleBackdropSkeleton />
    }

    switch (type) {
      case "hero-section":
        if (!mediaDetails) return null;
        return (
          <HeroSection
            mediaType={fetchParams.mediaType || "movie"}
            mediaDetails={mediaDetails}
            language={fetchParams.language}
          />
        );

      case "grand-poster":
        return (
          <GrandPosterCarousel
            movies={movies}
            top10mode={top10mode}
            card_size={card_size}
            language={fetchParams.language}
          />
        );

      case "simple-backdrop":
      default:
        return <SimpleBackdropCarousel movies={movies} />;
    }
  };

  return (
    <div ref={sectionRef}>
      {type !== "hero-section" && title && (
        <div className="section-title">
          <h4>{title}</h4>
        </div>
      )}

      {renderCarousel()}
    </div>
  );
};

export default React.memo(LazyCarousel);
