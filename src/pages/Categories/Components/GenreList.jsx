import React, { useState, useEffect } from "react";

import "../styles.css";
import BackdropSlider from "../../../Components/Sliders/BackdropSlider/BackdropSlider";
import { setSectionTitle } from "../../../functions/Converter";
import { getDiscover } from "../../../Services/callFunctions/getDiscover";

const GenreList = (props) => {
  const { language, genreId, filter, sectionTitles } = props;
  const genre = parseInt(genreId);

  return (
    <>
      {(filter === 1 || filter === 2) && language ? (
        <BackdropSlider
          sectionTitle={sectionTitles.movies}
          language={language}
          selectedGenre={genre}
          filterMode={"genre"}
          filterScope={"movie"}
          suprimeTitle={true}
          receivingMode={false}
          pageNumber={1}
        ></BackdropSlider>
      ) : (
        ""
      )}

      {(filter === 1 || filter === 3) && language ? (
        <BackdropSlider
          sectionTitle={sectionTitles.tvShows}
          language={language}
          selectedGenre={genre}
          filterMode={"genre"}
          filterScope={"tv"}
          suprimeTitle={true}
          receivingMode={false}
          pageNumber={1}
        ></BackdropSlider>
      ) : (
        ""
      )}

      {filter === 1 || filter === 2 ? (
        <BackdropSlider
          sectionTitle={sectionTitles.popularMovies}
          language={language}
          selectedGenre={genre}
          filterMode={"genre"}
          filterScope={"movie"}
          suprimeTitle={true}
          receivingMode={false}
          sortBy={"revenue.desc"}
          pageNumber={1}
        ></BackdropSlider>
      ) : (
        ""
      )}

      {filter === 1 || filter === 3 ? (
        <BackdropSlider
          sectionTitle={sectionTitles.popularTvShows}
          language={language}
          selectedGenre={genre}
          filterMode={"genre"}
          filterScope={"tv"}
          suprimeTitle={true}
          receivingMode={false}
          sortBy={"vote_count.desc"}
          pageNumber={1}
        ></BackdropSlider>
      ) : (
        ""
      )}
    </>
  );
};

export default GenreList;
