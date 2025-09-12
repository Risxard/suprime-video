import { useState, useEffect } from "react";
import { tmdbService } from "../../../services/tmdb/tmdbServices";

const useTop10 = ({
  language,
  pageType,
  page,
  timeWindow,
  append_to_response,
}) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const data = await tmdbService.fetchTrending({
          pageType,
          language,
          page,
          timeWindow,
        });
        setMovies(Array.isArray(data) ? data : data.results || []);
      } catch (err) {
        console.error("Erro ao buscar filmes:", err);
      }
    };

    fetchTrending();
  }, [language, pageType, page, timeWindow, append_to_response]);

  return { movies };
};

export default useTop10;
