import React from "react";
import {
  Plus,
  Share2,
  Film,
  ThumbsUp,
  ThumbsDown,
  Download,
} from "lucide-react";

const MovieOptions = () => {
  return (
    <div className="MovieBtns">
      <span className="MovieBtn" data-name={'Trailer'}>
        <Film />
      </span>

      <span className="MovieBtn" data-name={'Watchlist'}>
        <Plus />
      </span>

      <div className="like-group-btn" >
        <span className="like-btn" data-name={'Like'}>
          <ThumbsUp />
        </span>
        <span className="like-btn" data-name={'Not for me'}>
          <ThumbsDown />
        </span>
      </div>

      <span className="MovieBtn" data-name={'Download'}>
        <Download />
      </span>
      <span className="MovieBtn" data-name={'Share'}>
        <Share2 />
      </span>
    </div>
  );
};

export default MovieOptions;
