import React from "react";
import "../styles.css";

const ChannelSectionSkeleton = () => {
  const placeholders = Array.from({ length: 7 });

  return (
    <div className="channels-section skeleton">
      <section>
        <div className="channels-group">
          {placeholders.map((_, index) => (
            <div className="channel-item" key={index}>
              <div className="channel-item-content">
                <div className="channel-item-image-container"></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ChannelSectionSkeleton;
