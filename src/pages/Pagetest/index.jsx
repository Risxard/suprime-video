import React, { useEffect, useState } from "react";
import "./styles.css";
import { profileService } from "../../services/firebase/profileServices";
import { userServices } from "../../services/firebase/userServices";
import { set } from "react-hook-form";
import { useSelector } from "react-redux";
import useHero from "../../hooks/Sliders/useHero/useHero";
import HeroCarousel from "../../components/Sliders/HeroCarousel/HeroCarousel";
import ChannelSection from "../../components/ChannelSection";

const Pagetest = () => {
  const pageType = "all";
  const page = 1;
  const timeWindow = "day";

  const language = useSelector((state) => state.lang.language);

  const heroSlider = useHero({ pageType, language, page, timeWindow });

  const data = heroSlider.movies;

  const top10Hero = Array.isArray(data) ? heroSlider.movies.slice(0, 15) : [];

  return (
    <div className="pagetest">
      <header>
        <div>
          <HeroCarousel mediasData={top10Hero} />
        </div>
      </header>

      <main>
        <ChannelSection />
      </main>
    </div>
  );
};

export default Pagetest;
