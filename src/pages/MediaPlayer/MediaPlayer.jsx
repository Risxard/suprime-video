import React from "react";
import { useParams, useNavigate } from "react-router-dom";

import { X } from "lucide-react";

import Player from "../../Components/MediaDetail/Player/Player.jsx";
import "./Movie.css";

const MediaPlayer = () => {
  const { key } = useParams();
  const navigate = useNavigate();

  const handleExitClick = () => {
    navigate(-1);
  };

  console.log(key);
  return (
    <div id="media-player">
      <span className="exit-mediaplayer">
        <span className="exit-mediaplayer-btn" onClick={handleExitClick}>
          <X />
        </span>
      </span>
      <Player videoKey={key} controlsMode={1}></Player>
    </div>
  );
};

export default MediaPlayer;
