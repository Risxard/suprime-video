import { useState, useEffect } from "react";
import { tmdbService } from "../../../services/tmdb/tmdbServices";

const usePerGenre = ({ pageType, language, with_genres, sort_by, page }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchPerGenres = async () => {
      try {
        setLoading(true);
        const response = await tmdbService.fetchPerGenres({
          pageType,
          language,
          with_genres,
          sort_by,
          page,
        });

        let results = [];
        if (Array.isArray(response)) results = response;
        else if (response && Array.isArray(response.results))
          results = response.results;

        if (isMounted) {
          setData(results);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          console.error("Erro ao buscar filmes:", err);
          setError(err);
          setData([]);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchPerGenres();

    return () => {
      isMounted = false;
    };
  }, [pageType, language, with_genres, sort_by, page]);

  return { data, loading, error };
};

export default usePerGenre;
