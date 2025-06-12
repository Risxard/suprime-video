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
    receiverMode,
    infoLabels,
    recomendedTvAndSeries,
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
          <p>
            {infoLabels.resultsFor} "
            {keyType === "person" ? personName : typeValue}".{" "}
          </p>
        ) : (
          <p>
            {`${infoLabels.notFound1} "${keyType === "person" ? personName : typeValue}". ${infoLabels.notFound2}`}
            
          </p>
        )}
      </div>

      {filteredMedias.length > 0 ? (
        <div className="column-container-items">
          <div className="ptext">
            <p>{infoLabels.moreVideos}</p>
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
                  .map((array) => <SearchItem key={array.id} movie={array} />)
              : filteredMedias
                  .slice(0, visibleSections)
                  .map((array) => <SearchItem key={array.id} movie={array} />)}
          </ul>
        </div>
      ) : (
        <BackdropSlider
          sectionTitle={recomendedTvAndSeries}
          mediaType={"all"}
          language={language}
          filterMode={"trending"}
          filterScope={"all"}
          trending={true}
        />
      )}
    </div>
  );
};

export default SearchMediaList;
