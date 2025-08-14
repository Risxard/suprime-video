import React, { useState } from "react";
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
import { updateWatchlist } from "../../../services/firebase/profileServices";
import LoadingIcon from "../../../assets/svgs/LoadingIcon";

const MovieOptions = ({ mediaType, id, buttonsLang }) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleExitClick = () => {
    dispatch(showPlayerModal(true));
  };

  const userId = useSelector((state) => state.auth.user.uid);
  const profileId = useSelector((state) => state.auth.currentProfile.id);
  const watchlist = useSelector((state) => state.auth.watchList);
  const isInWatchlist = watchlist?.[mediaType]?.includes(id);

  const handleToWatchlist = async (profileId, mediaType, mediaId, action) => {
    setIsLoading(true);
    try {
      await updateWatchlist(profileId, mediaType, mediaId, action, dispatch);
    } catch (error) {
      console.error("Error adding to watchlist:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const action = isInWatchlist ? "remove" : "add";
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
        onClick={() =>
          handleToWatchlist(
            profileId,
            mediaType,
            id,
            action
          )
        }
      >
        {isLoading ? <LoadingIcon /> : isInWatchlist ? <Check /> : <Plus />}
      </span>

      <div className="like-group-btn">
        <span className="like-btn" data-name={buttonsLang.optionsButtons.like}>
          <ThumbsUp />
        </span>
        <span
          className="like-btn"
          data-name={buttonsLang.optionsButtons.dislike}
        >
          <ThumbsDown />
        </span>
      </div>

      <span
        className="MovieBtn"
        data-name={buttonsLang.optionsButtons.download}
      >
        <Download />
      </span>
      <span className="MovieBtn" data-name={buttonsLang.optionsButtons.share}>
        <Share2 />
      </span>
    </div>
  );
};

export default MovieOptions;
