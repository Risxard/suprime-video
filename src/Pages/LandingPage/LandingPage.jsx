import React from "react";

import Background from "../../components/Header/BackgroundComponent/BackgroundComponent";

import "./LandingPage.css";
import Footer from "../../components/Footer/Footer";

const LandingPage = (SectionData) => {
  return (
    <div className="LandingPage">
      <Background></Background>
      <Footer></Footer>
    </div>
  );
};

export default LandingPage;
