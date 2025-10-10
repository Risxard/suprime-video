import React, { useEffect, useState } from "react";

import SearchItem from "./Searchitem/SearchItem";
import { useIntersectionObserver } from "../../../hooks/IntersectionObserver/useIntersationObserver";

import { setSectionTitle } from "../../../functions/Converter";

const SearchMediaList = (props) => {
  const [genresToFilter, setGenresToFilter] = useState([]);

  const { filteredMedias } = props;

  return (
    <div>
      {filteredMedias.length > 0 ? (
        <div className="column-container-items">
          <div className="ptext">

          </div>

          <div className="search-card-list">
            {filteredMedias.map((array) => (
              <SearchItem key={array.id} media={array} />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SearchMediaList;
