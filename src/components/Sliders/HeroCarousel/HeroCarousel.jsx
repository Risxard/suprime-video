import React, { useRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./HeroCarousel.css";
import i18n from "../../../i18n.js";
import HeroCarouselItem from "./components/HeroCarouselItem.jsx";

const HeroCarousel = ({ mediasData }) => {
  const medias = mediasData || [];
  const language = i18n.language;
  const heroCarousel = useRef(null);
  const duration = 500;

  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const deltaX = touchEndX.current - touchStartX.current;
    const threshold = 150;
    if (deltaX > threshold) scrollPrev();
    else if (deltaX < -threshold) scrollNext();
  };

  const getItemWidth = () => {
    const el = heroCarousel.current;
    if (!el || el.children.length === 0) return window.innerWidth;
    return el.children[0].offsetWidth;
  };

  function animateScrollTo(target, callback) {
    const el = heroCarousel.current;
    if (!el) return;

    const start = el.scrollLeft;
    const distance = target - start;
    const startTime = performance.now();

    setIsAnimating(true);

    function easeOutCubic(t) {
      return 1 - Math.pow(1 - t, 3);
    }

    function step(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);

      el.scrollLeft = start + distance * eased;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setIsAnimating(false);
        if (callback) callback();
      }
    }

    requestAnimationFrame(step);
  }

  const scrollToIndex = (index) => {
    const itemWidth = getItemWidth();
    const target = (index + 1) * itemWidth;
    animateScrollTo(target, () => {
      setActiveIndex(index);
    });
  };

  const scrollNext = () => {
    if (isAnimating) return;
    scrollToIndex(activeIndex + 1);
  };

  const scrollPrev = () => {
    if (isAnimating) return;
    scrollToIndex(activeIndex - 1);
  };

  useEffect(() => {
    const el = heroCarousel.current;
    if (!el) return;

    const handleTransitionEnd = () => {
      const itemWidth = getItemWidth();
      const total = medias.length;

      let rawIndex = Math.round(el.scrollLeft / itemWidth) - 1;

      if (rawIndex < 0) {
        rawIndex = total - 1;
        el.scrollLeft = total * itemWidth;
      } else if (rawIndex >= total) {
        rawIndex = 0;
        el.scrollLeft = itemWidth;
      }

      setActiveIndex(rawIndex);
    };

    el.addEventListener("scrollend", handleTransitionEnd);
    return () => el.removeEventListener("scrollend", handleTransitionEnd);
  }, [medias]);

  useEffect(() => {
    const el = heroCarousel.current;
    if (!el) return;
    const itemWidth = getItemWidth();
    el.scrollLeft = itemWidth;
  }, [medias]);

  const extendedMedias = [medias[medias.length - 1], ...medias, medias[0]];

  return (
    <div className="hero-carousel-Container">
      <button
        className="heroPrevBtn"
        onClick={scrollPrev}
        disabled={isAnimating}
      >
        <ChevronLeft color="#ffffff" />
      </button>

      <div
        className="hero-carousel"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="hero-carousel-List" ref={heroCarousel}>
          {extendedMedias.map((movie, index) => {
            const realIndex =
              index === 0
                ? medias.length - 1
                : index === extendedMedias.length - 1
                ? 0
                : index - 1;

            return (
              <HeroCarouselItem
                key={`item-${index}-${movie?.id || "clone"}`}
                movie={movie}
                language={language}
                active={activeIndex === realIndex}
                className="hero-carousel-Item"
              />
            );
          })}

          
        </div>
      </div>

      <button
        className="heroNextBtn"
        onClick={scrollNext}
        disabled={isAnimating}
      >
        <ChevronRight color="#ffffff" />
      </button>

      <div className="slider-dots">
        {medias.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === activeIndex ? "active" : ""}`}
            onClick={() => scrollToIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
