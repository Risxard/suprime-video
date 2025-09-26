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

  const getItemWidth = () => {
    const el = heroCarousel.current;
    if (!el || el.children.length === 0) return window.innerWidth;
    return el.children[0].offsetWidth;
  };

  function animateScrollTo(target) {
    const el = heroCarousel.current;
    if (!el) return;

    const start = el.scrollLeft;
    const distance = target - start;
    const startTime = performance.now();

    function easeOutCubic(t) {
      return 1 - Math.pow(1 - t, 3);
    }

    function step(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);

      el.scrollLeft = start + distance * eased;

      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  const scrollNext = () => {
    if (activeIndex < medias.length - 1) {
      const target = heroCarousel.current.scrollLeft + getItemWidth();
      animateScrollTo(target);
      setActiveIndex((prev) => prev + 1);
    }
  };

  const scrollPrev = () => {
    if (activeIndex > 0) {
      const target = heroCarousel.current.scrollLeft - getItemWidth();
      animateScrollTo(target);
      setActiveIndex((prev) => prev - 1);
    }
  };


  useEffect(() => {
    const el = heroCarousel.current;
    if (!el) return;

    const handleScroll = () => {
      const itemWidth = getItemWidth();
      const index = Math.round(el.scrollLeft / itemWidth);
      setActiveIndex(index);
    };

    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, [medias]);


  const goToSlide = (index) => {
    const el = heroCarousel.current;
    if (!el) return;

    const itemWidth = getItemWidth();
    const target = index * itemWidth;
    animateScrollTo(target);
    setActiveIndex(index);
  };

  return (
    <div className="hero-carousel-Container">
      <div className="topra">

      </div>
      <button
        className="heroPrevBtn"
        onClick={scrollPrev}
        disabled={activeIndex === 0}
      >
        <ChevronLeft color="#ffffff" />
      </button>

      <div className="hero-carousel">
        <div className="hero-carousel-List" ref={heroCarousel}>
          {medias.map((movie, index) => (
            <HeroCarouselItem
              key={movie.id || index}
              movie={movie}
              language={language}
              className="hero-carousel-Item"
            />
          ))}
        </div>
      </div>

      <button
        className="heroNextBtn"
        onClick={scrollNext}
        disabled={activeIndex === medias.length - 1}
      >
        <ChevronRight color="#ffffff" />
      </button>

      <div className="slider-dots">
        {medias.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === activeIndex ? "active" : ""}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
