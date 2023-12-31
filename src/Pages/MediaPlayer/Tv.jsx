import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import LoginPage from "../Login/Login";
import CurrentTv from "../../components/Tv/CurrentTv";
import BackdropSlider from "../../components/Sliders/BackdropSlider/BackdropSlider";
import MenuSlider from "../../components/Header/MenuSlider/MenuSlider.jsx";

import { connect } from "react-redux";
import { getMediaDetails } from "../../store/actions/Media/mediaAction";

import "./Movie.css";

const Tv = (SectionData) => {
  const { id } = useParams();
  const statusLog = localStorage.getItem("statusLog");
  const mediaType = "tv";
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
  const first_date = SectionData.data.first_date;
  const last_date = SectionData.data.last_date;
  const similar = SectionData.data.similar;
  const vote_average = SectionData.data.vote_average;
  const genresId = SectionData.data.genres_Id;

  const vote = vote_average;

  useEffect(() => {
    SectionData.getMediaDetails({ id: id, lang: language, type: "tv" }); // os dados serão retornados usando o id da mídia passada como parametro
  }, [id, language, statusLog]);

  const recomendations = `3/tv/${id}/recommendations?language=${language}&page=1`;

  if (statusLog === "true") {
    return (
      <div className="MovieContainer">

        <div className="MovieInner">
          <span className="background-container">
            <img src={`${image_path}${backdrop_path}`} alt={title} />
            <span className="background-filter" />
            <span className="degrade"></span>
          </span>

          <CurrentTv
            video={videoKey}
            title={title}
            original_title={original_title}
            runtime={runtime}
            overview={overview}
            tagline={tagline}
            backdrop_path={backdrop_path}
            first_date={first_date}
            last_date={last_date}
            vote_average={vote_average}
            genres_Id={genresId}
            mediaType={mediaType}
            similar={similar}
            language={language}
          ></CurrentTv>
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
    return <LoginPage mediaType={"tv"}></LoginPage>;
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

export default connect(mapStateToProps, mapDispatchToPorps)(Tv);
