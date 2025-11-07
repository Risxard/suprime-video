import React, { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./AvatarCarousel.css";
import AvatarCarouselItem from "./components/AvatarCarouselItem.jsx";

const AvatarCarousel = ({ avatars = [], sectionTitle, onSelect }) => {
  const carouselRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const duration = 500;
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
    return parseInt(styles.getPropertyValue("--avatar-carousel-number")) || 1;
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

    const maxIndex = Math.ceil(avatars.length / cardsPerView) - 1;

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
    <section>
      <div className="avatar-section-title">
        <h4>{sectionTitle}</h4>
      </div>

      <div className={`avatar-carousel-Container`}>
        <div className="avatar-carousel-content">
          <button
            className="avatarPrevBtn"
            onClick={scrollPrev}
            disabled={activeIndex === 0}
          >
            <ChevronLeft color="#ffffff" strokeWidth={1.5} />
          </button>

          <div
            className="avatar-carousel-list"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            ref={carouselRef}
          >
            {avatars.map((avatar) => (
              <AvatarCarouselItem
                key={avatar.id}
                avatar={avatar}
                onSelect={onSelect}
              />
            ))}
          </div>

          <button
            className="avatarNextBtn"
            onClick={scrollNext}
            disabled={
              activeIndex >= Math.ceil(avatars.length / getCardsPerView()) - 1
            }
          >
            <ChevronRight color="#ffffff" strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default AvatarCarousel;
