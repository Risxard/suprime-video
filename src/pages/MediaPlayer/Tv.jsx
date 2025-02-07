import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { getMediaDetails } from "../../store/actions/Media/mediaAction";
import { useGetVideoKey } from "../../hooks/GetVideoKey/useGetVideoKeys.jsx";
import { Volume1, VolumeX } from "lucide-react";
import LoginPage from "../Login/Login";
import CurrentTv from '../../Components/Tv/CurrentTv.jsx'
import Player from "../../Components/Movie/Player/Player.jsx";
import InfoDetails from "../../Components/Movie/InfoDetails/InfoDetails.jsx";
import "./Movie.css";

const Tv = (props) => {
  const [sectionActived, setSectionActived] = useState("slider");
  const [isMouseMoving, setIsMouseMoving] = useState(true);
  const [hideInfo,setHideInfo] = useState(true);
  const [userInPage, setUserInPage] = useState(true);

  const { id } = useParams();
  const statusLog = localStorage.getItem("statusLog");
  const mediaType = "tv";
  const image_path = "https://image.tmdb.org/t/p/original/";

  const language = props.language;

  const title = props.data.title;
  const original_title = props.data.original_title;
  const runtime = props.data.runtime;
  const overview = props.data.overview;
  const tagline = props.data.tagline;
  const backdrop_path = props.data.backdrop_path;

  const release_date = props.data.first_date;
  const similar = props.data.similar;
  const vote_average = props.data.vote_average;
  const genresId = props.data.genres_Id;

  const videoSource = useGetVideoKey(id, language, mediaType);
  const videoKey = videoSource.videoKey;


  useEffect(() => {
    props.getMediaDetails({ id: id, lang: language, type: "tv" });
  }, [id, language, statusLog]);

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

    const img = document.querySelector(".background-container");

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
        setHideInfo(true)
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
        setTimeout(() => {
          // setVideoKey(null);
        }, 2500);
      }, 60000);

      return () => {
        clearInterval(intervalId);
      };
    }, 4000);
  }, [id]);

  if (statusLog === "true") {
    return (
      <div className={`MovieContainer ${isMouseMoving ? '' : 'isMouseMoving'} ${hideInfo? '' : 'hideInfo'}`} key={id}>
        
        <div className="MovieInner" onMouseMove={() => setIsMouseMoving(true)}>
          <span className="background-container">
            <span className="mute-btn" onClick={handleMuteToggle}>
              {!isMuted ? <Volume1 /> : <VolumeX />}
            </span>
            <span className="img-container">
              <section className="current-media">
                {videoKey ? (
                  <Player videoKey={videoKey} isMuted={isMuted} controlsMode={0}></Player>
                ) : (
                  ""
                )}
              </section>

              <img src={`${image_path}${backdrop_path}`} alt={title} />
              <span className="background-filter" />
              <span className="background-filter2" />
            </span>
          </span>

          <CurrentTv
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
          ></CurrentTv>

          <div className="selectSection options-info-btn">
            <span
              className={`select ${
                sectionActived === "slider" ? "active" : ""
              }`}
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

        <InfoDetails
          sectionActived={sectionActived}
          spoken_languages={props.spoken_languages}
          starring={props.data.starring}
          directors={props.data.directors}
          producers={props.data.producers}
          studios={props.data.studios}
          subtitles={props.data.subtitles}
          mediaType={mediaType}
          language={language}
        />
      </div>
    );
  } else {
    return <LoginPage mediaType={"tv"}></LoginPage>;
  }
};

const mapStateToProps = (state) => {
  return {
    data: state.media.data,
    language: state.lang.dataLang,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getMediaDetails: (mediaParam) => dispatch(getMediaDetails(mediaParam)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Tv);
