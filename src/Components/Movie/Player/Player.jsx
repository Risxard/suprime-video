import React, { useEffect, useRef } from "react";
import YouTubePlayer from "youtube-player";
import { useParams } from "react-router-dom";

const Player = ({ videoKey, isMuted, onMuteToggle }) => {
  const playerRef = useRef(null);



  const { id } = useParams();

  useEffect(() => {

    const player = YouTubePlayer("youtube-player", {
      playerVars: {
        controls: 0, // Esconde os controles do player
        modestbranding: 1, // Remove o logo do YouTube
        showinfo: 0, // Remove o título do vídeo
        volume: 80, // Define o volume padrão para 80%
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
