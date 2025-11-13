import { useEffect, useState } from "react";

export const useScrollOpacity = () => {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const halfScreen = window.innerHeight / 5;
      let newOpacity = 1 - (scrollY / halfScreen) * 0.8;
      newOpacity = Math.min(1, Math.max(0.2, newOpacity));
      setOpacity(newOpacity);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return opacity;
};
