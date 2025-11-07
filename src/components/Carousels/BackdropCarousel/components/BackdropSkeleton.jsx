import { useState, useEffect } from "react";
import "./styles.css";

const BackdropSkeleton = () => {
  const [numItems, setNumItems] = useState(2);

  useEffect(() => {
    const updateNumItems = () => {
      if (window.matchMedia("(min-width: 1440px)").matches) {
        setNumItems(5);
      } else if (window.matchMedia("(min-width: 1024px)").matches) {
        setNumItems(4);
      } else if (window.matchMedia("(min-width: 768px)").matches) {
        setNumItems(3);
      } else {
        setNumItems(2);
      }
    };

    updateNumItems();
    window.addEventListener("resize", updateNumItems);

    return () => window.removeEventListener("resize", updateNumItems);
  }, []);

  const items = Array.from({ length: numItems });

  return (
    <section className="set-skeleton">
      <div className="backdrop-container">
        <div className="backdrop-carousel">
          {items.map((_, index) => (
            <div className="backdrop-item" key={index}>
              <a href="#">
                <div className="backdrop-item-content">
                  <div className="backdrop-item-image"></div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BackdropSkeleton;
