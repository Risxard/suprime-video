import "../HeroCarousel.css";

const HeroCarouselSkeleton = () => {
  return (
    <div className="hero-carousel-Container">
      <div className="hero-carousel-List">
        <div className={`hero-carousel-Item`}>
          <a href="">
            <div className="hero-carousel-Item-Container">
              <div className="hero-carousel-info-container">
                <div className="hero-carousel-info-content"></div>
              </div>
            </div>
          </a>
        </div>
      </div>

      <div className="slider-dots"></div>
    </div>
  );
};

export default HeroCarouselSkeleton;
