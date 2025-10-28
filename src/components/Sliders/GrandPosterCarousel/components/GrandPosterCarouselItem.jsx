import { useEffect, useState } from "react";
import { dateConverter, genreConverter } from "../../../../functions/Converter";
import { tmdbService } from "../../../../services/tmdb/tmdbServices";
import "./GrandPosterCarouselItem.css";
import MediaClass from "../../../MediaClass/MediaClass";
import { NavLink } from "react-router-dom";
import CardLabel from "./assets/card-label";
import { image_path_342, image_path_500 } from "../../../../utils/imagePaths";

const GrandPosterCarouselItem = ({ movie, language, top10mode, topNumber, smallPoster }) => {
  const [posterAndLogo, setPosterAndLogo] = useState({});

  useEffect(() => {
    const fetchLogo = async () => {
      if (!movie?.id || smallPoster) return;
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
  }, [movie, language, smallPoster]);

  if (!movie) return null;

  const release_date = movie?.release_date || movie?.first_date;

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
            {top10mode && <CardLabel topNumber={topNumber} />}

            <img
              src={
                smallPoster
                  ? `${image_path_500}${movie.poster_path}`
                  : `${image_path_500}${posterAndLogo?.poster?.file_path || movie.poster_path}`
              }
              alt={movie.title || ""}
            />


            {!smallPoster && (
              <div className="grandPoster-carousel-item-info">
                <div className="grandPoster-carousel-item-info-logo">
                  {posterAndLogo?.logo?.file_path &&
                  (posterAndLogo?.poster?.iso_639_1 == "xx" ||
                    posterAndLogo?.poster?.iso_639_1 == null) ? (
                    <img
                      src={`${image_path_342}${posterAndLogo?.logo?.file_path}`}
                      alt={`${movie.title} logo`}
                    />
                  ) : (
                    <div className="grandPoster-info-content-logo-title">
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
                    {release_date &&
                      `${dateConverter(release_date)} ${!top10mode ? "•" : ""} `}

                    {!top10mode && genreNames.join(", ")}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </NavLink>
    </div>
  );
};

export default GrandPosterCarouselItem;
