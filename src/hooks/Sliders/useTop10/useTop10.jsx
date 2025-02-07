import { useState, useEffect } from "react";
import { guestApiKey } from "../../../Services/guestApi";

const useTop10 = (SectionData) => {
  const language = SectionData.language;
  const pageType = SectionData.pageType;

  const [movies, setMovies] = useState([]);



  const APIKey = guestApiKey;


  useEffect(() => {
    const apiUrl = `https://api.themoviedb.org/3/trending/${pageType}/week?language=${language}&page=1&api_key=${APIKey}&append_to_response=details`;

    if (language) {
      fetch(apiUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          const moviesqtde = data.results.slice(0, 10);
          setMovies(moviesqtde);

        })
        .catch((error) => {
          console.error("Fetch error:", error);
        });
    }
  }, [language, pageType]);

  return { movies };
};

export default useTop10;
