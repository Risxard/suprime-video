import { Link } from "react-router-dom";
import { image_path_342, image_path_500 } from "../../../utils/imagePaths";
import "./styles.css";
import { runtimeConverter } from "../../../functions/Converter";

const DetailCardList = ({ cards }) => {
  if (!cards || cards.length === 0) return null;

  const validCards = cards;


  console.log(validCards)

  return (
    <div className="detail-card-list">
      {validCards.map((card, index) => {
        const mediaType = card.first_air_date ? "tv" : "movie";

        return (
          <div key={index} className="detail-card-item">
            <Link to={`/detail/${mediaType}/${card.id}`}>
              <div className="detail-card-item-image-container">
                <div className="detail-card-item-image">
                  {card.still_path && (
                    <picture>
                      <source
                        media="(min-width: 768px)"
                        srcSet={`${image_path_500}${card.still_path}`}
                      />

                      <img
                        src={`${image_path_342}${card.still_path}`}
                        alt={card?.title || card?.name || "Card"}
                      />
                    </picture>
                  )}
                </div>
              </div>
              <div className="detail-card-item-title-container">
                <div>{`${card.episode_number}. ${card.name}`}</div>
              </div>
              <div className="detail-card-item-overview-container">
                {card.overview}
              </div>
              <div className="detail-card-item-info-container">
                <div className="detail-card-item-info-runtime">
                  {card.runtime && <p>{`${card.runtime}min`}</p>}
                </div>
                <div className="detail-card-item-info-rating"></div>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default DetailCardList;
