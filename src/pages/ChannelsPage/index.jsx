import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { channelsConfig } from "../../config/channelsConfig";
import ChannelIntro from "./components/ChannelIntro";
import LazySection from "../../components/utils/LazySection";
import "./styles.css";

const ChannelsPage = () => {
  const { channelId } = useParams();
  const navigate = useNavigate();
  const config = channelsConfig[channelId];

  useEffect(() => {
    if (!config) navigate("/404", { replace: true });
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

      <main className="channels-page-content">
        {config.sections.map((section, idx) => (
          <LazySection
            key={`${channelId}-section-${idx}`}
            section={section}
            index={idx}
          />
        ))}
      </main>
    </div>
  );
};

export default ChannelsPage;
