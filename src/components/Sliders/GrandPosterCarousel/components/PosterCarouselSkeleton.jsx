import { useEffect, useState } from "react";

const PosterCarouselSkeleton = ({ card_size }) => {
  const [numItems, setNumItems] = useState(card_size === "ss-card" ? 3 : 2);

  useEffect(() => {
    const updateNumItems = () => {
      const isSmallCard = card_size === "ss-card";

      if (window.matchMedia("(min-width: 1440px)").matches) {
        setNumItems(isSmallCard ? 6 : 5);
      } else if (window.matchMedia("(min-width: 1024px)").matches) {
        setNumItems(isSmallCard ? 5 : 4);
      } else if (window.matchMedia("(min-width: 768px)").matches) {
        setNumItems(isSmallCard ? 4 : 3);
      } else {
        setNumItems(isSmallCard ? 3 : 2);
      }
    };

    updateNumItems();
    window.addEventListener("resize", updateNumItems);
    return () => window.removeEventListener("resize", updateNumItems);
  }, [card_size]);

  const items = Array.from({ length: numItems });

  return (
    <section>
      <div
        className={`grandPoster-carousel-Container ${
          card_size ? card_size : ""
        }`}
      >
        <div className="grandPoster-carousel">
          <div className="grandPoster-carousel-list">
            {items.map((_, index) => (
              <div className="grandPoster-carousel-item" key={index}>
                <a href="#">
                  <div className="grandPoster-carousel-item-container">
                    <div className="grandPoster-carousel-item-image"></div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PosterCarouselSkeleton;
