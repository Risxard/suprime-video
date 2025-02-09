import React, { useEffect, useState } from "react";
import "./styles.css";
import PosterSlider from "../../Components/Sliders/PosterSlider/PosterSlider";
import { useSelector } from "react-redux";

const PageTest = () => {
  const language = useSelector((state) => state.lang.language);

  return (
    <div className="page-test-container">
      <PosterSlider
        suprimeTitle={true}
        sectionTitle={"The week's most popular"}
        selectedGenre={28}
        language={language}
        filterMode={"trending"}
        filterScope={"all"}
        timeWindow={"week"}
      ></PosterSlider>
    </div>
  );
};

export default PageTest;
