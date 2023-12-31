import { useState, useEffect } from "react";
import { guestApiKey } from "../../../services/guestApi";

const usePerGenre = (SectionData) => {
  const APIKey = guestApiKey;

  const language = SectionData.language;
  const mediaType = SectionData.mediaType;
  const genresArray = SectionData.selectedGenre;


  const rawApiKey = `&api_key=${APIKey}`;
  const rawLanguage = `&language=${language}`;

  const [movies, setMovies] = useState([]);

  const api_path = "https://api.themoviedb.org/";

  useEffect(() => {
    const apiUrl = `
      ${api_path}3/discover/${mediaType}?include_adult=false&include_video=false
      ${rawLanguage}&page=1&sort_by=popularity.desc${rawApiKey}&with_genres=${genresArray}`;

    if (language) {
      fetch(apiUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          const mediaArray = data.results;
          setMovies(mediaArray);
        })
        .catch((error) => {
          console.error("Fetch error:", error);
        });
    }
  }, [genresArray, mediaType, language]);

  return { movies };
};

export default usePerGenre;
