import { useState, useEffect } from "react";
import { tmdbService } from "../../services/tmdb/tmdbServices";

export const useGetVideoKey = (mediaId, language, mediaType, originalLanguage) => {
  const [videoKey, setVideoKey] = useState(null);

  useEffect(() => {
    if (mediaId && mediaType && language && originalLanguage) {
      const getVideoKey = async () => {
        try {
          const data = await tmdbService.fetchVideoKey({
            mediaType,
            mediaId,
            language,
            originalLanguage,
          });
          setVideoKey(data);

        } catch (error) {
          console.error("Error fetching video key:", error);
        }
      };

      getVideoKey();
    }
  }, [mediaId, mediaType, language, originalLanguage]);

  return videoKey;
};

export default useGetVideoKey;
