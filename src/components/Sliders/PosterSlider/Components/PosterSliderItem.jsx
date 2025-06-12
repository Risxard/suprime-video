import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import "./PosterSliderItem.css";
import PosterBackdropInfo from "./PosterBackdropInfo/PosterBackdropInfo";
import MovieOptionsModal from "../../../Modals/MovieOptionsModal/MovieOptionsModal";
import { setGlobalModal } from "../../../../store/slices/modals";
import { useDispatch } from "react-redux";

export default function PosterSliderItem(props) {
  const [isHovered, setIsHovered] = useState(false);
  const slideRef = useRef(null);
  const { media, id, language, mediaType, index } = props;
  const image_path = "https://image.tmdb.org/t/p/original/";

  const dispatch = useDispatch();

  useEffect(() => {
    const slideElement = slideRef.current;
    if (!slideElement) return;

    const handleMouseEnter = () => {
      setIsHovered(true);
      props.handleCB(index);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
    };

    slideElement.addEventListener("mouseenter", handleMouseEnter);
    slideElement.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      slideElement.removeEventListener("mouseenter", handleMouseEnter);
      slideElement.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const posterImageSrc = `${image_path}${media.poster_path}`;
  const backDropImageSrc = `${image_path}${media.backdrop_path}`;

  const propsChildren = { media, id, language, mediaType };

  const handleSetGlobalModal = (media) => {
    dispatch(setGlobalModal(<MovieOptionsModal props={media} />));
  };

  const handleTouchStart = (e, media) => {
    const timeout = setTimeout(() => handleSetGlobalModal(media), 400);
    e.target.addEventListener("touchend", () => clearTimeout(timeout), {
      once: true,
    });
  };
  return (
    <li
      ref={slideRef}
      data-index={index + 1}
      onTouchStart={(e) => handleTouchStart(e, media)}
    >
      <article className="poster-item">
        <div className="poster-inner">
          <Link
            to={`/detail/${mediaType}/${media.id}`}
            className="poster-poster-path skeleton"
          >
            <img src={posterImageSrc} alt="media image" loading="lazy" />
          </Link>

          <PosterBackdropInfo
            propsChildren={propsChildren}
            isHovered={isHovered}
            backDropImageSrc={backDropImageSrc}
          />
        </div>
      </article>
    </li>
  );
}
