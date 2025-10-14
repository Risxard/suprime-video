import spinnerLoading from "../../../assets/spinner-loader-aurora.png";
import "./styles.css"; 

const LoadingComponent = () => (
  <div className="loading-component">
    <img src={spinnerLoading} alt="Loading..." />
  </div>
);

export default LoadingComponent;
