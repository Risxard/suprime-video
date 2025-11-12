import React, { useRef } from "react";
import "./styles.css";
import { NavLink } from "react-router-dom";

import disneyVideo from "./assets/videos/disney.mp4";
import pixarVideo from "./assets/videos/pixar.mp4";
import marvelVideo from "./assets/videos/marvel.mp4";
import starWarsVideo from "./assets/videos/star-wars.mp4";
import nationalVideo from "./assets/videos/national-geographic.mp4";
import espnVideo from "./assets/videos/espn.mp4";
import huluVideo from "./assets/videos/hulu.mp4";

import disneyImage from "./assets/images/disney.webp";
import pixarImage from "./assets/images/pixar.webp";
import marvelImage from "./assets/images/marvel.webp";
import starWarsImage from "./assets/images/starwars.webp";
import nationalImage from "./assets/images/national.webp";
import espnImage from "./assets/images/espn.webp";
import huluImage from "./assets/images/hulu.webp";

const channels = [
  {
    url: "disney",
    img: disneyImage,
    video: disneyVideo,
  },
  {
    url: "pixar",
    img: pixarImage,
    video: pixarVideo,
  },
  {
    url: "marvel",
    img: marvelImage,
    video: marvelVideo,
  },
  {
    url: "starwars",
    img: starWarsImage,
    video: starWarsVideo,
  },
  {
    url: "national",
    img: nationalImage,
    video: nationalVideo,
  },
  {
    url: "espn",
    img: espnImage,
    video: espnVideo,
  },
  {
    url: "hulu",
    img: huluImage,
    video: huluVideo,
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
            <NavLink
              to={`/browse/${channel.url}`}
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
            </NavLink>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ChannelSection;
