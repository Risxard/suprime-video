import React, { useEffect, useState } from "react";
import "./Intro.css";

import SingIn from "../../Register/SingIn";
import SingUp from "../../Register/SingUp";

function Intro() {
  const [isSingUp, setIsSingUp] = useState(false);

  const handleSingUp = (isTrue) => {
    setIsSingUp(isTrue);
  };

  useEffect(() => {
    const h1 = document.querySelector(".H1-Container");
    const Register = document.querySelector(".Register-Container");

    h1.classList.add("active");

    setTimeout(() => {
      Register.classList.add("active");
    }, 300);
  }, [isSingUp]);

  return (
    <div className="Intro-Container">
      <div className="H1-Container">
      </div>

      {isSingUp == true ? (
        <SingUp isSingUp={handleSingUp} />
      ) : (
        <SingIn isSingUp={handleSingUp} />
      )}
    </div>
  );
}

export default Intro;
