import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import LiveShow from "./LiveShow/LiveShow";
import BackdropSlider from "../SliderComponents/BackdropSlider/BackdropSlider.jsx";
import "./Main.css";
import PosterSlider from "../SliderComponents/PosterSlider/PosterSlider";

import useTop10 from "../../hooks/Sliders/useTop10/useTop10.jsx";


function Main(SectionData) {
  const [visibleSections, setVisibleSections] = useState(0);
  const language = useSelector((state) => state.lang.language);
  const pageType = SectionData.pageType;


  const medias = useTop10({language, pageType})

  useEffect(() => {
    const intersectionObserver = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        setVisibleSections((prevVisibleSections) => prevVisibleSections + 1);

      }
    });
    intersectionObserver.observe(document.querySelector("#InfiniteCheck"));
    return () => intersectionObserver.disconnect();
  }, []);

  const sectionsToRender = Object.values(MovieList).slice(0, visibleSections);




  return (
    <main>


      <PosterSlider
        id={"MostPopular"}
        sectionTitle={"Most Popular"}
        genre={`3/trending/all/week?language=${language}&page=1`}
      ></PosterSlider>

      {sectionsToRender.map((section) => (
        <BackdropSlider
          id={section.key}
          sectionTitle={section.listName}
          genre={section.link}
          key={section.key}
          language={language}
        ></BackdropSlider>
      ))}

      <span id="InfiniteCheck"></span>
    </main>
  );
}



export default Main;
