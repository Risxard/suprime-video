import React from "react";
import { useSelector } from "react-redux";
import LazySection from "../../components/utils/LazySection";
import { homeSections } from "../../config/homeSectionsConfig";
import './styles.css'

const Home = () => {
  const language = useSelector((state) => state.lang.language);

  const sections = homeSections(language);

  return (
    <div className="Home">
      <main>
        {sections.map((section, idx) => (
          <LazySection key={section.id} section={section} index={idx} />
        ))}
      </main>

      <div className="app-background" />
    </div>
  );
};

export default Home;
