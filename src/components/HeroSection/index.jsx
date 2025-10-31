import React, { useEffect, useState } from "react";
import { tmdbService } from "../../services/tmdb/tmdbServices";
import "./styles.css";
import {
  image_path_342,
  image_path_original,
  image_path_500,
} from "../../utils/imagePaths";
import MediaClass from "../MediaClass/MediaClass";
import { dateConverter, genreConverter } from "../../functions/Converter";
import { NavLink } from "react-router-dom";

const HeroSection = ({
  mediaType = "movie",
  movies,
  language = "pt-BR",
}) => {
  const [posterAndLogo, setPosterAndLogo] = useState({});
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 480);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchPosterAndLogo = async () => {
      if (!movies?.id) return;
      try {
        const data = await tmdbService.fetchPosterAndLogo({
          mediaId: movies.id,
          mediaType,
          language,
          originalLanguage: movies.original_language || "en",
        });
        setPosterAndLogo(data);
      } catch (error) {
        console.error("Erro ao buscar poster/logo:", error);
      }
    };

    fetchPosterAndLogo();
  }, [movies, mediaType, language]);

  if (!movies) return null;

  const title = movies.title || movies.name;
  const release_date =
    movies.release_date || movies.first_air_date || "";
  const genres = movies.genres || [];
  const overview = movies.overview || "";

  const logo_path = posterAndLogo?.logo?.file_path;
  const poster_path = posterAndLogo?.poster?.file_path;
  const backdrop_path = movies.backdrop_path;

  const genreNames = genres
    .map((genre) => genreConverter(genre.id, language, mediaType))
    .slice(0, 3);

  const backgroundImage = isMobile
    ? `${image_path_500}${poster_path}`
    : `${image_path_original}${backdrop_path}`;

  return (
    <div className="hero-section">
      <div className="hero-section-background">
        <div className="hero-section-image">
          {backgroundImage && (
            <img src={backgroundImage} alt={`${title} background`} />
          )}
          <span className="hero-filter" />
        </div>
      </div>

      <div className="hero-section-content-wrapper">
        <div className="hero-section-info-content">
          {logo_path && (
            <img
              src={`${image_path_342}${logo_path}`}
              alt={`${title} logo`}
              className="hero-section-info-content-logo"
            />
          )}

          <span className="hero-carousel-info-content-text-2">
            <MediaClass
              language={language}
              id={movies.id}
              mediaType={mediaType}
            />
            <span className="text-2-span">
              {release_date && `${dateConverter(release_date)} • `}
              {genreNames.join(", ")}
            </span>
          </span>

          {overview && (
            <div className="hero-section-info-content-text">{overview}</div>
          )}

          <div className="hero-section-info-content-actions">
            <NavLink
              to={`/detail/${mediaType}/${movies.id}/play`}
              style={{ display: `${mediaType === "tv" ? "none" : "flex"}` }}
            >
              <svg
                fill="currentColor"
                aria-hidden="true"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M17.7642 7.86385C18.7453 8.36366 18.7453 9.63634 17.7642 10.1361L2.66343 17.8289C1.69706 18.3212 0.5 17.6925 0.5 16.6927V1.30727C0.5 0.307478 1.69706 -0.321171 2.66343 0.171123L17.7642 7.86385Z"
                ></path>
              </svg>
              Assistir
            </NavLink>

            <NavLink to={`/detail/${mediaType}/${movies.id}`}>
              Detalhes
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
