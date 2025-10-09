import { Link } from "react-router-dom";
import { image_path_342 } from "../../../utils/imagePaths";
import "./styles.css";

const HeroCardList = ({ cards }) => {
  if (!cards || cards.length === 0) return null;


  const validCards = cards.filter((card) => card.backdrop_path);

  return (
    <div className="hero-card-list">
      {validCards.slice(0, 8).map((card) => {
        const mediaType = card.first_air_date ? "tv" : "movie";

        return (
          <div key={card.id} className="hero-card-item">
            <Link to={`/detail/${mediaType}/${card.id}`}>
              <div className="hero-card-item-image-container">
                <div className="hero-card-item-image">
                  <img
                    src={`${image_path_342}${card.backdrop_path}`}
                    alt={card?.title || card?.name || "Card"}
                  />
                </div>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default HeroCardList;
