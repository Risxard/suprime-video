import React from "react";
import { Link } from "react-router-dom";
import BackdropSlider from "../../Sliders/BackdropSlider/BackdropSlider";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import "./styles.css";

const InfoDetails = (props) => {
  const sectionActived = props.sectionActived;
  const mediaType = props.mediaType;
  const language = i18next.language;
  const selectedGenre = props.selectedGenre;
  const spoken_languages = props.spoken_languages;
  const subtitles = props.subtitles;
  const directors = props.directos;
  const producers = props.producers;
  const starring = props.starring;
  const studios = props.studios;

  const { t } = useTranslation();

  const detailPage = t("detailPage");

  return (
    <div className="info-details">
      {sectionActived === "slider" && (
        <div className="recomendations-container">
          <BackdropSlider
            sectionTitle={detailPage.costumersAlsoWatch}
            mediaType={mediaType}
            recomendations={true}
            language={language}
            mediaId={props.mediaId}
          />
        </div>
      )}

      <div
        className="Recomentations-info"
        style={{
          display: sectionActived === "media-info" ? "flex" : "none",
        }}
      >
        <section className="SectionTitle">
          <h2>{detailPage.moreInfo.title}</h2>
        </section>

        {spoken_languages && (
          <div className="info-container">
            <h2>{detailPage.moreInfo.audioLanguage.title}</h2>
            <ul>
              {spoken_languages &&
                spoken_languages.map((spoken, index) => (
                  <li className="info-item text" key={index}>
                    <p>{`${spoken.english_name}`}</p>
                  </li>
                ))}
            </ul>
          </div>
        )}

        {subtitles && (
          <div className="info-container">
            <h2>{detailPage.moreInfo.subtitles.title}</h2>
            <ul>
              {subtitles &&
                subtitles.map((subtitle, index) => (
                  <li className="info-item text" key={index}>
                    <p>{`${subtitle.english_name}`}</p>
                  </li>
                ))}
            </ul>
          </div>
        )}

        {directors && (
          <div className="info-container">
            <h2>{detailPage.moreInfo.directors.title}</h2>
            <ul>
              {directors &&
                directors.map((director, index) => (
                  <li className="info-item info-link" key={index}>
                    <Link to={`/search/person=${director.id}`}>
                      {director.name}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        )}

        {producers && (
          <div className="info-container">
            <h2>{detailPage.moreInfo.producers.title}</h2>
            <ul>
              {producers &&
                producers.map((producer, index) => (
                  <li
                    to={`/search`}
                    className="info-item info-link"
                    key={index}
                  >
                    <Link to={`/search/person=${producer.id}`}>
                      {producer.name}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        )}

        {starring && (
          <div className="info-container">
            <h2>{detailPage.moreInfo.starring.title}</h2>
            <ul>
              {starring &&
                starring.map((star) => (
                  <li className="info-item info-link" key={star.id}>
                    <Link to={`/search/person=${star.id}`}>{star.name}</Link>
                  </li>
                ))}
            </ul>
          </div>
        )}

        {studios && (
          <div className="info-container">
            <h2>{detailPage.moreInfo.studio.title}</h2>
            <ul>
              {studios &&
                studios.map((studio) => (
                  <li className="info-item studio" key={studio.id}>
                    <p>{`${studio.name}`}</p>
                  </li>
                ))}
            </ul>
          </div>
        )}

        <div className="info-container terms-of-use">
          <ul>
            <li className="info-item text">
              <p>
                {detailPage.moreInfo.termsOfUse.message1}
                <a href="">{detailPage.moreInfo.termsOfUse.message2}</a>
              </p>
            </li>
          </ul>
        </div>

        <div className="info-container feedback-support">
          <h2>{detailPage.moreInfo.feedback.title}</h2>
          <ul>
            <li className="info-item info-link">
              <a href="">{detailPage.moreInfo.feedback.sendFeedback}</a>
            </li>
          </ul>
        </div>

        <div className="info-container">
          <h2>{detailPage.moreInfo.support.title}</h2>
          <ul>
            <li className="info-item info-link">
              <a href="">{detailPage.moreInfo.support.getHelp}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InfoDetails;
