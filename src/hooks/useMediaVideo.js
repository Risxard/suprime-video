import { useEffect, useState } from "react";
import { tmdbService } from "../services/tmdb/tmdbServices";

export const useMediaVideo = (media, mediaType, language) => {
  const [videoKey, setVideoKey] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!media) return;

    let isMounted = true;

    const loadVideo = async () => {
      setLoading(true);

      try {
        const response = await tmdbService.fetchVideoKey({
          mediaType,
          mediaId: media.id,
          language,
          originalLanguage: media.original_language,
        });

        if (!isMounted) return;
        setVideoKey(response || "");
      } catch {
        if (isMounted) setVideoKey("");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadVideo();
    return () => (isMounted = false);
  }, [media, mediaType, language]);

  return {
    videoKey,
    loading,
  };
};
