import React, { useEffect, useRef, useState } from "react";
import "../styles.css";

const LazyCarousel = ({
  index,
  isActive,
  onVisible,
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

  const isHero = type === "hero-section" || type === "hero-carousel";
  const isStatic = !fetchFn;

  useEffect(() => {
    if (isHero || isStatic) {
      setVisible(true);
      onVisible?.(index);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onVisible?.(index);
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.001 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [index, onVisible, isHero, isStatic]);

  useEffect(() => {
    if (isStatic) {
      setHasLoadedOnce(true);
      setLoading(false);
      return;
    }

    if ((!visible && !isActive && !isHero) || hasLoadedOnce || !fetchFn) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetchFn(fetchParams);
        if (!response) return;

        if (type === "hero-section") {
          setMediaDetails(response);
          setHasLoadedOnce(true);
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

        let computedLimit;

        if (top10mode) {
          computedLimit = 10;
        } else if (typeof limit === "number") {
          computedLimit = limit;
        } else if (type === "hero-carousel") {
          computedLimit = 15;
        } else {
          computedLimit = 20;
        }

        setMovies(items.slice(0, computedLimit));
        setHasLoadedOnce(true);
      } catch (err) {
        console.error("Erro ao buscar dados:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [
    visible,
    isActive,
    hasLoadedOnce,
    fetchFn,
    fetchParams,
    type,
    limit,
    isHero,
    isStatic,
  ]);

  const renderContent = () => {
    if (isStatic) {
      return CarouselComponent ? <CarouselComponent /> : null;
    }

    if (loading && !hasLoadedOnce)
      return SkeletonComponent ? (
        <SkeletonComponent card_size={card_size} />
      ) : null;

    if (type === "hero-section" && mediaDetails)
      return (
        <CarouselComponent
          movies={mediaDetails}
          mediaType={fetchParams.mediaType}
          language={fetchParams.language}
        />
      );

    if (type === "hero-carousel" && movies.length)
      return <CarouselComponent mediasData={movies} />;

    if (CarouselComponent)
      return (
        <>
          {title && (
            <div className="section-title">
              <h4>{title}</h4>
            </div>
          )}
          <CarouselComponent
            movies={movies}
            top10mode={top10mode}
            card_size={card_size}
            language={fetchParams.language}
          />
        </>
      );

    return null;
  };

  return (
    <div
      ref={sectionRef}
      className={`lazy-carousel-wrapper ${visible ? "visible" : ""}`}
    >
      {isHero || isActive || visible || isStatic ? renderContent() : null}
    </div>
  );
};

export default React.memo(LazyCarousel);
