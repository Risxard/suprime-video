import React from "react";
import useMediaClassification from "../../hooks/MediaClassification/useMediaClassification";
import { RATINGS } from "../../assets/ratings";
import "./styles.css";

const MediaClass = ({ id, language, mediaType }) => {
  const mediaClass = useMediaClassification({ id, language, mediaType });

  const region =
    language === "pt-BR" ? "BR" : language === "es-ES" ? "ES" : "US";

  const badge = region ? RATINGS[region]?.[mediaClass] : null;

  if (!mediaClass) return null;


  const TITLE_TRANSLATIONS = {
    "pt-BR": "Classificação",
    "es-ES": "Clasificación",
    "en-US": "Rating",
  };

  const titleText = `${TITLE_TRANSLATIONS[language] || "Rating"}: ${mediaClass}`;

  return (
    <span className="ageClass">
      {badge ? (
        <img
          src={badge}
          alt={`${region} ${mediaClass}`}
          title={titleText}
        />
      ) : (
        <span className="usAgeClass">{mediaClass}</span>
      )}
    </span>
  );
};

export default MediaClass;
