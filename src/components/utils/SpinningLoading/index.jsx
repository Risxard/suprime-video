import spinnerLoading from "../../../assets/spinner-loader-aurora.png";
import "./styles.css";

const SpinningLoading = () => (
  <div className="loading-screen-component spinning-loading">
    <div className="loading-component">
      <img src={spinnerLoading} alt="Loading..." />
    </div>
  </div>
);

export default SpinningLoading;
