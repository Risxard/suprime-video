import React from "react";

import "./styles.css";
import logo from "../../assets/SuprimeVideo.png";
import SignUp from "../../Components/AuthComponents/SignUp";

function Register() {
  return (
    <div className="Register">
      <div className="Intro-Container">
        <div className="H1-Container">
          <img src={logo} alt="" />
        </div>

        <SignUp/>
      </div>
    </div>
  );
}

export default Register;
