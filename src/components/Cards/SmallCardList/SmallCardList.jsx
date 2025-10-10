import { Link } from "react-router-dom";
import { image_path_342, image_path_500 } from "../../../utils/imagePaths";
import "./styles.css";

const SmallCardList = ({ medias }) => {
  if (!medias || medias.length === 0) return null;

  const validMedias = medias.filter((media) => media.backdrop_path);

  return (
    <div className="small-card-list">
      {validMedias.map((media) => {
        const mediaType = media.first_air_date ? "tv" : "movie";

        return (
          <div key={media.id} className="small-card-item">
            <Link to={`/detail/${mediaType}/${media.id}`}>
              <div className="small-card-item-image-container">
                <div className="small-card-item-image">
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
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default SmallCardList;
