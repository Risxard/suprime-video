import React, { useState, useEffect } from "react";

import "./styles.css";
import { getPerGenres } from "../../Services/callFunctions/getPerGenres";
import SearchMediaList from "../Search/SearchMediaList/SearchMediaList";
import SearchItem from "../Search/SearchMediaList/Searchitem/SearchItem";
import { connect } from "react-redux";
import { ChevronDown, Square } from "lucide-react";

import { toggleFilterChecked } from "./scripts/watchlistScript";

const WatchList = (props) => {
  const [medias, setMedias] = useState([]);

  const mostRecentSort = "Most recent addition";
  const azSort = "Title: A - Z";
  const zaSort = "Title: Z - A";
  const [mediaSort, setMediaSort] = useState(mostRecentSort);

  const sectionTitle = "The week's most popular";
  const idParam = 58;
  const language = props.language;
  const filterMode = "trending";
  const filterScope = "all";
  const timeWindow = "week";

  const SectionData = {
    sectionTitle,
    idParam,
    language,
    filterMode,
    filterScope,
    timeWindow,
  };

  async function getMedias(SectionData) {
    const mediasArray = await getPerGenres(SectionData);
    setMedias(mediasArray.slice(0, 20));
  }
  useEffect(() => {
    getMedias(SectionData);
  }, [language]);

  return (
    <div className="watchlistPage">
      <h1>Watchlist</h1>

      <div className="filter-watchlist">
        <div className="filters-btns-container">
          <div className="inner-btn">
            <button className="filter-btn">All</button>
          </div>
          <div className="inner-btn">
            <button className="filter-btn">Movies</button>
          </div>
          <div className="inner-btn">
            <button className="filter-btn">TV shows</button>
          </div>
        </div>

        <div className="inner-btn content-type-filter">
          <button className="filter-btn" onClick={() => toggleFilterChecked(2)}>
            {mediaSort}
            <ChevronDown />
          </button>
          <ul>
            <li
              onClick={() => {
                setMediaSort(mostRecentSort);
                toggleFilterChecked(2);
              }}
              className={`${
                mediaSort === mostRecentSort ? "selected-filter" : ""
              }`}
            >
              {mostRecentSort}
            </li>
            <li
              onClick={() => {
                setMediaSort(azSort);
                toggleFilterChecked(2);
              }}
              className={`${mediaSort === azSort ? "selected-filter" : ""}`}
            >
              {azSort}
            </li>
            <li
              onClick={() => {
                setMediaSort(zaSort);
                toggleFilterChecked(2);
              }}
              className={`${mediaSort === zaSort ? "selected-filter" : ""}`}
            >
              {zaSort}
            </li>
          </ul>
        </div>
      </div>
      <div className="column-container-items">
        <ul>
          {medias.map((media) => {
            return <SearchItem key={media.id} mediaInfo={media} />;
          })}
        </ul>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    language: state.lang.dataLang,
  };
};

export default connect(mapStateToProps)(WatchList);
