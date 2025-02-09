import React, { useState, useEffect } from "react";

import "../styles.css";
import BackdropSlider from "../../../Components/Sliders/BackdropSlider/BackdropSlider";
import { setSectionTitle } from "../../../functions/Converter";
import { getDiscover } from "../../../Services/callFunctions/getDiscover";

const GenreList = (props) => {
  const { language, genreId, filter } = props;
  const genre = parseInt(genreId);

  return (
    <>
      {(filter === 1 || filter === 2) && language ? (
        <BackdropSlider
          sectionTitle={"Movies"}
          language={language}
          selectedGenre={genre}
          filterMode={"genre"}
          filterScope={"movie"}
          suprimeTitle={true}
          receivingMode={false}
        ></BackdropSlider>
      ) : (
        ""
      )}

      {(filter === 1 || filter === 3) && language ? (
        <BackdropSlider
          sectionTitle={"TV shows"}
          language={language}
          selectedGenre={genre}
          filterMode={"genre"}
          filterScope={"tv"}
          suprimeTitle={true}
          receivingMode={false}
        ></BackdropSlider>
      ) : (
        ""
      )}

      {filter === 1 || filter === 2 ? (
        <BackdropSlider
          sectionTitle={"Popular movies"}
          language={language}
          selectedGenre={genre}
          filterMode={"genre"}
          filterScope={"movie"}
          suprimeTitle={true}
          receivingMode={false}
          sortBy={"revenue.desc"}
        ></BackdropSlider>
      ) : (
        ""
      )}

      {filter === 1 || filter === 3 ? (
        <BackdropSlider
          sectionTitle={"Popular TV"}
          language={language}
          selectedGenre={genre}
          filterMode={"genre"}
          filterScope={"tv"}
          suprimeTitle={true}
          receivingMode={false}
          sortBy={"vote_count.desc"}
        ></BackdropSlider>
      ) : (
        ""
      )}
    </>
  );
};

export default GenreList;
