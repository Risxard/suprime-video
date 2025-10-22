import spinnerLoading from "../../../assets/spinner-loader-aurora.png";
import "./styles.css";

const LoadingComponent = () => (
  <div className="loading-screen-component">
    <div className="loading-component">
      <img src={spinnerLoading} alt="Loading..." />
    </div>
    <div className="app-background" />
  </div>
);

export default LoadingComponent;
