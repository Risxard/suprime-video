import { useEffect, useState } from "react";
import { dateConverter, genreConverter } from "../../../../functions/Converter";
import { tmdbService } from "../../../../services/tmdb/tmdbServices";
import "./styles.css";
import MediaClass from "../../../MediaClass/MediaClass";
import { NavLink } from "react-router-dom";
import CardLabel from "./assets/card-label";
import { image_path_185, image_path_342 } from "../../../../utils/imagePaths";

const PosterCarouselBigItem = ({
  movie,
  language,
  top10mode,
  topNumber,
  card_size = "",
}) => {
  const [posterAndLogo, setPosterAndLogo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isContentReady, setIsContentReady] = useState(false);
  const [posterSrc, setPosterSrc] = useState("");
  const [logoSrc, setLogoSrc] = useState("");
  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    const fetchPosterAndLogo = async () => {
      if (!movie?.id || card_size !== "") return;

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
        setPosterAndLogo(null);
      } finally {
        setIsLoading(false);
      }
    };

    if (movie && language) {
      fetchPosterAndLogo();
    }
  }, [movie, language, card_size]);


  useEffect(() => {
    if (isLoading || !movie) return;

    const poster = posterAndLogo?.poster;
    const logo = posterAndLogo?.logo;
    const isoPoster = poster?.iso_639_1?.toLowerCase() || null;

    let finalPoster = "";
    let finalLogo = "";
    let shouldShowLogo = false;


    if (poster?.file_path) {
      finalPoster = `${image_path_342}${poster.file_path}`;


      if (isoPoster === null || isoPoster === "xx") {
        shouldShowLogo = !!logo?.file_path;
        if (logo?.file_path) {
          finalLogo = `${image_path_185}${logo.file_path}`;
        }
      } else {

        shouldShowLogo = false;
      }
    }


    else if (movie.poster_path) {
      finalPoster = `${image_path_342}${movie.poster_path}`;
      shouldShowLogo = false;
    }


    if (finalPoster) {
      setPosterSrc(finalPoster);
      setLogoSrc(finalLogo);
      setShowLogo(shouldShowLogo);

      const img = new Image();
      img.src = finalPoster;
      img.onload = () => setIsContentReady(true);
      img.onerror = () => setIsContentReady(true);
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
      className="poster-carousel-item"
      data-set={isContentReady ? "true" : "false"}
    >
      <NavLink to={`/detail/${movie.media_type}/${movie.id}`}>
        <div className="poster-carousel-item-container">
          <div className="poster-carousel-item-image">
            {top10mode && <CardLabel topNumber={topNumber} />}

            <img
              src={posterSrc}
              alt={movie.title || movie.name || ""}
              className={`poster-image ${card_size}`}
              loading="lazy"
            />

            {isContentReady && (
              <div className="poster-carousel-item-info">
                <div className="poster-carousel-item-info-logo">
                  {showLogo && logoSrc ? (
                    <img
                      src={logoSrc}
                      alt={`${movie.title || movie.name} logo`}
                      className="logo-image"
                    />
                  ) : (
                    <div className="poster-info-content-logo-title">
                      {movie.title || movie.name}
                    </div>
                  )}
                </div>

                <div className="poster-carousel-item-info-text">
                  <MediaClass
                    language={language}
                    id={movie.id}
                    mediaType={movie.media_type}
                  />
                  <span className="poster-carousel-text-content">
                    {release_date &&
                      `${dateConverter(release_date)} ${
                        !top10mode ? "•" : ""
                      } `}
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

const PosterCarouselMediumItem = ({ movie }) => {
  const [isPosterLoaded, setIsPosterLoaded] = useState(false);

  useEffect(() => {
    setIsPosterLoaded(false);

    if (movie?.poster_path) {
      const img = new Image();
      img.src = `${image_path_342}${movie.poster_path}`;
      if (img.complete) {
        setIsPosterLoaded(true);
      }
    }
  }, [movie?.id]);

  if (!movie) return null;

  const posterSrc = `${image_path_342}${movie.poster_path}`;

  const isContentReady = isPosterLoaded;

  return (
    <div className="poster-carousel-item" data-set={isContentReady}>
      <NavLink to={`/detail/${movie.media_type}/${movie.id}`}>
        <div className="poster-carousel-item-container">
          <div className="poster-carousel-item-image">
            {movie.poster_path && (
              <img
                src={posterSrc}
                alt={movie.title || movie.name || ""}
                className={`poster-image sm-card`}
                onLoad={() => setIsPosterLoaded(true)}
                onError={() => setIsPosterLoaded(true)}
                loading="lazy"
              />
            )}
          </div>
        </div>
      </NavLink>
    </div>
  );
};

const PosterCarouselSmallItem = ({ movie }) => {
  const [isPosterLoaded, setIsPosterLoaded] = useState(false);

  useEffect(() => {
    setIsPosterLoaded(false);

    if (movie?.poster_path) {
      const img = new Image();
      img.src = `${image_path_342}${movie.poster_path}`;
      if (img.complete) {
        setIsPosterLoaded(true);
      }
    }
  }, [movie?.id]);

  if (!movie) return null;

  const posterSrc = `${image_path_342}${movie.poster_path}`;

  const isContentReady = isPosterLoaded;

  return (
    <div className="poster-carousel-item" data-set={isContentReady}>
      <NavLink to={`/detail/${movie.media_type}/${movie.id}`}>
        <div className="poster-carousel-item-container">
          <div className="poster-carousel-item-image">
            {movie.poster_path && (
              <img
                src={posterSrc}
                alt={movie.title || movie.name || ""}
                className={`poster-image ss-card`}
                onLoad={() => setIsPosterLoaded(true)}
                onError={() => setIsPosterLoaded(false)}
                loading="lazy"
              />
            )}
          </div>
        </div>
      </NavLink>
    </div>
  );
};

const PosterCarouselItem = ({
  movie,
  language,
  top10mode,
  topNumber,
  card_size = "",
}) => {
  if (card_size === "sm-card") {
    return <PosterCarouselMediumItem movie={movie} />;
  } else if (card_size === "ss-card") {
    return <PosterCarouselSmallItem movie={movie} />;
  } else {
    return (
      <PosterCarouselBigItem
        movie={movie}
        top10mode={top10mode}
        topNumber={topNumber}
        language={language}
      />
    );
  }
};

export default PosterCarouselItem;
