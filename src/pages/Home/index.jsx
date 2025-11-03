import React from "react";
import { homeSections } from "../../config/homeSectionsConfig";

import "./styles.css";
import LazySection from "../../components/utils/LazySection";

const Home = () => {
  return (
    <div className="Home">
      <main>
        {homeSections.map((section, idx) => (
          <LazySection key={section.id} section={section} index={idx} />
        ))}
      </main>
      <div className="app-background" />
    </div>
  );
};

export default Home;
