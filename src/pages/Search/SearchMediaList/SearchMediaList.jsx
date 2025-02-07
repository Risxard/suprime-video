import React, { useEffect, useState } from "react";

import SearchItem from "./Searchitem/SearchItem";
import { useIntersectionObserver } from "../../../hooks/IntersectionObserver/useIntersationObserver";
import BackdropSlider from "../../../Components/Sliders/BackdropSlider/BackdropSlider";
import { setSectionTitle } from "../../../functions/Converter";

const SearchMediaList = (props) => {
  const [genresToFilter, setGenresToFilter] = useState([]);

  const {
    filteredMedias,
    keyType,
    personName,
    visibleSections,
    selectedGenres,
    typeValue,
    language,
    receiverMode
  } = props;

  useEffect(() => {
    let genres;
    if (true) {
      switch (selectedGenres) {
        case 28:
          genres = [28, 10759];
          setGenresToFilter(genres);
          break;
        case 12:
          genres = [12, 10759];
          setGenresToFilter(genres);
          break;
        case 878:
          genres = [878, 10765];
          setGenresToFilter(genres);
          break;
        case null:
          genres = [];
          setGenresToFilter(genres);
          break;

        default:
          setGenresToFilter([selectedGenres]);
      }
    }
  }, [selectedGenres, language]);





  return (
    <div>
      <div className="resultsFor ptext">
        {filteredMedias.length > 0 ? (
          <p>Results for "{keyType === "person" ? personName : typeValue}". </p>
        ) : (
          <p>
            We didn't find any matches for "
            {keyType === "person" ? personName : typeValue}". Browse our most
            popular TV shows and movies.
          </p>
        )}
      </div>





      {filteredMedias.length > 0 ? (
        <div className="column-container-items">
          <div className="ptext">
            <p>More videos</p>
          </div>
          <ul>
            {genresToFilter.length > 0
              ? filteredMedias
                  .filter(
                    (array) =>
                      array.genre_ids &&
                      array.genre_ids.some((id) => genresToFilter.includes(id))
                  )
                  .slice(0, visibleSections)
                  .map((array) => (
                    <SearchItem key={array.id} mediaInfo={array} />
                  ))
              : filteredMedias
                  .slice(0, visibleSections)
                  .map((array) => (
                    <SearchItem key={array.id} mediaInfo={array} />
                  ))}
          </ul>
        </div>
      ) : (
        <BackdropSlider
          sectionTitle="Top TV and movies"
          mediaType={"tv"}
          language={language}
          suprimeTitle={true}
          filterMode={"trending"}
          filterScope={"all"}
        />
      )}
      
    </div>
  );
};

export default SearchMediaList;
