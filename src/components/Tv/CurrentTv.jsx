import React, { useEffect, useState } from "react";


import { useParams } from "react-router-dom";

import "../../Pages/MediaPlayer/Movie.css";

import TvDetails from "./TvDetails/TvDetails";

var Movie = (SectionData) => {

  const title = SectionData.title;
  const language = SectionData.language;
  const similar = SectionData.similar;
  const mediaType = SectionData.mediaType;
  const genres_Id = SectionData.genres_Id;

  const { id } = useParams();


  return (
    <div className="Tv">
      <section>
        <TvDetails
          original_title={SectionData.original_title}
          runtime={SectionData.runtime}
          overview={SectionData.overview}
          tagline={SectionData.tagline}
          backdrop_path={SectionData.backdrop_path}
          release_date={SectionData.release_date}
          vote_average={SectionData.vote_average}
          genres_Id={genres_Id}
          mediaType={mediaType}
          similar={similar}
          language={language}
          videoKey={SectionData.videoKey}
        />
      </section>
    </div>
  );
};

export default Movie;
