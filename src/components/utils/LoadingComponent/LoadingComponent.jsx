import React from "react";
import spinnerLoading from "../../../assets/spinner-loader-aurora.png";
import "./loading-component.css"; 

const LoadingComponent = () => (
  <div className="loading-component">
    <img src={spinnerLoading} alt="Loading..." />
  </div>
);

export default LoadingComponent;
