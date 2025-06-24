import React from "react";
import {
  Plus,
  Share2,
  Film,
  ThumbsUp,
  ThumbsDown,
  Download,
  Check,
} from "lucide-react";
import { Link } from "react-router-dom";
import { showPlayerModal } from "../../../store/slices/modals";
import { useDispatch, useSelector } from "react-redux";
import { addToWatchlist } from "../../../services/firebase/profilesManager";

const MovieOptions = ({ mediaType, id, buttonsLang }) => {
  const dispatch = useDispatch();

  const handleExitClick = () => {
    dispatch(showPlayerModal(true));
  };

  const userId = useSelector((state) => state.auth.user.uid);
  const profileId = useSelector((state) => state.auth.currentProfile.id);
  const watchlist = useSelector((state) => state.auth.watchList);
  const isInWatchlist = watchlist?.[mediaType]?.includes(id);

  const handleToWatchlist = async (userId, profileId, mediaType, mediaId) => {
    try {
      await addToWatchlist(userId, profileId, mediaType, mediaId, dispatch);
    } catch (error) {
      console.error("Error adding to watchlist:", error);
    }
  };

  return (
    <div className="MovieBtns">
      <span
        className="MovieBtn"
        data-name={buttonsLang.optionsButtons.trailer}
        onClick={handleExitClick}
      >
        <Film />
      </span>

      <span
        className="MovieBtn"
        data-name={buttonsLang.optionsButtons.watchlist}
        onClick={() => handleToWatchlist(userId, profileId, mediaType, id)}
      >
        {isInWatchlist ? <Check /> : <Plus />}
      </span>

      <div className="like-group-btn">
        <span className="like-btn" data-name={buttonsLang.optionsButtons.like}>
          <ThumbsUp />
        </span>
        <span className="like-btn" data-name={buttonsLang.optionsButtons.dislike}>
          <ThumbsDown />
        </span>
      </div>

      <span className="MovieBtn" data-name={buttonsLang.optionsButtons.download}>
        <Download />
      </span>
      <span className="MovieBtn" data-name={buttonsLang.optionsButtons.share}>
        <Share2 />
      </span>
    </div>
  );
};

export default MovieOptions;
