import { useEffect, useRef, useState } from 'react';

export const useIntersectionObserver = () => {
  const [visibleSections, setVisibleSections] = useState(2);

  useEffect(() => {
    const target = document.querySelector("#InfiniteCheck");

    const intersectionObserver = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        setTimeout(() => {
          setVisibleSections((prevVisibleSections) => prevVisibleSections + 4);

        }, 800);
      }
    });


    intersectionObserver.observe(target);

    return () => {

      intersectionObserver.disconnect();
    };
  }, []);

  return [visibleSections];
};