import { useEffect, useState } from "react";

import { image_path } from "../../../../utils/sliderMaps";
import "./HeroCarouselItem.css";
import { tmdbService } from "../../../../services/tmdb/tmdbServices";

const HeroCarouselItem = ({ movie, language }) => {
  const [logoUrl, setLogoUrl] = useState(null);

  useEffect(() => {
    const fetchLogo = async () => {
      if (!movie?.id) return;
      try {
        const res = await tmdbService.fetchMediaLogoImage({
          mediaId: movie.id,
          mediaType: movie.media_type || "movie",
          language: language || "pt-BR",
          originalLanguage: movie.original_language || "en",
        });



        const logosArray = res.logos || res;
        if (logosArray?.length > 0) {
          const filePath = logosArray[0].file_path;

          console.log('hh')
          setLogoUrl(`https://image.tmdb.org/t/p/w500${filePath}`);
        }
      } catch (err) {
        console.error("Erro ao buscar logo TMDB:", err);
      }
    };

    fetchLogo();
  }, [movie, language]);

  if (!movie) return null;

  return (
    <div className="hero-carousel-Item">
      <a href="">
        <div className="hero-carousel-Item-Container">
          <div className="hero-carousel-container-image">
            <img
              src={`${image_path}${movie.backdrop_path}`}
              alt={movie.title || ""}
            />
          </div>

          <div className="hero-carousel-info-container">
            <div className="hero-carousel-info-content">
              <div className="hero-carousel-info-content-logo">
                {logoUrl ? (
                  <img src={logoUrl} alt={`${movie.title} logo`} />
                ) : (
                  <img src="https://placehold.co/400" alt="logo placeholder" />
                )}
              </div>
            </div>

            <div className="channel-logo">
              <img
                src="https://disney.images.edge.bamgrid.com/ripcut-delivery/v2/variant/disney/21d4cb22-e48e-4b8a-a618-ceeb9d4b67b0/compose?format=webp&width=480"
                alt="channel logo espn"
              />
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};

export default HeroCarouselItem;
