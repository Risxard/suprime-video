import React, { useEffect, useRef, useState } from "react";
import "./styles.css";

const LazyCarousel = ({
  title,
  type = "simple-backdrop",
  fetchFn,
  fetchParams = {},
  top10mode,
  card_size,
  component: CarouselComponent,
  skeleton: SkeletonComponent,
  limit,
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
    if (!visible || hasLoadedOnce || !fetchFn) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetchFn(fetchParams);
        if (!response) return;

        if (type === "hero-section") {
          setMediaDetails(response);
          setHasLoadedOnce(true);
          setLoading(false);
          return;
        }

        let items = [];
        if (Array.isArray(response)) {
          items = response;
        } else if (Array.isArray(response?.results)) {
          items = response.results;
        } else if (response && typeof response === "object") {
          items = [response];
        }

        const computedLimit =
          typeof limit === "number"
            ? limit
            : type === "hero-carousel"
            ? 15
            : 20;

        setMovies(items.slice(0, computedLimit));
        setHasLoadedOnce(true);
      } catch (err) {
        console.error("Erro ao buscar dados:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [visible, hasLoadedOnce, fetchFn, fetchParams, type, limit]);

  const renderContent = () => {
    if (!fetchFn && CarouselComponent) {
      return (
        <>
          {title && (
            <div className="section-title">
              <h4>{title}</h4>
            </div>
          )}
          <CarouselComponent />
        </>
      );
    }

    if (loading && !hasLoadedOnce) {
      return SkeletonComponent ? (
        <SkeletonComponent card_size={card_size} />
      ) : null;
    }

    if (type === "hero-section") {
      if (!mediaDetails) return null;
      return (
        <CarouselComponent
          movies={mediaDetails}
          mediaType={fetchParams.mediaType}
          language={fetchParams.language}
        />
      );
    }

    if (type === "hero-carousel") {
      if (!movies.length) return null;
      return <CarouselComponent mediasData={movies} />;
    }

    if (CarouselComponent) {
      return (
        <>
          {title && (
            <div className="section-title">
              <h4>{title}</h4>
            </div>
          )}
          <CarouselComponent
            movies={top10mode ? movies.slice(0, 10) : movies}
            top10mode={top10mode}
            card_size={card_size}
            language={fetchParams.language}
          />
        </>
      );
    }

    return null;
  };

  return (
    <div
      ref={sectionRef}
      className={`lazy-carousel-wrapper ${visible ? "visible" : ""}`}
    >
      {renderContent()}
    </div>
  );
};

export default React.memo(LazyCarousel);
