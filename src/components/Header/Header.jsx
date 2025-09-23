import React, { useState, useEffect } from "react";
import "./Header.css";
import FeatureSlider from "../Sliders/FeatureSlider/FeatureSlider";
import useHero from "../../hooks/Sliders/useHero/useHero";
import { useSelector } from "react-redux";

const Header = ({ pageType, page, timeWindow }) => {
  const language = useSelector((state) => state.lang.language);

  const heroSlider = useHero({ pageType, language, page, timeWindow });

  const data = heroSlider.movies

  const top10Hero = Array.isArray(data)
    ? heroSlider.movies.slice(0, 10)
    : [];

  return (
    <header>
      <FeatureSlider mediasData={top10Hero} />
    </header>
  );
};

export default Header;
