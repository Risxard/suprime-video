import spinnerLoading from "../../../assets/spinner-loader-aurora.png";
import "./styles.css";

const LoadingPage = () => (
  <div className="loading-page">
    <img src={spinnerLoading} alt="Loading..." />
  </div>
);

export default LoadingPage;
