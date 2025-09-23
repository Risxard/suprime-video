import React, { useEffect, useState } from "react";

import VideoComponent from "../VideoComponent/VideoComponent";
import IncludeBd from "../IncludeBd/IncludeBd";
import playBtn from "../../../../../assets/Buttons/playMovieBtn.svg";
import { Link } from "react-router-dom";
import { Plus, Check, AlertCircle } from "lucide-react";
import useGetVideoKey from "../../../../../hooks/GetVideoKey/useGetVideoKeys";
import getLogoImages from "../../../../../hooks/ApiCalls/useFetchImages/";
import { updateWatchlist } from "../../../../../services/firebase/profileServices";

import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import LoadingIcon from "../../../../../assets/svgs/LoadingIcon";

export default function PosterBackdropInfo({
  propsChildren,
  isHovered,
  backDropImageSrc,
}) {
  const { media, id, language, mediaType, original_language } = propsChildren;
  const image_path = "https://image.tmdb.org/t/p/original/";
  const profileId = useSelector((state) => state.auth.currentProfile.id);
  const watchlist = useSelector((state) => state.auth.watchList);
  const isInWatchlist = watchlist?.[mediaType]?.includes(id);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const buttonsLang = t("buttons");
  const { optionsButtons } = buttonsLang;
  const originalLanguage = original_language;
  const logoImage = getLogoImages(id, mediaType, language, originalLanguage);

  const handleToWatchlist = async (profileId, mediaType, mediaId, action) => {
    setIsLoading(true);
    try {
      await updateWatchlist(profileId, mediaType, mediaId, action, dispatch);
    } catch (error) {
      console.error("Error adding to watchlist:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const action = isInWatchlist ? "remove" : "add";




  return (
    <div className={`poster-backdrop-info`}>
      <img
        src={backDropImageSrc}
        alt="media image"
        loading="lazy"
        className="poster-backdrop-img"
      />

      {isHovered && innerWidth > 880 ? (
        <VideoComponent
          language={language}
          mediaType={mediaType}
          originalLanguage={originalLanguage}
          id={id}
          isHovered={isHovered}
        />
      ) : (
        ""
      )}

      <div className="poster-backdrop-btn">
        <div className="poster-info-title">
          <span to={`/detail/${mediaType}/${media.id}`}>
            {logoImage && logoImage.file_path ? (
              <span className="poster-intro-logo">
                <img
                  src={`${image_path}${logoImage.file_path}`}
                  alt="media logo"
                />
              </span>
            ) : (
              <>
                {media.title == null ? (
                  <h2>{media.name} </h2>
                ) : (
                  <h2>{media.title}</h2>
                )}
              </>
            )}
          </span>
        </div>

        <span className="posterBtns ">
          <Link
            to={`/detail/${mediaType}/${media.id}/play`}
            className="playnow-btn"
            style={{ textDecoration: "none" }}
          >
            <div className="align-btn">
              <svg
                viewBox="0 0 24 24"
                height="24"
                width="24"
                role="img"
                aria-hidden="true"
              >
                <title>Play</title>
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.643 3.069 C 6.546 3.103,6.392 3.206,6.300 3.298 C 5.973 3.624,6.000 2.855,6.000 12.000 C 6.000 21.144,5.974 20.376,6.299 20.701 C 6.568 20.970,6.964 21.065,7.308 20.944 C 7.580 20.848,20.606 12.815,20.748 12.656 C 21.074 12.289,21.074 11.710,20.748 11.345 C 20.607 11.188,7.572 3.150,7.305 3.055 C 7.107 2.985,6.867 2.990,6.643 3.069 "
                    fill="currentColor"
                    stroke="none"
                    fillRule="evenodd"
                  ></path>
                </svg>
              </svg>

              <p>{optionsButtons.play2}</p>
            </div>
          </Link>

          <span className="poster-options-btn">
            <span
              className="watchlist-btn"
              data-label={optionsButtons.watchlist}
              onClick={() =>
                handleToWatchlist(profileId, mediaType, id, action)
              }
            >
              <div className="align-btn">
                {isLoading ? (
                  <LoadingIcon />
                ) : isInWatchlist ? (
                  <Check />
                ) : (
                  <Plus />
                )}
              </div>
            </span>

            <Link
              to={`/detail/${mediaType}/${media.id}`}
              className="details-btn"
              data-label={optionsButtons.details}
            >
              <div className="align-btn">
                <AlertCircle />
              </div>
            </Link>
          </span>
        </span>

        <IncludeBd language={language} id={id} mediaType={mediaType} />
      </div>

      <Link to={`/detail/${mediaType}/${media.id}`} className="media-link" />
    </div>
  );
}
