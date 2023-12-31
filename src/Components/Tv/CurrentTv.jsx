import React, { useEffect, useState } from "react";

import { guestApiKey } from "../../services/guestApi.js";

import { useParams } from "react-router-dom";
import axios from "axios";

import Player from "../../components/Movie/Player/Player.jsx";

import MovieForYour from "../Movie/MoviesForYou/MoviesFor.jsx";

import "../../pages/MediaPlayer/Movie.css";

import TvDetails from "./TvDetails/TvDetails.jsx";

var Tv = (SectionData) => {
  const [videoKey, setVideoKey] = useState("");

  const image_path = "https://image.tmdb.org/t/p/original";
  const image = SectionData.backdrop_path;

  const title = SectionData.title;
  const language = SectionData.language;
  const similar = SectionData.similar;
  const mediaType = SectionData.mediaType;

  const { id } = useParams();
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
          `https://api.themoviedb.org/3/tv/${id}/videos?language=${lang}&api_key=${APIKey}`,
          {
            cancelToken: cancelTokenSource.token,
          }
        );

        const initialData = response.data.results;


        if (videoFilter(initialData) === null) {
          const res = await axios.get(
            `https://api.themoviedb.org/3/tv/${id}/videos?language=${lang2}&api_key=${APIKey}`,
            {
              cancelToken: cancelTokenSource.token,
            }
          );

          const data = res.data.results;
          setVideoKey(videoFilter(data));
        } else {
          setVideoKey(videoFilter(initialData));
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
  }, [id, lang, lang2, APIKey, SectionData]);

  return (
    <div className="Movie">
      <section className="current-media">
        {videoKey ? (
          <Player videoKey={videoKey}></Player>
        ) : (
          <div className="movie-image-container">
            <span className="movie-image-filter"></span>
            {image ? <img src={`${image_path}${image}`} alt={title} /> : ""}
          </div>
        )}
      <section className="MoviesForYou">
        <div className="MoviesForYouTitle">
          <h2>Series for you</h2>
        </div>
        <div className="MovieList">
          {similar
            ? similar.map((movie) => {
                return (
                  <MovieForYour
                    key={movie.id}
                    id={movie.id}
                    poster_path={movie.poster_path}
                    mediaType={mediaType}
                    title={movie.name}
                    language={language}
                  />
                );
              })
            : ""}
        </div>
      </section>

      </section>
      <section>
          <TvDetails
            title={SectionData.title}
            original_title={SectionData.original_title}
            runtime={SectionData.runtime}
            overview={SectionData.overview}
            tagline={SectionData.tagline}
            backdrop_path={SectionData.backdrop_path}
            first_date={SectionData.first_date}
            last_date={SectionData.last_date}
            vote_average={SectionData.vote_average}
            genres_Id={SectionData.genresId}
            mediaType={mediaType}
            similar={similar}
            language={language}
          />
        </section>

    </div>
  );
};

export default Tv;
