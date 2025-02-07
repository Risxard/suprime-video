import { useState, useEffect } from "react";
import { guestApiKey } from "./guestApi";
import axios from "axios";

export const fetchData = async (language, selectedGenre, filterMode, filterScope, pageNumber) => {
  const [medias, setMedias] = useState([]);

  const APIKey = guestApiKey;
  const api_path = "https://api.themoviedb.org/";
  const rawApiKey = `&api_key=${APIKey}`;
  const rawLanguage = `&language=${language}`;

  const timeWindow = "day";

  let filtered;

  const baseWithout = "&without_genres=";

  useEffect(() => {
    if (filterScope === "movie") {
      let array;
      let noGenre;
      switch (selectedGenre) {
        case 28:
          array = [28];
          noGenre = [16, 99];
          filtered = `${array.join("%2C")}${baseWithout + noGenre}`;
          break;
        case 12:
          array = [12, 878];
          filtered = array.join("%2C");
          break;
        case 35:
          array = [35, 12];
          noGenre = [16, 10770, 28, 99];
          filtered = `${array.join("%2C")}${baseWithout}${noGenre.join("%2C")}`;
          break;
        case 80:
          array = [80];
          noGenre = [35, 16, 99];
          filtered = `${array.join("%2C")}${baseWithout}${noGenre.join("%2C")}`;
          break;
        case 18:
          array = [18];
          noGenre = [878, 10770, 99, 10752, 36, 28];
          filtered = `${array.join("%2C")}${baseWithout}${noGenre.join("%2C")}`;
          break;
        case 9648:
          array = [9648];
          noGenre = [16, 27];
          filtered = `${array.join("%2C")}${baseWithout}${noGenre.join("%2C")}`;
          break;
        case 878:
          array = [878, 28];
          filtered = `${array.join("%2C")}`;
          break;
        case 53:
          array = [53];
          noGenre = [16, 27, 28];
          filtered = `${array.join("%2C")}${baseWithout}${noGenre.join("%2C")}`;
          break;
        default:
          filtered = selectedGenre;
      }
    }
    if (filterScope === "tv") {
      let array;
      let noGenre;
      switch (selectedGenre) {
        case 10759:
          array = [10759];
          noGenre = [16];
          filtered = `${array.join("%2C")}${baseWithout + noGenre}`;
          break;
        case 35:
          array = [35];
          noGenre = [16];
          filtered = `${array.join("%2C")}${baseWithout}${noGenre.join("%2C")}`;
          break;
        case 80:
          array = [80];
          noGenre = [16];
          filtered = `${array.join("%2C")}${baseWithout}${noGenre.join("%2C")}`;
          break;
        case 18:
          array = [18];
          noGenre = [16, 35];
          filtered = `${array.join("%2C")}${baseWithout}${noGenre.join("%2C")}`;
          break;
        case 9648:
          array = [9648];
          noGenre = [35];
          filtered = `${array.join("%2C")}${baseWithout}${noGenre.join("%2C")}`;
          break;
        default:
          filtered = selectedGenre;
      }
    }
  }, [language, selectedGenre, filterScope]);

  useEffect(() => {
    const fetchMediaData = async () => {
      const perGenreRaw = `
        ${api_path}3/discover/${filterScope}?include_adult=false&include_video=false${rawLanguage}&page=${pageNumber}&sort_by=popularity.desc${rawApiKey}&with_genres=${filtered}`;

      const perTrendingRaw = `
        ${api_path}3/trending/${filterScope}/${timeWindow}${rawLanguage}${rawApiKey}`;

      const selectedRaw =
        filterMode === "genre"
          ? perGenreRaw
          : filterMode === "trending"
            ? perTrendingRaw
            : "";

      if (language) {
        try {
          const response = await axios.get(selectedRaw);
          const dataToFilter = response.data.results;
          const dataFiltered = dataToFilter.filter(
            (obj) => obj.backdrop_path !== null && obj.backdrop_path !== ""
          );
          setMedias(dataFiltered);
        } catch (error) {
          console.error("Fetch error:", error);
        }
      }
    };

    fetchMediaData();
  }, [language, pageNumber, filterMode, filterScope, selectedGenre, filtered]);

  return medias;
};

