import { useEffect, useState } from "react";
import "../styles.css";

const ChannelIntro = ({ video, desktopImage, mobileImage, logo }) => {
  const [videoEnded, setVideoEnded] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [introOpacity, setIntroOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const fadeStart = 0;
      const fadeEnd = 400;
      const opacityRange = 1 - 0.2;
      const opacity = Math.max(
        0.2,
        1 - ((scrollY - fadeStart) / fadeEnd) * opacityRange
      );
      setIntroOpacity(opacity);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="channel-intro" style={{ opacity: introOpacity }}>
      <div className="channel-intro-content">
        <span className="channel-intro-filter" />

        <video
          autoPlay
          muted
          playsInline
          src={video}
          poster={desktopImage}
          onPlay={() => setIsVideoPlaying(true)}
          onEnded={() => setVideoEnded(true)}
          className={`intro-video ${
            videoEnded ? "fade-out" : isVideoPlaying ? "fade-in" : "hidden"
          }`}
        />

        <div
          className={`channel-intro-content-image ${
            videoEnded ? "fade-in" : "hidden"
          }`}
        >
          <img src={desktopImage} alt="Intro Desktop" />
          <img src={mobileImage} alt="Intro Mobile" />
        </div>
      </div>

      <div
        className={`channel-intro-image-container ${
          videoEnded ? "fade-in" : "hidden"
        }`}
      >
        <img src={logo} alt="Channel Logo" />
      </div>
    </section>
  );
};

export default ChannelIntro;
