import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { channelsConfig } from "../../config/channelsConfig";
import LazyCarousel from "../../components/utils/LazyCarousel/index.jsx";
import ChannelIntro from "./components/ChannelIntro";
import "./styles.css";
import HeroSection from "../../components/HeroSection";

const ChannelsPage = () => {
  const { channelId } = useParams();
  const navigate = useNavigate();
  const config = channelsConfig[channelId];

  useEffect(() => {
    if (!config) {
      navigate("/404", { replace: true });
    }
  }, [config, navigate]);

  if (!config) return null;

  return (
    <div className="channels-page">
      <ChannelIntro
        video={config.video}
        desktopImage={config.desktopImage}
        mobileImage={config.mobileImage}
        logo={config.logo}
      />

      <section className="channels-page-content">
        {config.carousels.map((carousel, idx) => (
          <LazyCarousel
            key={idx}
            title={carousel.title}
            type={carousel.type}
            fetchFn={carousel.fetchFn}
            fetchParams={carousel.fetchParams}
            card_size={carousel.card_size}
            top10mode={carousel.top10mode}
            component={carousel.component}
            skeleton={carousel.skeleton}
          />
        ))}
      </section>
    </div>
  );
};

export default ChannelsPage;
