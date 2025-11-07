import "./styles.css";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { image_path_500 } from "../../../../utils/imagePaths";

const BackdropItem = ({ movie }) => {
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

  return (
    <div className="backdrop-item">
      <NavLink to={`/detail/${movie.media_type}/${movie.id}`}>
        <div className="backdrop-item-content">
          <div className="backdrop-item-image">
            {movie.backdrop_path && (
              <img
                src={backdropSrc}
                alt={movie.title || movie.name || ""}
                className={`backdrop-image ${
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
    </div>
  );
};

export default BackdropItem;
