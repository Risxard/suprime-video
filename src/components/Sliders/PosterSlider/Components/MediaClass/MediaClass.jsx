import React, { useEffect } from "react";
import useMediaClassification from "../../../../../hooks/MediaClassification/useMediaClassification";
import { bgDetect } from "../../../../../functions/Converter";

const MediaClass = (props) => {
  const id = props.id;
  const language = props.language;
  const mediaType = props.mediaType;
  const mediaClass = useMediaClassification({ id, language, mediaType });
  const bgClass = bgDetect(mediaClass);

  const mediaStyle = (
    <span
      className="ageClass"
      title=""
      style={{
        backgroundColor: language === "pt-BR" ? "#FFFFFF" : "noneF",
      }}
    >
      <h3
        style={{
          backgroundColor: bgClass,
          color: language === "pt-BR" ? "#FFFFFF" : "#E8ECEF",
          border: language === "en-US" ? "2px solid #E8ECEF" : "none",
        }}
      >
        {mediaClass}
      </h3>
    </span>
  );

  return <span>{mediaClass ? mediaStyle : ""}</span>;
};

export default MediaClass;
