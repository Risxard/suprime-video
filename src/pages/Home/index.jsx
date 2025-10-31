import React from "react";
import "./styles.css";
import { homeConfig } from "../../config/homeConfig";
import LazyCarousel from "../../components/utils/LazyCarousel";

const Home = () => {
  const pageType = "all";
  const timeWindow = "day";

  return (
    <div className="Home">
      <main>
        <section className="home-main-section">
          {homeConfig.map((carousel, idx) => (
            <LazyCarousel
              key={idx}
              title={carousel.title}
              type={carousel.type}
              component={carousel.component}
              skeleton={carousel.skeleton}
              fetchFn={carousel.fetchFn}
              top10mode={carousel.top10mode}
              fetchParams={carousel.fetchParams}
              card_size={carousel.card_size}
            />
          ))}
        </section>
      </main>

      <div className="app-background" />
    </div>
  );
};

export default Home;
