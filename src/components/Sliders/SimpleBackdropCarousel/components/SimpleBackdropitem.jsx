import { useEffect, useState } from "react";
import { dateConverter, genreConverter } from "../../../../functions/Converter";
import { tmdbService } from "../../../../services/tmdb/tmdbServices";
import "./styles.css";
import MediaClass from "../../../MediaClass/MediaClass";
import { NavLink } from "react-router-dom";

import { image_path_342, image_path_500 } from "../../../../utils/imagePaths";

const SimpleBackdropitem = ({ movie }) => {
  return (
    <div className="simple-backdrop-item">
      <NavLink to={`/detail/${movie.media_type}/${movie.id}`}>
        <div className="simple-backdrop-item-content">
          <div className="simple-backdrop-item-image">
            <img src={`${image_path_500}${movie?.backdrop_path}`} alt="" />
          </div>
        </div>
      </NavLink>
    </div>
  );
};

export default SimpleBackdropitem;
