import React from "react";
import { useParams } from "react-router-dom";

import { X } from "lucide-react";

import "./styles.css";
import { useDispatch } from "react-redux";
import { hidePlayerModal } from "../../store/slices/modals.js";
import Player from "./Player/Player.jsx";

const MediaPlayer = ({ propsKey }) => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const handleExitClick = () => {
    dispatch(hidePlayerModal(false));
  };

  return (
    <div id="media-player">
      <span className="exit-mediaplayer">
        <span className="exit-mediaplayer-btn" onClick={handleExitClick}>
          <X />
        </span>
      </span>
      <Player videoKey={propsKey} controlsMode={1}></Player>
    </div>
  );
};

export default MediaPlayer;
