import React, { useState, useEffect } from "react";
import "./Header.css";
import FeatureSlider from "../Sliders/FeatureSlider/FeatureSlider";
import useHero from "../../hooks/Sliders/useHero/useHero";
import { useSelector } from "react-redux";

const Header = ({pageType}) => {
  const [medias, setmedias] = useState([]);
  const language = useSelector((state) => state.lang.language);

  const heroSlider = useHero({ language, pageType });

  return (
    <header>
      <FeatureSlider mediasData={heroSlider} />
    </header>
  );
};

export default Header;
