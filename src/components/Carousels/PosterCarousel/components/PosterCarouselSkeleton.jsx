import { useEffect, useState } from "react";
import "./styles.css";

const PosterCarouselSkeleton = ({ card_size = "" }) => {
  if (card_size === "ss-card") return <PosterCarouselSmallSkeleton />;
  if (card_size === "sm-card") return <PosterCarouselMediumSkeleton />;
  return <PosterCarouselBigSkeleton />;
};

const SkeletonList = ({ numItems, containerClass = "" }) => {
  const items = Array.from({ length: numItems });

  return (
    <>
      <div
        className="section-title"
        style={{ opacity: 0, visibility: "hidden" }}
      >
        <h4>text placeholder</h4>
      </div>
      <section>
        <div className={`poster-carousel-Container skeleton ${containerClass}`}>
          <div className="poster-carousel">
            <div className="poster-carousel-list">
              {items.map((_, index) => (
                <div
                  className="poster-carousel-item"
                  key={index}
                  role="status"
                  aria-busy="true"
                >
                  <a href="#">
                    <div className="poster-carousel-item-container">
                      <div className="poster-carousel-item-image"></div>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const useResponsiveCount = (defaults) => {
  const { base = 2, md = 3, lg = 4, xl = 5 } = defaults || {};
  const [num, setNum] = useState(base);

  useEffect(() => {
    const update = () => {
      if (window.matchMedia("(min-width: 1440px)").matches) setNum(xl);
      else if (window.matchMedia("(min-width: 1024px)").matches) setNum(lg);
      else if (window.matchMedia("(min-width: 768px)").matches) setNum(md);
      else setNum(base);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [base, md, lg, xl]);

  return num;
};

const PosterCarouselBigSkeleton = () => {
  const numItems = useResponsiveCount({ base: 2, md: 3, lg: 4, xl: 5 });
  return <SkeletonList numItems={numItems} />;
};

const PosterCarouselMediumSkeleton = () => {
  const numItems = useResponsiveCount({ base: 2, md: 3, lg: 4, xl: 5 });
  return <SkeletonList numItems={numItems} containerClass="sm-card" />;
};

const PosterCarouselSmallSkeleton = () => {
  const numItems = useResponsiveCount({ base: 3, md: 4, lg: 5, xl: 6 });
  return <SkeletonList numItems={numItems} containerClass="ss-card" />;
};

export default PosterCarouselSkeleton;
