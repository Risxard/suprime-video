import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./styles.css";
import PosterCarouselItem from "./components/PosterCarouselItem.jsx";

const PosterCarousel = ({
  movies = [],
  language,
  top10mode,
  card_size,
}) => {
  const carouselRef = useRef(null);
  const [activePage, setActivePage] = useState(0);
  const [isResizing, setIsResizing] = useState(false);
  const resizeTimeoutRef = useRef(null);
  const isAnimatingRef = useRef(false);
  const duration = 800;

  const getCardWidth = () => {
    const el = carouselRef.current;
    if (!el || el.children.length === 0) return 0;
    return el.children[0].offsetWidth;
  };

  const getCardsPerView = () => {
    const el = carouselRef.current;
    if (!el || !el.firstElementChild) return 1;
    const styles = getComputedStyle(el.firstElementChild);
    return parseInt(styles.getPropertyValue("--card-carousel-number")) || 1;
  };

  const getClosestVisibleIndex = () => {
    const el = carouselRef.current;
    if (!el) return 0;
    const scrollLeft = el.scrollLeft;
    const cardWidth = getCardWidth();
    const index = Math.round(scrollLeft / cardWidth);
    return Math.max(0, Math.min(index, movies.length - 1));
  };

  const animateScrollTo = (target, callback) => {
    const el = carouselRef.current;
    if (!el || isAnimatingRef.current) return;

    isAnimatingRef.current = true;
    const start = el.scrollLeft;
    const distance = target - start;
    const startTime = performance.now();

    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    const step = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);
      el.scrollLeft = start + distance * eased;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        isAnimatingRef.current = false;
        if (callback) callback();
      }
    };

    requestAnimationFrame(step);
  };

  const scrollToPage = (pageIndex) => {
    const el = carouselRef.current;
    if (!el || isAnimatingRef.current) return;

    const cardWidth = getCardWidth();
    const cardsPerView = getCardsPerView();
    const maxPage = Math.ceil(movies.length / cardsPerView) - 1;
    const clampedPage = Math.max(0, Math.min(pageIndex, maxPage));
    const target = clampedPage * cardWidth * cardsPerView;

    animateScrollTo(target, () => setActivePage(clampedPage));
  };

  const scrollNext = () => {
    if (isAnimatingRef.current) return; 
    const currentIndex = getClosestVisibleIndex();
    const cardsPerView = getCardsPerView();
    const nextPage = Math.floor(currentIndex / cardsPerView) + 1;
    scrollToPage(nextPage);
  };

  const scrollPrev = () => {
    if (isAnimatingRef.current) return;
    const currentIndex = getClosestVisibleIndex();
    const cardsPerView = getCardsPerView();
    const prevPage = Math.floor(currentIndex / cardsPerView) - 1;
    scrollToPage(prevPage);
  };

  useEffect(() => {
    const handleResize = () => {
      if (!isResizing) setIsResizing(true);
      clearTimeout(resizeTimeoutRef.current);

      resizeTimeoutRef.current = setTimeout(() => {
        const currentIndex = getClosestVisibleIndex();
        const cardsPerView = getCardsPerView();
        setActivePage(Math.floor(currentIndex / cardsPerView));
        setIsResizing(false);
      }, 600);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeoutRef.current);
    };
  }, [movies]);

  return (
    <section>
      <div
        className={`poster-carousel-Container ${
          top10mode ? "top10" : ""
        } ${card_size || ""}`}
      >
        <button className="posterPrevBtn" onClick={scrollPrev}>
          <ChevronLeft color="#ffffff" />
        </button>

        <div className="poster-carousel">
          <div
            className={`poster-carousel-list ${
              isResizing ? "snap-enabled" : ""
            }`}
            ref={carouselRef}
          >
            {movies.map((movie, index) => (
              <PosterCarouselItem
                key={index}
                movie={movie}
                language={language}
                topNumber={index + 1}
                top10mode={top10mode}
                card_size={card_size}
                className="poster-carousel-item"
              />
            ))}
          </div>
        </div>

        <button className="posterNextBtn" onClick={scrollNext}>
          <ChevronRight color="#ffffff" />
        </button>
      </div>
    </section>
  );
};

export default PosterCarousel;
