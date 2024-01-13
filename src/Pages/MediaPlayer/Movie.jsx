import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { getMediaDetails } from "../../store/actions/Media/mediaAction";

import { Volume1, VolumeX } from "lucide-react";

import LoginPage from "../Login/Login";
import CurrentMovie from "../../Components/Movie/CurrentMovie.jsx";
import BackdropSlider from "../../Components/Sliders/BackdropSlider/BackdropSlider";
import { guestApiKey } from "../../Services/guestApi.js";
import axios from "axios";

import Player from "../../Components/Movie/Player/Player.jsx";

import "./Movie.css";

const Movie = (props) => {
  const [sectionActived, setSectionActived] = useState("slider");
  const [videoKey, setVideoKey] = useState("");

  const { id } = useParams();
  const statusLog = localStorage.getItem("statusLog");
  const mediaType = "movie";
  const image_path = "https://image.tmdb.org/t/p/original/";

  const language = props.language;

  const title = props.data.title;
  const original_title = props.data.original_title;
  const runtime = props.data.runtime;
  const overview = props.data.overview;
  const tagline = props.data.tagline;
  const backdrop_path = props.data.backdrop_path;
  const release_date = props.data.release_date;
  const similar = props.data.similar;
  const vote_average = props.data.vote_average;
  const genresId = props.data.genres_Id;
  const starring = props.data.starring;
  const directors = props.data.directors;
  const producers  = props.data.producers ;



  const selectedGenre = 18;

  useEffect(() => {
    props.getMediaDetails({ id: id, lang: language, type: "movie" });
  }, [id, language, statusLog]);

  const [isMuted, setIsMuted] = useState(true);

  const handleMuteToggle = () => {
    setIsMuted((prevIsMuted) => !prevIsMuted);
  };

  const lang = localStorage.getItem("country");
  const lang2 = lang === "pt-BR" ? "en-US" : "pt-BR";

  const APIKey = guestApiKey;

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();

    const videoFilter = (videoArray) => {
      const filteredVideos = videoArray.filter(
        (video) =>
          video.official !== false &&
          !video.name.toLowerCase().includes("acessibilidade") &&
          !video.name.toLowerCase().includes("accessibility")
      );

      const trailerVideos = filteredVideos.filter(
        (video) => video.type === "Trailer"
      );
      const otherVideos = filteredVideos.filter(
        (video) => video.type !== "Trailer"
      );

      const orderedVideos = [...trailerVideos, ...otherVideos];

      let preferredVideo = null;

      for (const video of orderedVideos) {
        if (video.name.toLowerCase().includes("dublado")) {
          preferredVideo = video;
          break;
        } else if (!preferredVideo) {
          preferredVideo = video;
        }
      }

      return preferredVideo ? preferredVideo.key : null;
    };

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/videos?language=${lang}&api_key=${APIKey}`,
          {
            cancelToken: cancelTokenSource.token,
          }
        );

        const initialData = response.data.results;

        if (videoFilter(initialData) === null) {
          const res = await axios.get(
            `https://api.themoviedb.org/3/movie/${id}/videos?language=${lang2}&api_key=${APIKey}`,
            {
              cancelToken: cancelTokenSource.token,
            }
          );

          const data = res.data.results;

          setTimeout(() => {
            setVideoKey(videoFilter(data));
          }, 0);
        } else {
          setTimeout(() => {
            setVideoKey(videoFilter(initialData));
          }, 0);
        }
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request canceled:", error.message);
        } else {
          console.error("Error fetching data:", error.message);
        }
      }
    };

    fetchData();

    return () => {
      cancelTokenSource.cancel("Componente desmontado ou mudança em id/lang");
    };
  }, [id, lang, lang2, APIKey]);

  useEffect(() => {
    const img = document.querySelector(".background-container");

    setTimeout(() => {
      img.classList.add("activeMedia");

      setInterval(() => {
        img.classList.remove("activeMedia");
        setTimeout(() => {
          setVideoKey(null);
        }, 2500);
      }, 34000);
    }, 4000);
  }, [id]);

  if (statusLog === "true") {
    return (
      <div className="MovieContainer" key={id}>
        <div className="MovieInner">
          <span className="background-container">
            <span className="mute-btn" onClick={handleMuteToggle}>
              {!isMuted ? <Volume1 /> : <VolumeX />}
            </span>
            <span className="img-container">
              <section className="current-media">
                {videoKey ? (
                  <Player videoKey={videoKey} isMuted={isMuted}></Player>
                ) : (
                  ""
                )}
              </section>

              <img src={`${image_path}${backdrop_path}`} alt={title} />
              <span className="background-filter" />
              <span className="background-filter2" />
            </span>
          </span>

          <CurrentMovie
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
          ></CurrentMovie>

          <div className="selectSection">
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

        <div className="info-details">
          {sectionActived === "slider" ? (
            <BackdropSlider
              sectionTitle="Costumers also watched"
              mediaType={mediaType}
              language={language}
              suprimeTitle={false}
              filterMode={"recomendations"}
              selectedGenre={selectedGenre}
            />
          ) : (
            ""
          )}

          <div
            className="Recomentations-info"
            style={{
              display: sectionActived === "media-info" ? "flex" : "none",
            }}
          >
            <section className="SectionTitle">
              <h2>More info</h2>
            </section>

            {directors ? (
              <div className="info-container">
                <h2>Directors</h2>
                <div></div>
                {directors &&
                  directors.map((director) => (
                    <div className="info-item">
                      <Link
                        to={`/suprime-video/search`}
                        key={director.id}
                        className="truncate-text"
                      >
                        {`${director.name}`}
                      </Link>
                    </div>
                  ))}
              </div>
            ) : (
              ""
            )}
            {producers ? (
              <div className="info-container">
                <h2>Producers</h2>
                <div className="info-item">
                  {producers &&
                    producers.map((producer) => (
                      <Link
                        to={`/suprime-video/search`}
                        key={producer.id}
                        className="truncate-text"
                      >
                        {`${producer.name},`}
                      </Link>
                    ))}
                </div>
              </div>
            ) : (
              ""
            )}

            {starring ? (
              <div className="info-container">
                <h2>Starring</h2>
                <div className="info-item">
                  {starring &&
                    starring.map((star) => (
                      <Link
                        to={`/suprime-video/search/${star.id}`}
                        key={star.id}
                        className="truncate-text"
                      >
                        {`${star.name},`}
                      </Link>
                    ))}
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    );
  } else {
    return <LoginPage mediaType={"Movie"}></LoginPage>;
  }
};

const mapStateToProps = (state) => {
  return {
    data: state.media.data,
    language: state.lang.dataLang,
  };
};

const mapDispatchToPorps = (dispatch) => {
  return {
    getMediaDetails: (mediaParam) => dispatch(getMediaDetails(mediaParam)),
  };
};

export default connect(mapStateToProps, mapDispatchToPorps)(Movie);
