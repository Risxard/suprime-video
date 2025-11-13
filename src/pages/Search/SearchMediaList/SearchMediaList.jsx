import React from "react";
import BackdropInfoItem from "../../../components/Carousels/BackdropInfoCarousel/components/BackdropInfoItem";
import "./styles.css";

const SearchMediaList = ({ medias }) => {
  return (
    <div>
      {medias.length > 0 ? (
        <div className="column-container-items">
          <div className="search-card-list">
            {medias.map((array) => (
              <BackdropInfoItem key={array.id} movie={array} />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default React.memo(SearchMediaList);
