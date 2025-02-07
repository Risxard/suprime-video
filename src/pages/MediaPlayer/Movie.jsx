import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetVideoKey } from "../../hooks/GetVideoKey/useGetVideoKeys.jsx";
import { Volume1, VolumeX } from "lucide-react";
import Player from "../../Components/MediaDetail/Player/Player.jsx";
import InfoDetails from "../../Components/MediaDetail/InfoDetails/InfoDetails.jsx";
import "./Movie.css";
import MediaDetail from "../../components/MediaDetail/Index.jsx";
import { getMediaDetails } from "../../services/callFunctions/getMediaDetails.js";

const Movie = () => {
  const [sectionActived, setSectionActived] = useState("slider");
  const [isMouseMoving, setIsMouseMoving] = useState(true);
  const [hideInfo, setHideInfo] = useState(true);
  const [userInPage, setUserInPage] = useState(true);
  const [media, setMedia] = useState(null);

  const mediaType = "movie";
  const image_path = "https://image.tmdb.org/t/p/original/";

  const language = useSelector((state) => state.lang.language);

  const { id } = useParams();


  useEffect(() => {

    const fetchMediaDetails = async () => {
      try {
        const response = await getMediaDetails({
          id: id,
          lang: language,
          type: "movie",
        });
        setMedia(response);

        console.log(response);
      } catch (error) {
        console.error("Erro ao buscar os detalhes da mídia:", error);
      }
    };

    fetchMediaDetails();
  }, [id, language]);

  const title = media?.title;
  const original_title = media?.original_title;
  const runtime = media?.runtime;
  const overview = media?.overview;
  const tagline = media?.tagline;
  const backdrop_path = media?.backdrop_path;
  const release_date = media?.release_date;
  const similar = media?.similar;
  const vote_average = media?.vote_average;
  const genresId = media?.genres_Id;

  const videoSource = useGetVideoKey(id, language, mediaType);
  const videoKey = videoSource.videoKey;

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

  return (
    <div
      className={`MovieContainer ${isMouseMoving ? "" : "isMouseMoving"} ${
        hideInfo ? "" : "hideInfo"
      }`}
      key={id}
    >
      <div className="MovieInner" onMouseMove={() => setIsMouseMoving(true)}>
        <span className="background-container">
          <span className="mute-btn" onClick={handleMuteToggle}>
            {!isMuted ? <Volume1 /> : <VolumeX />}
          </span>
          <span className="img-container">
            <section className="current-media">
              {videoKey ? (
                <Player
                  videoKey={videoKey}
                  isMuted={isMuted}
                  controlsMode={0}
                ></Player>
              ) : (
                ""
              )}
            </section>

            <img src={`${image_path}${backdrop_path}`} alt={title} />
            <span className="background-filter" />
            <span className="background-filter2" />
          </span>
        </span>

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
            className={`select ${sectionActived === "slider" ? "active" : ""}`}
            onClick={() => setSectionActived("slider")}
          >
            Related
          </span>

          <span
            className={`select ${
              sectionActived === "media-info" ? "active" : ""
            }`}
            onClick={() => setSectionActived("media-info")}
          >
            Details
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
        />
      )}
    </div>
  );
};

export default Movie;
