import { useState, useEffect } from "react";
import { tmdbService } from "../../../services/tmdb/tmdbServices";

const useNowPlaying = ({ pageType, language, region, page }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchNowPlaying = async () => {
      try {
        const data = await tmdbService.fetchNowPlaying({
          pageType,
          language,
          region,
          page,
        });
        setMovies(Array.isArray(data) ? data : data.results || []);
      } catch (err) {
        console.error("Erro ao buscar filmes:", err);
      }
    };

    fetchNowPlaying();
  }, [pageType, language, region, page]);

  return { movies };
};

export default useNowPlaying;
