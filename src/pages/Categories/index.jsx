import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import "./styles.css";
import GenreList from "./Components/GenreList";
import { genreConverter } from "../../functions/Converter";
import i18next from "i18next";
import { useTranslation } from "react-i18next";

const Categories = () => {
  const [filter, setFilter] = useState(1);
  const { genreId } = useParams();
  const language = i18next.language;
  const CategoriesName = genreConverter(parseInt(genreId), language, "movie");

  const handleSetFilter = (filter) => {
    setFilter(filter);
  };

  const { t } = useTranslation();
  const categoriesPage = t("categoriesPage");
  const { buttons, sectionTitles } = categoriesPage;

  return (
    <div className="CategoriesPage">
      <h1>{CategoriesName}</h1>
      <div>
        <ul>
          <li
            onClick={() => handleSetFilter(1)}
            className={filter === 1 ? "filter-active" : ""}
          >
            <p>{buttons.all}</p>
          </li>

          <li
            onClick={() => handleSetFilter(2)}
            className={filter === 2 ? "filter-active" : ""}
          >
            <p>{buttons.movies}</p>
          </li>

          <li
            onClick={() => handleSetFilter(3)}
            className={filter === 3 ? "filter-active" : ""}
          >
            <p>{buttons.tvShows}</p>
          </li>
        </ul>
      </div>

      <GenreList
        language={language}
        genreId={genreId}
        filter={filter}
        sectionTitles={sectionTitles}
      />
    </div>
  );
};

export default Categories;
