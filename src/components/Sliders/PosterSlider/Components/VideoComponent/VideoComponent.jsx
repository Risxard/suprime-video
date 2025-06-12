import React, { useEffect, useState } from "react";

import useGetVideoKey from "../../../../../hooks/GetVideoKey/useGetVideoKeys";
import {Volume1, VolumeX } from "lucide-react";
import './VideoComponent.css'
import Player from "../../../../MediaPlayer/Player/Player";

const videoComponent = (props) => {
  const [isMuted, setIsMuted] = useState(true);
  const [startAnimationVideo, setStartAnimationVideo] = useState(false);
  const [playVideo, setPlayVideo] = useState(false);
  const [videoQuery, setVideoQuery] = useState(null);

  const isHovered = props.isHovered;
  const language = props.language;
  const mediaType = props.mediaType;
  const id = props.id;

  const videoKey = useGetVideoKey(id, language, mediaType);

  useEffect(() => {
    const animationTimeOut = setTimeout(() => {
      setStartAnimationVideo(true);
      setPlayVideo(true);
    }, 2000);

    if (isHovered && videoKey != undefined && videoKey !== null) {
      setVideoQuery(animationTimeOut);
    }

    setPlayVideo(false);
    clearTimeout(videoQuery);
  }, [isHovered]);

  const handleMuteToggle = () => {
    setIsMuted((prevIsMuted) => !prevIsMuted);
  };


  return (
    <div className={`poster-video-inner ${startAnimationVideo && playVideo && videoKey ? 'video-is-playing' : ""}`}>
      <div className="poster-slider-video-container">
        {playVideo && videoKey ? (
          <span className="poster-slider-video">
            <Player videoKey={videoKey} controlsMode={0} isMuted={isMuted} />
          </span>
        ) : (
          ""
        )}
      </div>

      <span
        className={`mute-btn ${
          startAnimationVideo && playVideo && videoKey ? "startVideo" : ""
        }`}
        onClick={handleMuteToggle}
      >
        {!isMuted ? <Volume1 /> : <VolumeX />}
      </span>
    </div>
  );
};

export default videoComponent;
