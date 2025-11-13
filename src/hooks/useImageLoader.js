import { useEffect, useRef, useState } from "react";

export const useImageLoader = (logo) => {
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(true);

  const imagesLoaded = useRef(0);
  const totalImages = useRef(0);

  useEffect(() => {
    let count = 1;
    if (logo) count += 1;
    totalImages.current = count;
  }, [logo]);

  const onImageLoaded = () => {
    imagesLoaded.current += 1;
    if (imagesLoaded.current >= totalImages.current) {
      setTimeout(() => {
        setReady(true);
        setLoading(false);
      }, 250);
    }
  };

  return {
    isReady: ready,
    isLoading: loading,
    onImageLoaded,
  };
};
