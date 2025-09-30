import React, { useRef } from "react";
import "./styles.css";

import disneyVideo from "./assets/videos/disney.mp4";
import marvelVideo from "./assets/videos/marvel.mp4";
import pixarVideo from "./assets/videos/pixar.mp4";
import starWarsVideo from "./assets/videos/star-wars.mp4";
import nationalVideo from "./assets/videos/national-geographic.mp4";
import espnVideo from "./assets/videos/espn.mp4";
import starVideo from "./assets/videos/star.mp4";

const channels = [
  {
    img: "https://disney.images.edge.bamgrid.com/ripcut-delivery/v2/variant/disney/FFA0BEBAC1406D88929497501C84019EBBA1B018D3F7C4C3C829F1810A24AD6E/compose?format=webp&width=800",
    video: disneyVideo,
  },
  {
    img: "https://disney.images.edge.bamgrid.com/ripcut-delivery/v2/variant/disney/8D83D724070255A0A0078E3D7945301A1F5ADD0DCCA1C7F908542AEA0C742823/compose?format=webp&width=800",
    video: marvelVideo,
  },
  {
    img: "https://disney.images.edge.bamgrid.com/ripcut-delivery/v2/variant/disney/7F4E1A299763030A0A8527227AD2812C049CE3E02822F7EDEFCFA1CFB703DDA5/compose?format=webp&width=800",
    video: pixarVideo,
  },
  {
    img: "https://disney.images.edge.bamgrid.com/ripcut-delivery/v2/variant/disney/5A9416D67DC9595496B2666087596EE64DE379272051BB854157C0D938BE2C26/compose?format=webp&width=800",
    video: starWarsVideo,
  },
  {
    img: "https://disney.images.edge.bamgrid.com/ripcut-delivery/v2/variant/disney/2EF24AA0A1E648E6D1A3B26491F516632137ED87AB22969D153316F8BD670FB5/compose?format=webp&width=800",
    video: nationalVideo,
  },
  {
    img: "https://disney.images.edge.bamgrid.com/ripcut-delivery/v2/variant/disney/1CC4B181E5EF37C07D5D0224A04C504FBBCC238B93173450F0A1960DA7EF4B4F/compose?format=webp&width=800",
    video: espnVideo,
  },
  {
    img: "https://disney.images.edge.bamgrid.com/ripcut-delivery/v2/variant/disney/AE893BCDD6264C4A876C03A0DE5004D9F394BE1E8388F085431318CDCEC9A598/compose?format=webp&width=800",
    video: starVideo,
  },
];

const ChannelSection = () => {
  const videoRefs = useRef([]);
  const handleMouseEnter = (index) => {
    if (window.innerWidth > 768) {
      const video = videoRefs.current[index];
      if (video) {
        video.play();
      }
    }
  };


  return (
    <div className="channels-section">
      <section>
        <div className="channels-group">
          {channels.map((channel, index) => (
            <a
              href="#"
              key={index}
              className="channel-item"
              onMouseEnter={() => handleMouseEnter(index)}
            >
              <div className="channel-item-content">
                <div className="channel-item-image-container">
                  <img src={channel.img} alt="" />
                </div>

                <video
                  ref={(el) => (videoRefs.current[index] = el)}
                  src={channel.video}
                  muted
                  loop
                  preload="metadata"
                  className="channel-item-video"
                />
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ChannelSection;
