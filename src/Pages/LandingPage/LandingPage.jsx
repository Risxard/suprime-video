import React from "react";

import Background from "../../Components/Header/BackgroundComponent/BackgroundComponent";

import "./LandingPage.css";
import Footer from "../../Components/Footer/Footer";

const LandingPage = (SectionData) => {
  return (
    <div className="LandingPage">
      <Background></Background>
      <Footer></Footer>
    </div>
  );
};

export default LandingPage;
