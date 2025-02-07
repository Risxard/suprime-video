import React, { useState, useEffect } from "react";

import "./styles.css";
import logo from '../../assets/SuprimeVideo.png'
import SignIn from "../../Components/AuthComponents/SignIn";

function Login() {
  return (
    <div className="Login">
      <div className="Intro-Container">
        <div className="H1-Container">
          <img src={logo} alt="" />
        </div>
        <SignIn/>
      </div>
    </div>
  );
}

export default Login;
