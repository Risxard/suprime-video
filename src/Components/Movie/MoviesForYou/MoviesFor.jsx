import React from "react";
import { Link } from "react-router-dom";


import "./MoviesFor.css";

const movieFor = (movie) => {
  const image_path = "https://image.tmdb.org/t/p/original/";
  const mediaType = movie.mediaType;

  return (

    <Link to={`/BD-Screens/${mediaType}/${movie.id}`} className="MovieForItem">

        <span className="MovieForCard-Btn"/>
        <span className="moviefor-bgfilter"></span>
        <img src={`${image_path}${movie.poster_path}`} alt={movie.title} className="skeleton"/>

        <div className="Movie-Title-Inner" ><h3>{movie.title}</h3></div>

    </Link>
  );
};

export default movieFor;
