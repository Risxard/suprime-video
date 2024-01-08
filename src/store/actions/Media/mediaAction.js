import mediaActionTypes from './mediaActionTypes';
import Axios from 'axios';
import { guestApiKey } from '../../../Services/guestApi';

const APIKey = guestApiKey;

const mediaDetailsRequest = () => ({
  type: mediaActionTypes.MEDIA_DETAILS_REQUEST,
});

const mediaDetailsSuccess = (data) => ({
  type: mediaActionTypes.MEDIA_DETAILS_SUCCESS,
  payload: data,
});

const mediaDetailsFailure = (err) => ({
  type: mediaActionTypes.MEDIA_DETAILS_FAILURE,
  payload: err,
});



export const getMediaDetails = (mediaParam) => (dispatch) => {
  const id = mediaParam.id;
  const lang = localStorage.getItem("country");
  const mediaType = mediaParam.type;

  const similarFilter = similarData => {
    const similarMovies = similarData;
    const filteredSimilarMovies = similarMovies.filter(movie =>
      movie.backdrop_path !== null && movie.poster_path !== null
    );
    const similar = filteredSimilarMovies.slice(0, 6);
    return similar;
  };



  dispatch(mediaDetailsRequest());

  
  Axios.get(`https://api.themoviedb.org/3/${mediaType}/${id}?language=${lang}&api_key=${APIKey}&append_to_response=videos,similar`)
    .then(res => {
      const initialData = res.data;
      const initialSimilar = similarFilter(initialData.similar.results);

      const titleFiltered = mediaType === 'movie' ? initialData.title : initialData.name;
      const originalTtitleFiltered = mediaType === 'movie' ? initialData.original_title : initialData.original_name;
      const seasonsFiltered = mediaType === 'movie' ? '' : initialData.number_of_seasons;
      const filteredDates = mediaType === 'movie' ? initialData.release_date : '';
      const filteredFirstDate = mediaType === 'tv' ? initialData.first_air_date : '';
      const filteredLastDate = mediaType === 'tv' ? initialData.last_air_date : '';


      const dados = {
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
      };

      dispatch(mediaDetailsSuccess(dados));
    })
    .catch(err => {
      dispatch(mediaDetailsFailure(err.message));
    });

};
