import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import LoginPage from "../Login/Login";
import CurrentMovie from "../../Components/Movie/CurrentMovie.jsx";
import BackdropSlider from "../../Components/Sliders/BackdropSlider/BackdropSlider";
import MenuSlider from "../../Components/Header/MenuSlider/MenuSlider.jsx";

import { connect } from "react-redux";
import { getMediaDetails } from "../../store/actions/Media/mediaAction";

import "./Movie.css";

const Movie = (SectionData) => {
  const { id } = useParams();
  const statusLog = localStorage.getItem("statusLog");
  const mediaType = "movie";
  const image_path = "https://image.tmdb.org/t/p/original/";

  const image = SectionData.backdrop_path;

  const language = SectionData.language;

  const videoKey = SectionData.data.videoKey;
  const title = SectionData.data.title;
  const original_title = SectionData.data.original_title;
  const runtime = SectionData.data.runtime;
  const overview = SectionData.data.overview;
  const tagline = SectionData.data.tagline;
  const backdrop_path = SectionData.data.backdrop_path;
  const release_date= SectionData.data.release_date;
  const similar = SectionData.data.similar;
  const vote_average = SectionData.data.vote_average;
  const genresId = SectionData.data.genres_Id;

  const vote = vote_average;

  useEffect(() => {
    SectionData.getMediaDetails({ id: id, lang: language, type: "movie" });
  }, [id, language, statusLog]);

  const recomendations = `3/movie/${id}/recommendations?language=${language}&page=1`;

  if (statusLog === "true") {
    return (
      <div className="MovieContainer">

        <div className="MovieInner">
          <span className="background-container">
            <img src={`${image_path}${backdrop_path}`} alt={title} />
            <span className="background-filter" />
            <span className="degrade"></span>
          </span>

          <CurrentMovie
            video={videoKey}
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
        </div>

        <BackdropSlider
          sectionTitle="Related Titles"
          genre={recomendations}
          mediaType={mediaType}
          language={language}
        />
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
