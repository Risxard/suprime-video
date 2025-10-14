import { Link } from "react-router-dom";
import "./styles.css";
import { image_path_342, image_path_500 } from "../../../../utils/imagePaths";
import { dateConverter, genreConverter } from "../../../../functions/Converter";

const SearchItem = ({ media }) => {
  const mediaType = media.first_air_date ? "tv" : "movie";

  const genreNames =
    media?.genres?.map((g) =>
      genreConverter(g.id, "pt-BR", mediaType || "movie")
    ) ||
    media?.genre_ids?.map((id) =>
      genreConverter(id, "pt-BR", mediaType || "movie")
    ) ||
    [];


  const release_date = media?.release_date || media?.first_air_date;

  return (
    <div key={media.id} className="search-card-item">
      <Link to={`/detail/${mediaType}/${media.id}`}>
        <div className="search-card-item-image-container">
          <div className="search-card-item-image">
            <picture>
              <source
                media="(min-width: 768px)"
                srcSet={`${image_path_500}${media.backdrop_path}`}
              />

              <img
                src={`${image_path_342}${media.backdrop_path}`}
                alt={media?.title || media?.name || "Card"}
              />
            </picture>
          </div>
        </div>

        <div className="search-card-item-info-container">
          <div className="search-card-item-info-title">
            {media?.title || media?.name}
          </div>

          <div className="search-card-item-info-details">
            {release_date && dateConverter(release_date)}
            {" • "}
            {genreNames.length > 0 && genreNames.slice(0, 2).join(", ")}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default SearchItem;
