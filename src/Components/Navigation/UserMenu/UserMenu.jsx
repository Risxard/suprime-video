import React, { useEffect, useState } from "react";

import "./UserMenu.css";
import { Link } from "react-router-dom";

import ProfileIcon from "./Svgs/ProfileIcon.jsx";
import WatchListIcon from "./Svgs/WatchListIcon.jsx";
import WatchHistoryIcon from "./Svgs/WatchHistoryIcon.jsx";
import UnsubscribeIcon from "./Svgs/UnsubscribeIcon.jsx";
import ArrowIcon from "./Svgs/ArrowIcon.jsx";
import SettingsIcon from "./Svgs/Settings.jsx";

var Navmenu = (props) => {
  const clientid = localStorage.getItem("currentUserName");
  const [toggleBtn, setToggleBtn] = useState(false);

  var loggout = () => {
    localStorage.setItem("statusLog", "");
    localStorage.setItem("currentUserName", "");
    localStorage.setItem("currentUser", "");

    window.location.href = "/suprime-video/";
  };

  const userMenu = document.getElementById("UserMenu-container");

  function handleToggleBtn() {
    setToggleBtn(true);
  }
  const toggleClasse = () => {
    if (userMenu) {
      userMenu.classList.toggle("active");
    }
  };

  useEffect(() => {
    handleToggleBtn();
  }, [toggleBtn]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenu && !userMenu.contains(e.target)) {
        userMenu.classList.remove("active");
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [userMenu]);

  return (
    <div id="UserMenu-container" onClick={toggleClasse}>
      <span className="user-name">
        <p>{clientid}</p>
      </span>

      <div className="Profile-Content">
        <span className="Profile-Avatar">
          <img
            src="https://cdn.bfe.dev/bfe/img/YRkyVwrmKWqggtRUMjPIsIhsrfhyhfOs_800x800_1619063642899.png"
            alt=""
          />
        </span>
      </div>

      <ul id="Card-Profile">
        <div id="mini-menu-ul">
          <h3>Your account</h3>

          <Link to="/suprime-video/settings" className="Card-Profile-Flex">
            <h2>Account & Settings</h2>
          </Link>
          <Link onClick={loggout} className="Card-Profile-Flex">
            <h2>Sing out</h2>
          </Link>
        </div>

        <ul id="mini-menu-ul">
          <h3>Profiles</h3>
          <span className="user-div">
            <span className="Profile-Avatar">
              <img
                src="https://cdn.bfe.dev/bfe/img/YRkyVwrmKWqggtRUMjPIsIhsrfhyhfOs_800x800_1619063642899.png"
                alt=""
              />
            </span>
            <p>{clientid}</p>
          </span>
        </ul>
      </ul>
    </div>
  );
};

export default Navmenu;
