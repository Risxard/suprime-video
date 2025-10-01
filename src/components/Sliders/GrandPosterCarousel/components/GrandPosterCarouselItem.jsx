import { useEffect, useState } from "react";
import { dateConverter, genreConverter } from "../../../../functions/Converter";
import { tmdbService } from "../../../../services/tmdb/tmdbServices";
import "./GrandPosterCarouselItem.css";
import MediaClass from "../../../MediaClass/MediaClass";
import { NavLink } from "react-router-dom";

const GrandPosterCarouselItem = ({ movie, language }) => {
  const [posterAndLogo, setPosterAndLogo] = useState({});

  const image_path = "https://image.tmdb.org/t/p/original";

  useEffect(() => {
    const fetchLogo = async () => {
      if (!movie?.id) return;
      try {
        const res = await tmdbService.fetchPosterAndLogo({
          mediaId: movie.id,
          mediaType: movie.media_type || "movie",
          language: language || "pt-BR",
          originalLanguage: movie.original_language || "en",
        });

        setPosterAndLogo(res);
      } catch (err) {
        console.error("Erro ao buscar logo TMDB:", err);
      }
    };

    if (movie && language) {
      fetchLogo();
    }
  }, [movie, language]);

  if (!movie) return null;

  const release_date = movie?.release_date
    ? movie?.release_date
    : movie?.first_date;

  const genreNames = (
    movie.genre_ids?.map((id) =>
      genreConverter(id, language, movie.media_type || "movie")
    ) || []
  ).slice(0, 3);

  return (
    <div className="grandPoster-carousel-item">
      <NavLink to={`/detail/${movie.media_type}/${movie.id}`}>
        <div className="grandPoster-carousel-item-container">
          <div className="grandPoster-carousel-item-image">
            {posterAndLogo?.poster?.file_path ? (
              <img
                src={`${image_path}${posterAndLogo?.poster?.file_path}`}
                alt={movie.title || ""}
              />
            ) : null}

            <div className="grandPoster-carousel-item-info">
              <div className="grandPoster-carousel-item-info-logo">
                {posterAndLogo?.logo?.file_path &&
                posterAndLogo?.logo?.iso_3166_1 == null ? (
                  <img
                    src={`${image_path}${posterAndLogo?.logo?.file_path}`}
                    alt={`${movie.title} logo`}
                  />
                ) : (
                  <div className="hero-carousel-info-content-logo-title">
                    {movie.title || movie.name}
                  </div>
                )}
              </div>
              <div className="grandPoster-carousel-item-info-text">
                <MediaClass
                  language={language}
                  id={movie.id}
                  mediaType={movie.media_type}
                />
                <span className="grandPoster-carousel-text-content">
                  {release_date && `${dateConverter(release_date)} • `}
                  {genreNames.join(", ")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </NavLink>
    </div>
  );
};

export default GrandPosterCarouselItem;
