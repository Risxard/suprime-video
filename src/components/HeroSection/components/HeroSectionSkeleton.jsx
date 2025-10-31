import "../styles.css";

const HeroSectionSkeleton = () => {
  return (
    <div className="hero-section">
      <div className="hero-section-background">
        <div className="hero-section-image">
          <span className="hero-filter" />
        </div>
      </div>

      <div className="hero-section-content-wrapper">
        <div className="hero-section-info-content">
          <div className="hero-section-info-content-actions"></div>
        </div>
      </div>
    </div>
  );
};

export default HeroSectionSkeleton;
