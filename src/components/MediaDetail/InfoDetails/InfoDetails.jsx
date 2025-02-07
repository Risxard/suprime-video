import React from "react";

import { Link } from "react-router-dom";

import BackdropSlider from "../../Sliders/BackdropSlider/BackdropSlider";
import { useSelector } from "react-redux";

const InfoDetails = (props) => {
  const sectionActived = props.sectionActived;
  const mediaType = props.mediaType;
  const language = useSelector((state) => state.lang.language);
  const selectedGenre = props.selectedGenre;
  const spoken_languages = props.spoken_languages;
  const subtitles = props.subtitles;
  const directors = props.directos;
  const producers = props.producers;
  const starring = props.starring;
  const studios = props.studios;

  return (
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

        {spoken_languages ? (
          <div className="info-container">
            <h2>Audio language</h2>
            <ul>
              {spoken_languages &&
                spoken_languages.map((spoken, index) => (
                  <li className="info-item text" key={index}>
                    <p>{`${spoken.english_name}`}</p>
                  </li>
                ))}
            </ul>
          </div>
        ) : (
          ""
        )}

        {subtitles ? (
          <div className="info-container">
            <h2>Subtitles</h2>
            <ul>
              {subtitles &&
                subtitles.map((subtitle, index) => (
                  <li className="info-item text" key={index}>
                    <p>{`${subtitle.english_name}`}</p>
                  </li>
                ))}
            </ul>
          </div>
        ) : (
          ""
        )}

        {directors ? (
          <div className="info-container">
            <h2>Directors</h2>
            <ul>
              {directors &&
                directors.map((director, index) => (
                  <li className="info-item info-link" key={index}>
                    <Link to={`/search`}>
                      {" "}
                      {`${director.name}`}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        ) : (
          ""
        )}

        {producers ? (
          <div className="info-container">
            <h2>Producers</h2>
            <ul>
              {producers &&
                producers.map((producer, index) => (
                  <li
                    to={`/search`}
                    className="info-item info-link"
                    key={index}
                  >
                    <Link
                      to={`/search`}
                    >{`${producer.name}`}</Link>
                  </li>
                ))}
            </ul>
          </div>
        ) : (
          ""
        )}

        {starring ? (
          <div className="info-container">
            <h2>Starring</h2>
            <ul>
              {starring &&
                starring.map((star) => (
                  <li className="info-item info-link" key={star.id}>
                    <Link to={`/search`}>{`${star.name}`}</Link>
                  </li>
                ))}
            </ul>
          </div>
        ) : (
          ""
        )}

        {studios ? (
          <div className="info-container">
            <h2>Studio</h2>
            <ul>
              {studios &&
                studios.map((studio) => (
                  <li className="info-item studio" key={studio.id}>
                    <p>{`${studio.name}`}</p>
                  </li>
                ))}
            </ul>
          </div>
        ) : (
          ""
        )}

        <div className="info-container terms-of-use">
          <ul>
            <li className="info-item text">
              <p>
                By clicking play, you agree to our <a href="">Terms of Use</a>.
              </p>
            </li>
          </ul>
        </div>

        <div className="info-container feedback-support">
          <h2>Feedback</h2>
          <ul>
            <li className="info-item info-link">
              <a href="">Send us feedback</a>
            </li>
          </ul>
        </div>

        <div className="info-container">
          <h2>Support</h2>
          <ul>
            <li className="info-item info-link">
              <a href="">Get Help</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InfoDetails;
