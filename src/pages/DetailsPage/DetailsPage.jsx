import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useGetVideoKey } from "../../hooks/GetVideoKey/useGetVideoKeys.jsx";
import { Volume1, VolumeX } from "lucide-react";
import Player from "../../components/MediaPlayer/Player/Player.jsx";
import InfoDetails from "../../Components/MediaDetail/InfoDetails/InfoDetails.jsx";
import "./styles.css";
import MediaDetail from "../../components/MediaDetail/Index.jsx";
import { getMediaDetails } from "../../services/callFunctions/getMediaDetails.js";
import MediaPlayer from "../../components/MediaPlayer/MediaPlayer.jsx";
import { showPlayerModal } from "../../store/slices/modals.js";
import { use } from "react";
import i18next from "i18next";
import { useTranslation } from "react-i18next";

const DetailsPage = () => {
  const [sectionActived, setSectionActived] = useState("slider");
  const [isMouseMoving, setIsMouseMoving] = useState(true);
  const [hideInfo, setHideInfo] = useState(true);
  const [userInPage, setUserInPage] = useState(true);
  const [media, setMedia] = useState(null);

  const image_path = "https://image.tmdb.org/t/p/original/";

  const language = i18next.language;
  const playerModal = useSelector((state) => state.modals.playerModal);

  const { referrer, id, mediaType } = useParams();

  const dispatch = useDispatch();

  const handleExitClick = () => {
    dispatch(showPlayerModal(true));
  };

  useEffect(() => {
    const fetchMediaDetails = async () => {
      try {
        const response = await getMediaDetails({
          id: id,
          lang: language,
          type: mediaType,
        });
        setMedia(response);
      } catch (error) {
        console.error("Erro ao buscar os detalhes da mídia:", error);
      }
    };

    fetchMediaDetails();
  }, [id, language, mediaType]);

  const title = media?.title;
  const original_title = media?.original_title;
  const runtime = media?.runtime;
  const overview = media?.overview;
  const tagline = media?.tagline;
  const backdrop_path = media?.backdrop_path;
  const release_date = media?.release_date
    ? media?.release_date
    : media?.first_date;
  const similar = media?.similar;
  const vote_average = media?.vote_average;
  const genresId = media?.genres_Id;
  const originalLanguage = media?.original_language;

  const videoKey = useGetVideoKey(id, language, mediaType, originalLanguage);

  const startVideo = videoKey;

  const { t } = useTranslation();

  const detailPage = t("detailPage");

  useEffect(() => {
    if (videoKey && referrer) {
      setTimeout(() => {
        handleExitClick();
      }, 400);
    }
  }, [referrer, videoKey]);

  const [isMuted, setIsMuted] = useState(true);

  const handleMuteToggle = () => {
    setIsMuted((prevIsMuted) => !prevIsMuted);
  };

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setUserInPage(false);
      } else {
        setUserInPage(true);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    let timeoutId;

    const handleMouseInactive = () => {
      if (userInPage) {
        setIsMouseMoving(false);
        setTimeout(() => {
          setHideInfo(false);
        }, 300);
      }
    };

    const handleMouseActive = () => {
      setIsMouseMoving(true);
      setTimeout(() => {
        setHideInfo(true);
      }, 0);
    };

    const handleMouseMove = () => {
      clearTimeout(timeoutId);

      if (!isMouseMoving) {
        handleMouseActive();
      }

      timeoutId = setTimeout(handleMouseInactive, 4000);
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timeoutId);
    };
  }, [id, isMouseMoving]);

  useEffect(() => {
    const img = document.querySelector(".background-container");

    setTimeout(() => {
      img.classList.add("activeMedia");

      const intervalId = setInterval(() => {
        img.classList.remove("activeMedia");
      }, 60000);

      return () => {
        clearInterval(intervalId);
      };
    }, 4000);
  }, [id]);

  const videok = "ZL7R8qyQXrc";
  return (
    <div
      className={`MovieContainer ${isMouseMoving ? "" : "isMouseMoving"} ${
        hideInfo ? "" : "hideInfo"
      }`}
      key={id}
    >
      <div className="MovieContainerInner">
        <div className="MovieInner" onMouseMove={() => setIsMouseMoving(true)}>
          {!playerModal && (
            <span className="background-container">
              <span className="mute-btn" onClick={handleMuteToggle}>
                {!isMuted ? <Volume1 /> : <VolumeX />}
              </span>
              <span className="img-container">
                <section className="current-media">
                  {videoKey && (
                    <Player
                      videoKey={videoKey}
                      isMuted={isMuted}
                      controlsMode={0}
                    ></Player>
                  )}
                </section>

                <img src={`${image_path}${backdrop_path}`} alt={title} />
                <span className="background-filter" />
                <span className="background-filter2" />
              </span>
            </span>
          )}

          <MediaDetail
            title={title}
            original_title={original_title}
            runtime={runtime}
            overview={overview}
            tagline={tagline}
            backdrop_path={backdrop_path}
            release_date={release_date}
            vote_average={vote_average}
            genres_Id={genresId}
            mediaType={mediaType}
            similar={similar}
            language={language}
            videoKey={videoKey}
          ></MediaDetail>

          <div className="selectSection options-info-btn">
            <span
              className={`select ${
                sectionActived === "slider" ? "active" : ""
              }`}
              onClick={() => setSectionActived("slider")}
            >
              {detailPage.labelButtons.related}
            </span>

            <span
              className={`select ${
                sectionActived === "media-info" ? "active" : ""
              }`}
              onClick={() => setSectionActived("media-info")}
            >
              {detailPage.labelButtons.details}
            </span>
          </div>
        </div>

        {media && (
          <InfoDetails
            sectionActived={sectionActived}
            spoken_languages={media.spoken_languages}
            starring={media.starring}
            directors={media.directors}
            producers={media.producers}
            studios={media.studios}
            subtitles={media.subtitles}
            mediaType={mediaType}
            language={language}
            mediaId={id}
          />
        )}
      </div>

      {playerModal && (
        <div className="media-modal">
          {videoKey && <MediaPlayer propsKey={videoKey} />}
        </div>
      )}
    </div>
  );
};

export default DetailsPage;
