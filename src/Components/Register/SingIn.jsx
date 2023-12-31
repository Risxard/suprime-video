import React from "react";
import "./SingIn.css";

import { User, KeyRound } from "lucide-react";

function SingIn({ isSingUp }) {
  const handleSingUp = () => {
    isSingUp(true);
  };

  const inputValidation = () => {
    const userID = document.querySelector(".name-input");
    const userPassword = document.getElementById("password-input");
    userID.classList.remove("input-error");
    userPassword.classList.remove("input-error");
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const foundUser = users.find(
      (user) => user.id === userID.value && user.password === userPassword.value
    );
    if (foundUser) {
      const userToSave = {
        name: foundUser.name,
        id: foundUser.id,
        email: foundUser.email,
        userToken: foundUser.userToken,
      };
      localStorage.setItem("currentUser", JSON.stringify(userToSave));
      localStorage.setItem("statusLog", "true");
      localStorage.setItem("currentUserName", foundUser.name);
      const currentCountry = localStorage.getItem("country");
      if (!currentCountry) {
        localStorage.setItem("country", "en-US");
      }
      window.location.reload();
    } else {
      if (!foundUser) {
        userID.classList.add("input-error");
        userID.value = "";
        userID.placeholder = "User not found";
      }
      if (!foundUser || foundUser.password !== userPassword.value) {
        userPassword.classList.add("input-error");
        userPassword.value = "";
        userPassword.placeholder = "Incorrect password";
      }
      console.log("Login falhou. Verifique suas credenciais.");
    }
  };

  return (
    <span className="Register-Container">
      <div className="reg-box">
        <User className="inputIcons" />
        <input
          className="name-input"
          type="text"
          minLength={6}
          maxLength={16}
          placeholder="User login"
        />
      </div>

      <div className="reg-box">
        <KeyRound className="inputIcons" />
        <input
          className="name-input"
          id="password-input"
          type="password"
          minLength={6}
          maxLength={25}
          placeholder="Password"
        />
      </div>

      <span className="remembe-me">
        <input type="checkbox" />
        <p>Remember me</p>
      </span>

      <div className="reg-btns-container">
        <button type="submit" className="reg-btn" onClick={inputValidation}>
          <p>Sing in</p>
        </button>
      </div>

      <span className="newTo">
        <p>New to Suprime video?</p>
        <strong onClick={() => handleSingUp()}>Sing up now</strong>
      </span>
    </span>
  );
}

export default SingIn;
