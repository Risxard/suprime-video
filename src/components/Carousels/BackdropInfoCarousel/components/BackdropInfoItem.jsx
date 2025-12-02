import "./styles.css";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { image_path_500 } from "../../../../utils/imagePaths";
import MediaClass from "../../../MediaClass/MediaClass.jsx";
import { useSelector } from "react-redux";
import { dateConverter, genreConverter } from "../../../../utils/converters.js";

const BackdropInfoItem = ({ movie }) => {
  const [isBackdropLoaded, setIsBackdropLoaded] = useState(false);
  const [isContentReady, setIsContentReady] = useState(false);

  useEffect(() => {
    setIsBackdropLoaded(false);
    setIsContentReady(false);

    if (!movie?.backdrop_path) {
      setIsBackdropLoaded(true);
      setIsContentReady(true);
      return;
    }

    const img = new Image();
    img.src = `${image_path_500}${movie.backdrop_path}`;

    if (img.complete) {
      setIsBackdropLoaded(true);
      setIsContentReady(true);
    } else {
      img.onload = () => {
        setIsBackdropLoaded(true);
        setIsContentReady(true);
      };
      img.onerror = () => {
        setIsBackdropLoaded(true);
        setIsContentReady(true);
      };
    }
  }, [movie?.id]);

  if (!movie) return null;

  const backdropSrc = `${image_path_500}${movie?.backdrop_path}`;
  const mediaType = movie.first_air_date ? "tv" : "movie";

  const genreNames =
    movie?.genres?.map((g) =>
      genreConverter(g.id, "pt-BR", mediaType)
    ) ||
    movie?.genre_ids?.map((id) =>
      genreConverter(id, "pt-BR", mediaType)
    ) ||
    [];

  const release_date = movie?.release_date || movie?.first_air_date;
const language = useSelector((state) => state.lang.language);

  return (
    <div className="backdropinfo-item" data-set={isContentReady}>
      <NavLink to={`/detail/${mediaType}/${movie.id}`}>
        <div className="backdropinfo-item-image-container">
          <div className="backdropinfo-item-image">
            {movie.backdrop_path && (
              <img
                src={backdropSrc}
                alt={movie.title || movie.name || ""}
                className={`backdropinfo-image ${
                  isBackdropLoaded ? "visible" : "hidden"
                }`}
                loading="lazy"
              />
            )}
          </div>
        </div>
      </NavLink>

      <NavLink
        to={`/detail/${movie.media_type || mediaType}/${movie.id}`}
        className="backdropinfo-item-info-container"
      >
        <div className="backdropinfo-item-info-title">
          {movie?.title || movie?.name}
        </div>

        <div className="backdropinfo-item-info-details">
          <MediaClass language={language} id={movie.id} mediaType={mediaType} />
          {release_date && dateConverter(release_date)}
          {" • "}
          {genreNames.length > 0 && genreNames.slice(0, 2).join(", ")}
        </div>
      </NavLink>
    </div>
  );
};

export default BackdropInfoItem;
