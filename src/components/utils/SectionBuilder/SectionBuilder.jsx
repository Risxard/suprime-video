import React from "react";
import "./styles.css";

const SectionBuilder = ({ children, sectionTitle }) => {
  return (
    <section>
      <div className="section-title">
        <h4>{sectionTitle}</h4>
      </div>

      {children}
    </section>
  );
};

export default React.memo(SectionBuilder);