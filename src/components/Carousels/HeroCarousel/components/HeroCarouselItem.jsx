import { useEffect, useState } from "react";
import {
  image_path_185,
  image_path_342,
  image_path_500,
  image_path_original,
} from "../../../../utils/imagePaths";
import "./HeroCarouselItem.css";
import { tmdbService } from "../../../../services/tmdb/tmdbServices";
import MediaClass from "../../../MediaClass/MediaClass";
import { NavLink } from "react-router-dom";
import { dateConverter, genreConverter } from "../../../../utils/converters";

const HeroCarouselItem = ({ movie, language, active }) => {
  const [posterAndLogo, setPosterAndLogo] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isContentReady, setIsContentReady] = useState(false);

  const [backgroundImage, setBackgroundImage] = useState("");
  const [posterImage, setPosterImage] = useState("");
  const [logoImage, setLogoImage] = useState("");
  const [showLogo, setShowLogo] = useState(false);

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
      } finally {
        setIsLoading(false);
      }
    };

    if (movie && language) {
      fetchLogo();
    }
  }, [movie, language]);

  useEffect(() => {
    if (!movie || isLoading) return;

    const poster_path = posterAndLogo?.poster?.file_path || movie.poster_path;
    const logo_path = posterAndLogo?.logo?.file_path;
    const backdrop_path = movie.backdrop_path;

    const bgImage = backdrop_path
      ? `${image_path_original}${backdrop_path}`
      : `${image_path_500}${poster_path}`;
    const logoImg = logo_path ? `${image_path_342}${logo_path}` : "";
    const posterImg = poster_path ? `${image_path_500}${poster_path}` : "";

    setBackgroundImage(bgImage);
    setPosterImage(posterImg);
    setLogoImage(logoImg);
    setShowLogo(!!logo_path);


    let loadedCount = 0;
    const required = 1 + (logoImg ? 1 : 0);

    const markLoaded = () => {
      loadedCount++;
      if (loadedCount >= required) setIsContentReady(true);
    };

    if (bgImage) {
      const bg = new Image();
      bg.src = bgImage;
      bg.onload = markLoaded;
      bg.onerror = markLoaded;
    } else markLoaded();

    if (logoImg) {
      const lg = new Image();
      lg.src = logoImg;
      lg.onload = markLoaded;
      lg.onerror = markLoaded;
    }
  }, [posterAndLogo, isLoading, movie]);

  if (!movie) return null;

  const release_date = movie?.release_date || movie?.first_air_date;
  const genreNames = (
    movie.genre_ids?.map((id) =>
      genreConverter(id, language, movie.media_type || "movie")
    ) || []
  ).slice(0, 3);

  return (
    <div
      className={`hero-carousel-Item ${active ? "active" : ""}`}
      data-set={isContentReady ? "true" : "false"}
    >
      <NavLink to={`/detail/${movie.media_type}/${movie.id}`}>
        <div className="hero-carousel-Item-Container">
          <div className="hero-carousel-container-image">
            <picture>
              <source
                media="(max-width: 479px)"
                srcSet={`${image_path_342}${posterImage}`}
              />
              <img
                src={backgroundImage}
                alt={movie.title || movie.name || ""}
                className="hero-carousel-background"
                loading="lazy"
              />
            </picture>
          </div>

          <div className="hero-carousel-info-container">
            <div className="hero-carousel-info-content">
              <div className="hero-carousel-info-content-logo">
                {showLogo && logoImage ? (
                  <picture>
                    <source
                      media="(max-width: 479px)"
                      srcSet={`${image_path_185}${posterAndLogo?.logo?.file_path}`}
                    />
                    <img
                      src={logoImage}
                      alt={`${movie.title} logo`}
                      className="hero-carousel-logo"
                      loading="lazy"
                    />
                  </picture>
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
                    {release_date && `${dateConverter(release_date)} • `}
                    {genreNames.join(", ")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </NavLink>
    </div>
  );
};

export default HeroCarouselItem;
