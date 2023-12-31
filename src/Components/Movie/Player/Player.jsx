import React from 'react';


const Player = (SectionData) => {
  const videokey = SectionData.videoKey;

  if (videokey != null) {
    return (
      <div className="MoviePlayer">
        <iframe
          width="100%"
          height="360"
          src={`https://www.youtube.com/embed/${videokey}?autoplay=1&modestbranding=1&color=white`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
          allowFullScreen
        ></iframe>
      </div>
    );
  } else {
    return false;
  }
};

export default Player;
