import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import LiveShow from "./LiveShow/LiveShow";
import BackdropSlider from "../SliderComponents/BackdropSlider/BackdropSlider.jsx";
import "./Main.css";
import PosterSlider from "../SliderComponents/PosterSlider/PosterSlider";

import useTop10 from "../../hooks/Sliders/useTop10/useTop10.jsx";

import Top10Slider from "../SliderComponents/Top10Slider/Top10Slider.jsx";

const MovieList = {
    horror: {
      key: 0,
      listName: 'Horror Movies',
      link: `3/discover/movie?include_adult=false&include_video=false&page=1&sort_by=popularity.desc&with_genres=27`,
    },
    horror: {
      key: 0,
      listName: 'Horror Series',
      link: `3/discover/movie?include_adult=false&include_video=false&page=1&sort_by=popularity.desc&with_genres=27`,
    },
    adventure: {
      key: 1,
      listName: 'Adventure Movies',
      link: `3/discover/movie?include_adult=false&include_video=false&page=1&sort_by=popularity.desc&with_genres=12`,
    },
    comedy: {
      key: 2,
      listName: 'Comedy Movies',
      link: `3/discover/movie?include_adult=false&include_video=false&page=1&sort_by=popularity.desc&with_genres=35`,
    },
    crime: {
      key: 3,
      listName: 'Crime Movies',
      link: `3/discover/movie?include_adult=false&include_video=false&page=1&sort_by=popularity.desc&with_genres=80`,
    },
    drama: {
      key: 4,
      listName: 'Drama Movies',
      link: `3/discover/movie?include_adult=false&include_video=false&page=1&sort_by=popularity.desc&with_genres=18`,
    },
    romance: {
      key: 5,
      listName: 'Romance Movies',
      link: `3/discover/movie?include_adult=false&include_video=false&page=1&sort_by=popularity.desc&with_genres=10749`,
    },
    ScienceFiction: {
      key: 6,
      listName: 'Science Fiction Movies',
      link: `3/discover/movie?include_adult=false&include_video=false&page=1&sort_by=popularity.desc&with_genres=878`,
    },
  };

function Main(SectionData) {
  const [visibleSections, setVisibleSections] = useState(0);
  const language = SectionData.language;
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
      {/* <LiveShow language={language}></LiveShow> */}

      <Top10Slider medias={medias} language={language}/>

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

const mapStateToProps = (state) => {
  return {
    language: state.lang.dataLang,
  };
};

export default connect(mapStateToProps)(Main);
