import i18next from 'i18next';
import { tmdbService } from '../tmdb/tmdbServices';

const similarFilter = (similarData) => {
  const filteredSimilarMovies = similarData.filter(
    (movie) => movie.backdrop_path !== null && movie.poster_path !== null
  );
  return filteredSimilarMovies.slice(0, 6);
};


export const getMediaDetails = async (mediaParam) => {
  try {

    const initialData = await tmdbService.fetchMediaDetails({
      mediaType: mediaParam.type,
      mediaId: mediaParam.id,
      language: i18next.language,
    });


    const initialSimilar = similarFilter(initialData.similar.results);

    const mediaType = mediaParam.type;

    const titleFiltered = mediaType === 'movie' ? initialData.title : initialData.name;
    const originalTitleFiltered = mediaType === 'movie' ? initialData.original_title : initialData.original_name;
    const seasonsFiltered = mediaType === 'movie' ? '' : initialData.number_of_seasons;
    const filteredDates = mediaType === 'movie' ? initialData.release_date : '';
    const filteredFirstDate = mediaType === 'tv' ? initialData.first_air_date : '';
    const filteredLastDate = mediaType === 'tv' ? initialData.last_air_date : '';

    const credits = initialData.credits;
    const starring = credits.cast.slice(0, 3);
    const directors = credits.crew.filter((person) => person.job === "Director");
    const producers = credits.crew.filter((person) => person.job === "Producer");

    return {
      title: titleFiltered,
      original_title: originalTitleFiltered,
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
      studios: initialData.production_companies,
      spoken_languages: initialData.spoken_languages,
      subtitles: initialData.translations.translations.slice(0, 10),
      original_language: initialData.original_language,
    };
  } catch (err) {
    throw new Error(err.message);
  }
};
