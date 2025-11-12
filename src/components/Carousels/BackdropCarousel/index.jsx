import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./styles.css";
import BackdropItem from "./components/Backdropitem";

const BackdropCarousel = ({ movies = [] }) => {
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
    return Math.round(scrollLeft / cardWidth);
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
    const cardWidth = getCardWidth();
    const perView = getCardsPerView();
    const maxPage = Math.ceil(movies.length / perView) - 1;
    const clampedPage = Math.max(0, Math.min(pageIndex, maxPage));
    const target = clampedPage * cardWidth * perView;

    animateScrollTo(target, () => setActivePage(clampedPage));
  };

  const scrollNext = () => {
    if (isAnimatingRef.current) return;
    const currentIndex = getClosestVisibleIndex();
    const perView = getCardsPerView();
    const nextPage = Math.floor(currentIndex / perView) + 1;
    scrollToPage(nextPage);
  };

  const scrollPrev = () => {
    if (isAnimatingRef.current) return;
    const currentIndex = getClosestVisibleIndex();
    const perView = getCardsPerView();
    const prevPage = Math.floor(currentIndex / perView) - 1;
    scrollToPage(prevPage);
  };


  useEffect(() => {
    const handleResize = () => {
      if (!isResizing) setIsResizing(true);
      clearTimeout(resizeTimeoutRef.current);

      resizeTimeoutRef.current = setTimeout(() => {
        const currentIndex = getClosestVisibleIndex();
        const perView = getCardsPerView();
        setActivePage(Math.floor(currentIndex / perView));
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
      <div className="backdrop-container">
        <button
          className="backdrop-PrevBtn"
          onClick={scrollPrev}
          disabled={activePage === 0}
        >
          <ChevronLeft color="#ffffff" />
        </button>

        <div
          className="backdrop-carousel"
          ref={carouselRef}
          style={{
            scrollSnapType: isResizing ? "x mandatory" : "none",
          }}
        >
          {movies.map((movie, index) => (
            <BackdropItem key={index} movie={movie} className="backdrop-item" />
          ))}
        </div>

        <button
          className="backdrop-NextBtn"
          onClick={scrollNext}
          disabled={
            activePage >= Math.ceil(movies.length / getCardsPerView()) - 1
          }
        >
          <ChevronRight color="#ffffff" />
        </button>
      </div>
    </section>
  );
};

export default React.memo(BackdropCarousel);
