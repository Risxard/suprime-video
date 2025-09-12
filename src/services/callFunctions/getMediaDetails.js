import Axios from 'axios';
import { guestApiKey } from '../guestApi';
import i18next from 'i18next';


const APIKey = guestApiKey;

const similarFilter = (similarData) => {
  const similarMovies = similarData;
  const filteredSimilarMovies = similarMovies.filter(movie =>
    movie.backdrop_path !== null && movie.poster_path !== null
  );
  const similar = filteredSimilarMovies.slice(0, 6);
  return similar;
};

export const getMediaDetails = (mediaParam) => {
  return fetchMediaDetails(mediaParam);
};

const fetchMediaDetails = async (mediaParam) => {
  const id = mediaParam.id;
  const lang = i18next.language;
  const mediaType = mediaParam.type;

  try {
    const res = await Axios.get(`https://api.themoviedb.org/3/${mediaType}/${id}?language=${lang}&api_key=${APIKey}&append_to_response=videos,similar,translations,credits`);
    const initialData = res.data;

    const subtitles = initialData.translations.translations.slice(0, 10);
    const spokenLanguages = initialData.spoken_languages;
    const credits = initialData.credits;
    const studios = initialData.production_companies;
    const originalLanguage = initialData.original_language;

    const starring = credits.cast.slice(0, 3);
    const directors = credits.crew.filter((person) => person.job === "Director");
    const producers = credits.crew.filter((person) => person.job === "Producer");

    const initialSimilar = similarFilter(initialData.similar.results);

    const titleFiltered = mediaType === 'movie' ? initialData.title : initialData.name;
    const originalTtitleFiltered = mediaType === 'movie' ? initialData.original_title : initialData.original_name;
    const seasonsFiltered = mediaType === 'movie' ? '' : initialData.number_of_seasons;
    const filteredDates = mediaType === 'movie' ? initialData.release_date : '';
    const filteredFirstDate = mediaType === 'tv' ? initialData.first_air_date : '';
    const filteredLastDate = mediaType === 'tv' ? initialData.last_air_date : '';

    return {
      title: titleFiltered,
      original_title: originalTtitleFiltered,
      seasons: seasonsFiltered,
      runtime: initialData.runtime,
      overview: initialData.overview,
      tagline: initialData.tagline,
      backdrop_path: initialData.backdrop_path,
      release_date: filteredDates,
      first_date: filteredFirstDate,
      last_date: filteredLastDate,
      vote_average: initialData.vote_average,
      genres_Id: initialData.genres,
      similar: initialSimilar,
      starring: starring,
      directors: directors,
      producers: producers,
      studios: studios,
      spoken_languages: spokenLanguages,
      subtitles: subtitles,
      original_language: originalLanguage,
    };
  } catch (err) {
    throw new Error(err.message);
  }
};
