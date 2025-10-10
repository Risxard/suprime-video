import { useEffect, useState } from "react";

import {
  image_path_342,
  image_path_500,
  image_path_original,
} from "../../../../utils/imagePaths";
import "./HeroCarouselItem.css";
import { tmdbService } from "../../../../services/tmdb/tmdbServices";
import MediaClass from "../../../MediaClass/MediaClass";
import { dateConverter, genreConverter } from "../../../../functions/Converter";
import logo from "../../../../assets/acaiwaveLogo.png";
import { NavLink } from "react-router-dom";

const HeroCarouselItem = ({ movie, language, active }) => {
  const [posterAndLogo, setPosterAndLogo] = useState({});

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
    <div className={`${active ? "active" : ""} hero-carousel-Item`}>
      <NavLink to={`/detail/${movie.media_type}/${movie.id}`}>
        <div className="hero-carousel-Item-Container">
          <div className="hero-carousel-container-image">
            <picture>
              <source
                media="(max-width: 479px)"
                srcSet={`${image_path_500}${posterAndLogo?.poster?.file_path}`}
              />
              <img
                src={`${image_path_original}${movie.backdrop_path}`}
                alt={movie.title || ""}
              />
            </picture>
          </div>

          <div className="hero-carousel-info-container">
            <div className="hero-carousel-info-content">
              <div className="hero-carousel-info-content-logo">
                {posterAndLogo?.logo?.file_path ? (
                  <img
                    src={`${image_path_342}${posterAndLogo?.logo?.file_path}`}
                    alt={`${movie.title} logo`}
                  />
                ) : (
                  <div className="hero-carousel-info-content-logo-title">
                    {movie.title || movie.name}
                  </div>
                )}
              </div>
              <div className="hero-carousel-info-content-text">
                <div className="hero-carousel-info-content-text-1">
                  {movie.original_title || movie.original_name}
                </div>
                <div className="hero-carousel-info-content-text-2">
                  <MediaClass
                    language={language}
                    id={movie.id}
                    mediaType={movie.media_type}
                  />
                  <span className="text-2-span">
                    {release_date && `${dateConverter(release_date)} •`}{" "}
                    {genreNames.join(", ")}
                  </span>
                </div>
              </div>
            </div>

            {/* <div className="channel-logo">
              <img
                src={logo}
                alt="channel logo espn"
              />
            </div> */}
          </div>
        </div>
      </NavLink>
    </div>
  );
};

export default HeroCarouselItem;
