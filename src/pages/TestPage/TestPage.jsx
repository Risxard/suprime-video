import React from "react";
import LazySection from "../../components/utils/LazySection";
import { testPage } from "../../config/testPageConfig";

const TestPage = () => {
  return (
    <div className="Home">
      <main>
        {testPage.map((section, idx) => (
          <LazySection key={section.id} section={section} index={idx} />
        ))}
      </main>
      <div className="app-background" />
    </div>
  );
};

export default TestPage;
