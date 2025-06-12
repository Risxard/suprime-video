import React, { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import FeatureItem from "./Components/FeatureItem.jsx";
import "./FeatureSlider.css";
import { useSelector } from "react-redux";
import i18n from "../../../i18n.js";

const FeatureSlider = ({ mediasData }) => {
  const medias = mediasData?.movies || [];

  const language = i18n.language;

  const featureSlider = useRef(null);
  const intervalIdRef = useRef(null);
  const visibleIndexRef = useRef(0);

  function prevSlider() {
    if (featureSlider.current) {
      const isAtStart = featureSlider.current.scrollLeft === 0;

      if (isAtStart) {
        setTimeout(() => {
          featureSlider.current.scrollLeft = featureSlider.current.scrollWidth;
        }, 300);
      } else {
        setTimeout(() => {
          featureSlider.current.scrollLeft -= window.innerWidth;
        }, 300);
      }

      restartInterval();
    }
  }

  function nextSlider() {
    if (featureSlider.current) {
      const isAtEnd =
        featureSlider.current.scrollLeft + featureSlider.current.clientWidth ===
        featureSlider.current.scrollWidth;

      if (isAtEnd) {
        setTimeout(() => {
          featureSlider.current.scrollLeft = 0;
        }, 300);
      } else {
        setTimeout(() => {
          featureSlider.current.scrollLeft += window.innerWidth;
        }, 300);
      }

      restartInterval();
    }
  }

  function restartInterval() {
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
    }

    intervalIdRef.current = setInterval(() => {
      nextSlider();
    }, 40000);
  }

  useEffect(() => {
    restartInterval();

    const handleScroll = () => {
      updateVisibleIndex();
    };

    if (featureSlider.current) {
      featureSlider.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      clearInterval(intervalIdRef.current);

      if (featureSlider.current) {
        featureSlider.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const updateVisibleIndex = () => {
    if (featureSlider.current) {
      const initialPosition = featureSlider.current.children[0].offsetWidth;
      const newIndex = Math.round(
        featureSlider.current.scrollLeft / initialPosition
      );
      visibleIndexRef.current = newIndex;
      updateRadioItems();
    }
  };

  useEffect(() => {
    updateRadioItems();
  }, [medias]);

  const updateRadioItems = () => {
    const radioItems = document.getElementsByClassName("radio-item");
    for (let i = 0; i < radioItems.length; i++) {
      if (i === visibleIndexRef.current) {
        radioItems[i].classList.add("checked");
      } else {
        radioItems[i].classList.remove("checked");
      }

      if (visibleIndexRef.current < 3) {
        if (i >= 0 && i <= 4) {
          radioItems[i].style.opacity = 1;
          if (i === 4) {
            radioItems[i].style.opacity = 1;
            radioItems[i].style.width = "4px";
            radioItems[i].style.height = "4px";
          } else {
            radioItems[i].style.width = "";
            radioItems[i].style.height = "";
          }
          radioItems[i].style.marginRight = "";
        } else {
          radioItems[i].style.opacity = 0;
          radioItems[i].style.width = "0";
          radioItems[i].style.height = "0";
          radioItems[i].style.marginRight = "0";
        }
      } else if (visibleIndexRef.current > 6) {
        if (i >= 5) {
          radioItems[i].style.opacity = 1;
          if (i === 5) {
            radioItems[i].style.opacity = 1;
            radioItems[i].style.width = "4px";
            radioItems[i].style.height = "4px";
          } else {
            radioItems[i].style.width = "";
            radioItems[i].style.height = "";
          }
          radioItems[i].style.marginRight = "";
        } else {
          radioItems[i].style.opacity = 0;
          radioItems[i].style.width = "0";
          radioItems[i].style.height = "0";
          radioItems[i].style.marginRight = "0";
        }
      } else {
        if (
          i >= visibleIndexRef.current - 2 &&
          i <= visibleIndexRef.current + 2
        ) {
          radioItems[i].style.opacity = 1;
          if (
            i === visibleIndexRef.current - 2 ||
            i === visibleIndexRef.current + 2
          ) {
            radioItems[i].style.opacity = 1;
            radioItems[i].style.width = "4px";
            radioItems[i].style.height = "4px";
          } else {
            radioItems[i].style.width = "";
            radioItems[i].style.height = "";
          }
          radioItems[i].style.marginRight = "";
        } else {
          radioItems[i].style.opacity = 0;
          radioItems[i].style.width = "0";
          radioItems[i].style.height = "0";
          radioItems[i].style.marginRight = "0";
        }
      }
    }
  };

  return (
    <div className="feature-container">
      <span id="FeaturePrevBtn" onClick={prevSlider}>
        <ChevronLeft color="#ffffff" />
      </span>
      <span id="FeatureNextBtn" onClick={nextSlider}>
        <ChevronRight color="#ffffff" />
      </span>

      <div className="slide-content">
        <ul className="slider" ref={featureSlider}>
          {medias.map((movie) => (
            <FeatureItem key={movie.id} movie={movie} language={language} />
          ))}
        </ul>
      </div>

      <span className="slider-control">
        <ul className="radio-list">
          {medias.map((_, index) => (
            <li key={index} className="radio-item"/>
          ))}
        </ul>
      </span>
    </div>
  );
};

export default FeatureSlider;
