import "./styles.css";

const CardLabel = ({ topNumber }) => {
  return (
    <div className={`card-label`}>
      <svg
        width="376"
        height="377"
        viewBox="0 0 376 377"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 0V376.5C104.854 203.276 187.902 121.342 375.5 0H0Z"
          fill="url(#paint0_linear_446_44)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_446_44"
            x1="0"
            y1="0"
            x2="111.5"
            y2="103.5"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#085568" />
            <stop offset="1" stopColor="#052A37" />
          </linearGradient>
        </defs>
      </svg>

      <span className="card-label-number">{topNumber}</span>
    </div>
  );
};

export default CardLabel;
