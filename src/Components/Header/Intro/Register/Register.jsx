import React from "react";
import "../Intro.css";

function intro() {
  function setCountry() {
    var country = document.querySelector("#country");
    var countryValue = country.value;

    return localStorage.setItem("country", countryValue);
  }

  function setId() {
    var input = document.querySelector("#name-input");
    var inputValue = input.value;

    return localStorage.setItem("id", inputValue);
  }

  function setStatusLog() {
    var statusLog = true;

    return localStorage.setItem("statusLog", statusLog);
  }

  function inputValidation() {
    var input = document.querySelector("#name-input");
    var nome = /^[a-zA-Z\s]+$/;

    if (input.value.match(nome)) {
      if ((window.location.href = "/BD-Screens/login")) {
        setCountry();
        setId();
        setStatusLog();
        window.location.href = "/BD-Screens";
      } else {
        setCountry();
        setId();
        setStatusLog();
        window.location.reload();
      }
    } else {
      const clear = (input.value = "");
      const color = input.classList.add("inputVal");

      return clear + color;
    }
  }

  return (
    <span className="Register-Container">
      <div className="reg-box">
        <select id="country">
          <option value="pt-BR">Brazil</option>
          <option value="en-US">USA</option>
        </select>

        <input
          id="name-input"
          type="text"
          minLength={2}
          maxLength={25}
          placeholder="Enter with your name"
        />
      </div>

      <span className="reg-btn" onClick={inputValidation}>
        <p>Subscribe</p>
      </span>
    </span>
  );
}

export default intro;
