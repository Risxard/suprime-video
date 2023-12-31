import React, { useEffect, useState } from "react";

export const useFeatureAnimation = () => {
  const [isAnimationTargetVisible, setAnimationTargetVisible] = useState(false);

  useEffect(() => {
    const targetElement = document.querySelector(".animationTarget");

    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const callback = (entries) => {
      entries.forEach((entry) => {
        setAnimationTargetVisible(entry.isIntersecting);
      });
    };

    const observer = new IntersectionObserver(callback, options);
    observer.observe(targetElement);

    return () => {
      observer.disconnect();
    };
  }, []);

  return [options];
};
