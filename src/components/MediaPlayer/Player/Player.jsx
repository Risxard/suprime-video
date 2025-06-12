import React, { useEffect, useRef } from "react";
import YouTubePlayer from "youtube-player";

const Player = ({ videoKey, isMuted, onMuteToggle, controlsMode }) => {
  const playerRef = useRef(null);



  
  useEffect(() => {

    const player = YouTubePlayer("youtube-player", {
      playerVars: {
        controls: controlsMode,
        modestbranding: 1,
        showinfo: 0,
        volume: 80,
        vq: 'hd1080',
      },
    });

    playerRef.current = player;

    player.on("ready", () => {
      player.loadVideoById(videoKey);
    });

    return () => {
      player.destroy();
    };
  }, [videoKey]);


  useEffect(() => {

    if (playerRef.current) {
      playerRef.current.isMuted().then((muted) => {
        if (muted !== isMuted) {
          playerRef.current[isMuted ? "mute" : "unMute"]();
        }
      });
    }
  }, [isMuted]);

  return (
    <div className="MoviePlayer" key={videoKey}>
      <div id="youtube-player" />
    </div>
  );
};

export default Player;
