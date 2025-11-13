import "./styles.css";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { image_path_500 } from "../../../../utils/imagePaths";
import { dateConverter, genreConverter } from "../../../../functions/Converter";

const BackdropInfoItem = ({ movie }) => {
  const [isBackdropLoaded, setIsBackdropLoaded] = useState(false);

  useEffect(() => {
    setIsBackdropLoaded(false);

    if (movie?.backdrop_path) {
      const img = new Image();
      img.src = `${image_path_500}${movie.backdrop_path}`;
      if (img.complete) {
        setIsBackdropLoaded(true);
      }
    }
  }, [movie?.id]);

  if (!movie) return null;

  const backdropSrc = `${image_path_500}${movie?.backdrop_path}`;

  const mediaType = movie.first_air_date ? "tv" : "movie";

  const genreNames =
    movie?.genres?.map((g) =>
      genreConverter(g.id, "pt-BR", mediaType || "movie")
    ) ||
    movie?.genre_ids?.map((id) =>
      genreConverter(id, "pt-BR", mediaType || "movie")
    ) ||
    [];

  const release_date = movie?.release_date || movie?.first_air_date;

  return (
    <div className="backdropinfo-item">
      <NavLink to={`/detail/${movie.media_type}/${movie.id}`}>
        <div className="backdropinfo-item-image-container">
          <div className="backdropinfo-item-image">
            {movie.backdrop_path && (
              <img
                src={backdropSrc}
                alt={movie.title || movie.name || ""}
                className={`backdropinfo-image ${
                  isBackdropLoaded ? "visible" : "hidden"
                }`}
                onLoad={() => setIsBackdropLoaded(true)}
                onError={() => setIsBackdropLoaded(true)}
                loading="lazy"
              />
            )}
          </div>
        </div>
      </NavLink>

      <NavLink
        to={`/detail/${movie.media_type}/${movie.id}`}
        className="backdropinfo-item-info-container"
      >
        <div className="backdropinfo-item-info-title">
          {movie?.title || movie?.name}
        </div>

        <div className="backdropinfo-item-info-details">
          {release_date && dateConverter(release_date)}
          {" • "}
          {genreNames.length > 0 && genreNames.slice(0, 2).join(", ")}
        </div>
      </NavLink>
    </div>
  );
};

export default BackdropInfoItem;
