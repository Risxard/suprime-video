import React, { useEffect, useState } from "react";
import "./UserMenu.css";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, setCurrentProfile } from "../../../store/auth/index.js";
import DropdownContainer from "../Layout/DropdownContainer/Index.jsx";

const UserMenuChildren = () => {
  const [redirect, setRedirect] = useState(false);
  const dispatch = useDispatch();
  const currentProfile = useSelector((state) => state.auth.currentProfile);

  const profilesList = useSelector((state) => state.auth.profiles);
  const validProfilesList = Array.isArray(profilesList) ? profilesList : [];
  const filteredProfileList = validProfilesList.filter(
    (profile) => profile.id !== currentProfile.id
  );

  const sortedProfilesList = [...filteredProfileList].sort((a, b) => {
    if (a.id < b.id) {
      return 1;
    }
    if (a.id > b.id) {
      return -1;
    }
    return 0;
  });

  const handleSetUserProfile = (profile) => {
    dispatch(setCurrentProfile(profile));
    setRedirect(true);
  };

  const loggout = () => {
    dispatch(logout());
  };

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <div className="dropdown-content-layout">
        <p>Your account</p>

        <ul>
          <li>
            <Link to="/settings">
              <p>Help</p>
            </Link>
          </li>
          <li>
            <Link to="/settings">
              <p>Watch Anywhere</p>
            </Link>
          </li>
          <li>
            <Link to="/settings">
              <p>Account & Settings</p>
            </Link>
          </li>
          <li onClick={loggout}>
            <Link>
              <p>Sign out</p>
            </Link>
          </li>
        </ul>
      </div>

      <div className="dropdown-content-layout">
        <p>Profiles</p>
        <ul>
          {sortedProfilesList.length > 0
            ? sortedProfilesList.map((profile) => (
                <li
                  className="user-div"
                  key={profile.id}
                  onClick={() => handleSetUserProfile(profile)}
                >
                  <span className="item-image-container">
                    <img src={profile.img.url} alt="Avatar" />
                  </span>
                  <p>{profile.name}</p>
                </li>
              ))
            : null}

          <li className="user-div">
            <a href="/preview/suprime-video/profiles/create">
              <span className="item-image-container">
                <svg
                  width="32"
                  height="32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="32" height="32" rx="16" fill="#33373D" />
                  <path
                    d="M22 15.334h-5.334v-5.333c0-.367-.3-.667-.666-.667-.367 0-.667.3-.667.667v5.333H10c-.367 0-.667.3-.667.667 0 .366.3.666.667.666h5.333v5.334c0 .366.3.666.667.666.366 0 .666-.3.666-.666v-5.334H22c.366 0 .666-.3.666-.666 0-.367-.3-.667-.666-.667Z"
                    fill="#fff"
                  />
                </svg>
              </span>
              <p>Add new</p>
            </a>
          </li>

          <li className="user-div">
            <Link to="./profiles">
              <p>Manage profiles</p>
            </Link>
          </li>
          <li className="user-div">
            <p>Learn more</p>
          </li>
        </ul>
      </div>
    </>
  );
};

const UserMenu = () => {
  const [toggleBtn, setToggleBtn] = useState(false);
  const [hovered, setHovered] = useState(false);

  const currentProfile = useSelector((state) => state.auth.currentProfile);

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
    <li
      className="nav-bubble-btn"
      id="UserMenu-container"
      data-hover={hovered}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <button className="user-display-container" onClick={toggleClasse}>
        <span className="Card-avatar">
          {currentProfile.img ? (
            <img src={currentProfile.img.url} alt="Avatar" />
          ) : null}
        </span>
      </button>

      <DropdownContainer isOpen={toggleBtn} children={<UserMenuChildren />} />
    </li>
  );
};

export default UserMenu;
