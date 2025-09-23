import { useState, useEffect } from "react";
import { tmdbService } from "../../services/tmdb/tmdbServices";

const useMediaClassification = ({ id, language, mediaType }) => {
  const [mediaClass, setMediaClass] = useState("");


  useEffect(() => {
    if (!id || !language || !mediaType) return;

    const fetchData = async () => {
      try {
        const data = await tmdbService.fetchClassification({
          mediaType,
          mediaId: Number(id),
          language,
        });

        if (mediaType === "movie") {
          const releaseDates = data?.release_dates ?? [];

          const certification =
            releaseDates
              .slice()
              .reverse()
              .find((r) => r.certification.trim() !== "")
              ?.certification ?? "";

          setMediaClass(certification);
        }

        if (mediaType === "tv") {
          setMediaClass(data?.rating ?? "");
        }
      } catch (err) {
        console.error("Erro ao buscar classificação:", err);
        setMediaClass("");
      }
    };

    fetchData();
  }, [id, language, mediaType]);

  return mediaClass;
};

export default useMediaClassification;
