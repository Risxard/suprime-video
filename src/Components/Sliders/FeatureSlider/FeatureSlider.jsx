import React, { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import FeatureItem from "./Components/FeatureItem.jsx";
import "./FeatureSlider.css";

const FeatureSlider = (SectionData) => {
  const medias = SectionData.medias.movies;
  const language = SectionData.language;

  const featureSlider = useRef(null);
  const intervalIdRef = useRef(null);

  const [isAtStart, setIsAtStart] = useState(true);
  const [visibleIndex, setVisibleIndex] = useState(0);

  function prevSlider() {
    if (featureSlider.current) {
      featureSlider.current.scrollLeft -= 1000;
      updateIsAtStart();
      updateNextBtnDisplay();
      restartInterval();
    }
  }

  function nextSlider() {
    if (featureSlider.current) {
      const isAtEnd =
        featureSlider.current.scrollLeft + featureSlider.current.clientWidth ===
        featureSlider.current.scrollWidth;

      if (isAtEnd) {
        // Se estiver no último slide, volte para o primeiro slide
        featureSlider.current.scrollLeft = 0;
      } else {
        // Caso contrário, vá para o próximo slide
        featureSlider.current.scrollLeft += 1000;
      }

      updateIsAtStart();
      updateNextBtnDisplay();
      restartInterval();
    }
  }

  function restartInterval() {
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
    }

    intervalIdRef.current = setInterval(() => {
      nextSlider();
    }, 40000); // 40 seconds
  }

  function updateIsAtStart() {
    if (featureSlider.current) {
      const atStart = featureSlider.current.scrollLeft === 0;
      setIsAtStart(atStart);
    }
  }

  function updateNextBtnDisplay() {
    if (featureSlider.current) {
      const atEnd =
        featureSlider.current.scrollLeft + featureSlider.current.clientWidth ===
        featureSlider.current.scrollWidth;
      const nextBtn = document.getElementById("FeatureNextBtn");
      if (nextBtn) {
        nextBtn.style.display = atEnd ? "none" : "flex";
      }
    }
  }

  useEffect(() => {
    restartInterval();
    updateIsAtStart();

    const handleScroll = () => {
      updateIsAtStart();
      updateNextBtnDisplay();
      updateVisibleIndex();
    };

    if (featureSlider.current) {
      featureSlider.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      clearInterval(intervalIdRef.current);

      // Verifica se featureSlider.current está definido antes de remover o ouvinte
      if (featureSlider.current) {
        featureSlider.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const handleRadioChange = (index) => {
    setVisibleIndex(index);
    scrollSliderToIndex(index);
  };

  const scrollSliderToIndex = (index) => {
    if (featureSlider.current) {
      const itemWidth = featureSlider.current.children[0].offsetWidth;
      featureSlider.current.scrollLeft = itemWidth * index;
      updateIsAtStart();
      updateNextBtnDisplay();
      restartInterval();
    }
  };

  const updateVisibleIndex = () => {
    if (featureSlider.current) {
      const itemWidth = featureSlider.current.children[0].offsetWidth;
      const newIndex = Math.round(featureSlider.current.scrollLeft / itemWidth);
      setVisibleIndex(newIndex);
    }
  };

  return (
    <div className="feature-container">
      <span
        id="FeaturePrevBtn"
        onClick={prevSlider}
        style={{ display: isAtStart ? "none" : "flex" }}
      >
        <ChevronLeft color="#ffffff" />
      </span>
      <span id="FeatureNextBtn" onClick={nextSlider}>
        <ChevronRight color="#ffffff" />
      </span>

      <div className="slide-content">
        <div className="slider" ref={featureSlider}>
          {medias.map((movie, index) => (
            <FeatureItem
              key={movie.id}
              movie={movie}
              language={language}
              index={index}
              isVisible={index === visibleIndex}
            />
          ))}
        </div>
      </div>

      <span className="slider-control">
        <ul className="radio-list">
          {medias.map((_, index) => (
            <li
              key={index}
              className={`radio-item ${index === visibleIndex ? 'checked' : ''}`}
              onClick={() => handleRadioChange(index)}
            >
            </li>
          ))}
        </ul>
      </span>
    </div>
  );
};

export default FeatureSlider;
