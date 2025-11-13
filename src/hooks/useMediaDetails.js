import { useEffect, useState } from "react";
import { tmdbService } from "../services/tmdb/tmdbServices";

export const useMediaDetails = (mediaType, mediaId, language) => {
  const [media, setMedia] = useState(null);
  const [logo, setLogo] = useState(null);
  const [logoTried, setLogoTried] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!mediaId || !mediaType) return;

    let isMounted = true;

    const fetchData = async () => {
      setLoading(true);
      setLogoTried(false);
      setMedia(null);
      setLogo(null);

      try {
        const details = await tmdbService.fetchMediaDetails({
          mediaType,
          mediaId,
          language,
        });

        if (!isMounted) return;
        setMedia(details);

        const response = await tmdbService.fetchMediaLogoImage({
          mediaId,
          mediaType,
          language,
          originalLanguage: details.original_language,
        });

        if (!isMounted) return;
        setLogo(response ? response.file_path : null);
      } catch {
        if (isMounted) {
          setMedia(null);
          setLogo(null);
        }
      } finally {
        if (isMounted) {
          setLogoTried(true);
          setLoading(false);
        }
      }
    };

    fetchData();
    return () => (isMounted = false);
  }, [mediaType, mediaId, language]);

  return {
    media,
    logo,
    logoTried,
    loading,
  };
};
