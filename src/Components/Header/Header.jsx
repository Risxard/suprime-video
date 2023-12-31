import React from "react";

import "./Header.css";

import FeatureSlider from "../Sliders/FeatureSlider/FeatureSlider";

const Header = (SectionData) => {
  const logged = localStorage.getItem("statusLog");
  const language = SectionData.language;
  const pageType = SectionData.pageType;

  const heroSlider = SectionData.heroSlider;

  return (
    <header>
      <FeatureSlider
        language={language}
        pageType={pageType}
        medias={heroSlider}
      ></FeatureSlider>
    </header>
  );
};

export default Header;
