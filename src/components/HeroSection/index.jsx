import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { tmdbService } from "../../services/tmdb/tmdbServices";
import "./styles.css";
import {
  image_path_342,
  image_path_original,
  image_path_500,
} from "../../utils/imagePaths";
import MediaClass from "../MediaClass/MediaClass";
import { NavLink } from "react-router-dom";
import { dateConverter, genreConverter } from "../../utils/converters";

const HeroSection = ({ mediaType = "movie", movies, language = "pt" }) => {
  const { t, i18n } = useTranslation();

  const [posterAndLogo, setPosterAndLogo] = useState({});
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isContentReady, setIsContentReady] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState("");
  const [logoImage, setLogoImage] = useState("");


  useEffect(() => {
    if (language && i18n.language !== language) {
      i18n.changeLanguage(language);
    }
  }, [language, i18n]);


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
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosterAndLogo();
  }, [movies, mediaType, language]);

  useEffect(() => {
    if (isLoading || !movies) return;

    const logo_path = posterAndLogo?.logo?.file_path;
    const poster_path = posterAndLogo?.poster?.file_path;
    const backdrop_path = movies.backdrop_path;

    const bgImage = isMobile
      ? poster_path
        ? `${image_path_500}${poster_path}`
        : `${image_path_500}${movies.poster_path}`
      : backdrop_path
      ? `${image_path_original}${backdrop_path}`
      : poster_path
      ? `${image_path_original}${poster_path}`
      : "";

    const logoImg = logo_path ? `${image_path_342}${logo_path}` : "";

    setBackgroundImage(bgImage);
    setLogoImage(logoImg);

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
  }, [posterAndLogo, isLoading, movies, isMobile]);

  if (!movies) return null;

  const title = movies.title || movies.name;
  const release_date = movies.release_date || movies.first_air_date || "";
  const genres = movies.genres || [];
  const overview = movies.overview || "";

  const genreNames = genres
    .map((genre) => genreConverter(genre.id, language, mediaType))
    .slice(0, 3);

  return (
    <div className="hero-section" data-set={isContentReady ? "true" : "false"}>
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
          {logoImage && (
            <img
              src={logoImage}
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
              {t("hero-section.buttons.play")}
            </NavLink>

            <NavLink to={`/detail/${mediaType}/${movies.id}`}>
              {t("hero-section.buttons.details")}
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
