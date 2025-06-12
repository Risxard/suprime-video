import React from "react";
import { useParams } from "react-router-dom";
import "../../pages/DetailsPage/styles.css";
import MovieDetails from "./MoviesDetails/MovieDetails.jsx";
import { useSelector } from "react-redux";
import i18next from "i18next";

var MediaDetail = (SectionData) => {

  const title = SectionData.title;
  const similar = SectionData.similar;
  const mediaType = SectionData.mediaType;
  const genres_Id = SectionData.genres_Id;
  const referrer = SectionData.referrer;

  const { id } = useParams();

  return (
    <div className="Movie">
      <section>
        <MovieDetails
          title={SectionData.title}
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
          videoKey={SectionData.videoKey}
          referrer={referrer}
        />
      </section>
    </div>
  );
};

export default MediaDetail;
