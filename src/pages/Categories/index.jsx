import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import "./styles.css";
import GenreList from "./Components/GenreList";
import { genreConverter } from "../../functions/Converter";

const Categories = () => {
  const [filter, setFilter] = useState(1);
  const { genreId } = useParams();
  const language = useSelector((state) => state.lang.language);
  const CategoriesName = genreConverter(parseInt(genreId), language, "movie");

  const handleSetFilter = (filter) => {
    setFilter(filter);
  };

  return (
    <div className="CategoriesPage">
      <h1>{CategoriesName}</h1>
      <div>
        <ul>
          <li
            onClick={() => handleSetFilter(1)}
            className={filter === 1 ? "filter-active" : ""}
          >
            <p>All</p>
          </li>

          <li
            onClick={() => handleSetFilter(2)}
            className={filter === 2 ? "filter-active" : ""}
          >
            <p>Movies</p>
          </li>

          <li
            onClick={() => handleSetFilter(3)}
            className={filter === 3 ? "filter-active" : ""}
          >
            <p>TV shows</p>
          </li>
        </ul>
      </div>

      <GenreList language={language} genreId={genreId} filter={filter} />
    </div>
  );
};

export default Categories;
