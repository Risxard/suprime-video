import React from "react";
import "../styles.css";
import BackdropSlider from "../../../components/Sliders/BackdropSlider/BackdropSlider";
import usePerGenre from "../../../hooks/ApiCalls/usePerGenres/usePerGenres";

const GenreList = ({ language, genreId, filter, sectionTitles }) => {
  // Configurações de listas que queremos renderizar
  const lists = [
    {
      key: "movies",
      enabled: filter === 1 || filter === 2,
      title: sectionTitles.movies,
      params: {
        pageType: "movie",
        language,
        with_genres: genreId,
        sort_by: "popularity.desc",
        page: 1,
      },
    },
    {
      key: "tv",
      enabled: filter === 1 || filter === 3,
      title: sectionTitles.tvShows,
      params: {
        pageType: "tv",
        language,
        with_genres: genreId,
        sort_by: "popularity.desc",
        page: 1,
      },
    },
    {
      key: "popularMovies",
      enabled: filter === 1 || filter === 2,
      title: sectionTitles.popularMovies,
      params: {
        pageType: "movie",
        language,
        with_genres: genreId,
        sort_by: "revenue.desc",
        page: 2,
      },
    },
    {
      key: "popularTv",
      enabled: filter === 1 || filter === 3,
      title: sectionTitles.popularTvShows,
      params: {
        pageType: "tv",
        language,
        with_genres: genreId,
        sort_by: "vote_count.desc",
        page: 2,
      },
    },
  ];

  return (
    <>
      {lists.map(
        ({ key, enabled, title, params }) =>
          enabled && <GenreSection key={key} title={title} params={params} />
      )}
    </>
  );
};

// Componente isolado para cada seção
const GenreSection = ({ title, params }) => {
  const { data, loading, error } = usePerGenre(params);

  if (loading) return;
  if (error) return;

  return <BackdropSlider sectionTitle={title} medias={data} />;
};

export default GenreList;
