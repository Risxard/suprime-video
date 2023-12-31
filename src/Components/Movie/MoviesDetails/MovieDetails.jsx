import React, { useState } from "react";

import "../../../pages/MediaPlayer/Movie.css";

import { dateConverter, genreConverter } from "../../../functions/Converter.js";
import MovieOptions from "../../Movie/MovieOptions/MovieOptions.jsx";

var TvDetails = (SectionData) => {
  const mediaType = SectionData.mediaType;
  const language = SectionData.language;
  const title = SectionData.title;
  const original_title = SectionData.original_title;
  const runtime = SectionData.runtime;
  const overview = SectionData.overview;
  const tagline = SectionData.tagline;
  const backdrop_path = SectionData.backdrop_path;
  const release_date = SectionData.release_date;
  const similar = SectionData.similar;
  const genresId = SectionData.genres_Id;
  const vote_average = SectionData.vote_average;
  const vote = vote_average;

  const genre_ids_to_map = genresId || [];
  const genres = genre_ids_to_map.map((genre) =>
    genreConverter(genre.id, language, "tv")
  );

  return (
    <div className="MovieContent">
      <div className="MoviePanel">
        <div className="MovieTitle">
          <h2>{title}</h2>

          <h3>Original Title: {original_title}</h3>
          <h4>
            {`${dateConverter(release_date)} •`}
            {vote > 0.0 ? (
              <span className="voteAvarage">
                <h3>{vote.toFixed(1)}</h3>
              </span>
            ) : null}
          </h4>

          {genres.length > 0 && (
            <ul className="genres">
              {genres.map((genre, index) => (
                <li key={index}>
                  <h5>{genre}</h5>
                </li>
              ))}
            </ul>
          )}

          <p>{tagline}</p>
        </div>

        <MovieOptions/>
      </div>

      <div className="MovieDescriptionContainer">
        <h3>Description</h3>
        <p>{overview}</p>
      </div>
    </div>
  );
};

export default TvDetails;
