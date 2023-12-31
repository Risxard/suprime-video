import React from "react";

const SpinnerLoading = () => {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        style={{
          margin: "auto",
          background: "transparent",
          display: "block",
          shapeRendering: "auto"
        }}
        width="200px"
        height="200px"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
      >
        <circle
          cx="50"
          cy="50"
          fill="none"
          stroke="#4f4e50"
          strokeWidth="10"
          r="35"
          strokeDasharray="164.93361431346415 56.97787143782138"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            repeatCount="indefinite"
            dur="0.5319148936170213s"
            values="0 50 50;360 50 50"
            keyTimes="0;1"
          />
        </circle>
      </svg>
    </div>
  );
};

export default SpinnerLoading;
