import React from "react";

import VideoComponent from "../VideoComponent/VideoComponent";
import IncludeBd from "../IncludeBd/IncludeBd";
import playBtn from "../../../../../assets/Buttons/playMovieBtn.svg";
import { Link } from "react-router-dom";
import { Plus, Check, AlertCircle } from "lucide-react";
import useGetVideoKey from "../../../../../hooks/GetVideoKey/useGetVideoKeys";
export default function PosterBackdropInfo({
  propsChildren,
  isHovered,
  backDropImageSrc,
}) {
  const { media, id, language, mediaType } = propsChildren;
  const videoSource = useGetVideoKey(id, language, mediaType);
  const videoKey = videoSource.videoKey;


  return (
    <div className={`poster-backdrop-info`}>
      <img src={backDropImageSrc} alt="media image" loading="lazy" />

      {isHovered && innerWidth > 880 ? (
        <VideoComponent
          language={language}
          mediaType={mediaType}
          id={id}
          isHovered={isHovered}
        />
      ) : (
        ""
      )}

      <div className="poster-backdrop-btn">
        <div className="poster-info-title animationIn">
          <Link to={`/${mediaType}/${media.id}`}>
            {media.title == null ? (
              <h2>{media.name} </h2>
            ) : (
              <h2>{media.title}</h2>
            )}
          </Link>
        </div>

        <span className="posterBtns animationIn">
          <Link
            to={`/mediaplayer/${videoKey}`}
            className="playnow-btn"
            style={{ textDecoration: "none" }}
          >
            <div className="align-btn">
              <img src={playBtn} alt="play" loading="lazy" />
              <p>Play</p>
            </div>
          </Link>
          <span className="poster-options-btn">
            <span className="watchlist-btn">
              <div className="align-btn">
                <Plus />
              </div>
            </span>
            <Link
              to={`/${mediaType}/${media.id}`}
              className="details-btn"
            >
              <div className="align-btn">
                <AlertCircle />
              </div>
            </Link>
          </span>
        </span>

        <IncludeBd language={language} id={id} mediaType={mediaType} />
      </div>

      <Link
        to={`/${mediaType}/${media.id}`}
        className="media-link"
      />
    </div>
  );
}
