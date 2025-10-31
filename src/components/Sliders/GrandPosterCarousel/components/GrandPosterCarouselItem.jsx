import { useEffect, useState } from "react";
import { dateConverter, genreConverter } from "../../../../functions/Converter";
import { tmdbService } from "../../../../services/tmdb/tmdbServices";
import "./GrandPosterCarouselItem.css";
import MediaClass from "../../../MediaClass/MediaClass";
import { NavLink } from "react-router-dom";
import CardLabel from "./assets/card-label";
import { image_path_342, image_path_500 } from "../../../../utils/imagePaths";

const GrandPosterCarouselItem = ({
  movie,
  language,
  top10mode,
  topNumber,
  card_size = "",
}) => {
  const [posterAndLogo, setPosterAndLogo] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [posterPath, setPosterPath] = useState("");

  useEffect(() => {
    const fetchPosterAndLogoData = async () => {
      if (!movie?.id) return;

      try {
        const langToUse = card_size === "" ? "pt-BR" : language || "pt-BR";

        const res = await tmdbService.fetchPosterAndLogo({
          mediaId: movie.id,
          mediaType: movie.media_type || "movie",
          language: langToUse,
          originalLanguage: movie.original_language || "en",
        });

        setPosterAndLogo(res);

        if (res?.poster?.file_path) {
          setPosterPath(`${image_path_500}${res.poster.file_path}`);
        } else {
          setPosterPath(""); 
        }
      } catch (err) {
        console.error("Erro ao buscar logo/poster:", err);
        setPosterPath("");
      }
    };

    fetchPosterAndLogoData();
  }, [movie, language, card_size]);

  if (!movie) return null;

  const release_date = movie?.release_date || movie?.first_air_date || "";
  const genreNames =
    (
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

            {posterPath && (
              <img
                src={posterPath}
                alt={movie.title || movie.name || ""}
                className={`grandPoster-image ${card_size} ${
                  isLoaded ? "loaded" : "loading"
                }`}
                onLoad={() => setIsLoaded(true)}
                loading="lazy"
              />
            )}

            {card_size === "" && (
              <div className="grandPoster-carousel-item-info">
                <div className="grandPoster-carousel-item-info-logo">
                  {posterAndLogo?.logo?.file_path ? (
                    <img
                      src={`${image_path_342}${posterAndLogo.logo.file_path}`}
                      alt={`${movie.title || movie.name} logo`}
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

export default GrandPosterCarouselItem;
