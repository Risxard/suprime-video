import api from "../api";

export const tmdbService = {
  fetchTrending: async ({ timeWindow, pageType, language, page }) => {
    const { data } = await api.get("/api/tmdb/trending", {
      params: { timeWindow, pageType, language, page },
    });
    return data;
  },
  fetchMediaDetails: async ({ mediaType, mediaId, language }) => {

    const { data } = await api.get("/api/tmdb/mediadetails", {
      params: { mediaType, mediaId, language },
    });


    return data;
  },
  fetchRecommendations: async ({ mediaType, mediaId, language, page }) => {
    const { data } = await api.get("/api/tmdb/recommendations", {
      params: { mediaType, mediaId, language, page },
    });
    return data;
  },
  fetchNowPlaying: async ({ pageType, language, region, page }) => {
    const { data } = await api.get("/api/tmdb/now_playing", {
      params: { pageType, language, region, page },
    });
    return data;
  },
  fetchPerGenres: async ({ pageType, language, with_genres, without_genres, sort_by, page }) => {
    const { data } = await api.get("/api/tmdb/perGenres", {
      params: { pageType, language, with_genres, without_genres, sort_by, page },
    });
    return data;
  },


  fetchVideoKey: async ({ mediaType, mediaId, language, originalLanguage }) => {
    const { data } = await api.get("/api/tmdb/video", {
      params: { mediaType, mediaId, language, originalLanguage },
    });
    return data;
  },

  fetchMediaLogoImage: async ({ mediaId, mediaType, language, originalLanguage }) => {
    const { data } = await api.get("/api/tmdb/images/logos", {
      params: { mediaId, mediaType, language, originalLanguage },
    });
    return data;
  },
  fetchSearchMulti: async ({ query, language, page }) => {
    const { data } = await api.get("/api/tmdb/search/multi", {
      params: { query, language, page },
    });
    return data;
  },
  fetchSearchPerson: async ({ person_id, language, page }) => {
    const { data } = await api.get("/api/tmdb/search/person", {
      params: { person_id, language, page },
    });
    return data;
  },
  fetchGenres: async ({ pageType, language }) => {
    const { data } = await api.get("/api/tmdb/genres", {
      params: { pageType, language },
    });
    return data;
  },
  fetchClassification: async ({ mediaType, mediaId, language }) => {
    const { data } = await api.get("/api/tmdb/classification", {
      params: { mediaType, mediaId, language },
    });
    return data;
  }
};

