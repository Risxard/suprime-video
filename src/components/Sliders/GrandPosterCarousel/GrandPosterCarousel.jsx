import React, { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./GrandPosterCarousel.css";
import GrandPosterCarouselItem from "./components/GrandPosterCarouselItem.jsx";

const GrandPosterCarousel = ({ movies = [], language }) => {
  const carouselRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const duration = 1000;
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);


  const getCardWidth = () => {
    const el = carouselRef.current;
    if (!el || el.children.length === 0) return 0;
    return el.children[0].offsetWidth;
  };


  const getCardsPerView = () => {
    const el = carouselRef.current;
    if (!el || !el.firstElementChild) return 1;
    const styles = getComputedStyle(el.firstElementChild);
    return parseInt(styles.getPropertyValue("--card-caroulsel-number")) || 1;
  };


  const animateScrollTo = (target, callback) => {
    const el = carouselRef.current;
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

      if (progress < 1) {
        requestAnimationFrame(step);
      } else if (callback) {
        callback();
      }
    }

    requestAnimationFrame(step);
  };

  const scrollToIndex = (index) => {
    const cardWidth = getCardWidth();
    const cardsPerView = getCardsPerView();


    const maxIndex = Math.ceil(movies.length / cardsPerView) - 1;

    if (index < 0) index = 0;
    if (index > maxIndex) index = maxIndex;

    const target = index * cardWidth * cardsPerView;
    animateScrollTo(target, () => {
      setActiveIndex(index);
    });
  };

  const scrollNext = () => {
    scrollToIndex(activeIndex + 1);
  };

  const scrollPrev = () => {
    scrollToIndex(activeIndex - 1);
  };


  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const deltaX = touchEndX.current - touchStartX.current;
    const threshold = 100;
    if (deltaX > threshold) {
      scrollPrev();
    } else if (deltaX < -threshold) {
      scrollNext();
    }
  };

  return (
    <div className="grandPoster-carousel-Container">
      <button
        className="grandPosterPrevBtn"
        onClick={scrollPrev}
        disabled={activeIndex === 0}
      >
        <ChevronLeft color="#ffffff" />
      </button>

      <div
        className="grandPoster-carousel"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="grandPoster-carousel-list" ref={carouselRef}>
          {movies.map((movie, index) => (
            <GrandPosterCarouselItem
              key={index}
              movie={movie}
              language={language}
              className="grandPoster-carousel-item"
            />
          ))}
        </div>
      </div>

      <button
        className="grandPosterNextBtn"
        onClick={scrollNext}
        disabled={
          activeIndex >= Math.ceil(movies.length / getCardsPerView()) - 1
        }
      >
        <ChevronRight color="#ffffff" />
      </button>
    </div>
  );
};

export default GrandPosterCarousel;
