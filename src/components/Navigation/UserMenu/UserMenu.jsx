import React, { useEffect, useRef, useState } from "react";
import "./UserMenu.css";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, setCurrentProfile } from "../../../store/auth/index.js";
import DropdownContainer from "../Layout/DropdownContainer/Index.jsx";
import { isMobile } from "react-device-detect";
import { useTranslation } from "react-i18next";
import { auth } from "../../../services/firebase/firebaseconfig.js";

const UserMenuChildren = ({ currentProfileData }) => {
  const [sortedProfileList, setCurrentProfileList] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const avatarButtonRef = useRef(null);

  const profilesList = useSelector((state) => state.auth.profiles);
  const validProfilesList = Array.isArray(profilesList) ? profilesList : [];

  useEffect(() => {
    const filteredProfileList = validProfilesList.filter(
      (profile) => profile.id !== currentProfileData?.id
    );

    const sortedList = [...filteredProfileList].sort((a, b) => {
      if (a.id < b.id) {
        return 1;
      }
      if (a.id > b.id) {
        return -1;
      }
      return 0;
    });

    if (sortedList) {
      setCurrentProfileList(sortedList);
    }
  }, [currentProfileData]);

  const handleSetUserProfile = (profile) => {
    dispatch(setCurrentProfile(profile));
    window.location.reload();
  };

  const loggout = async () => {
    await auth.signOut();
    dispatch(logout());
  };

  const { t } = useTranslation();

  const navigationAccountMenu = t("navigation.accountMenu");
  const { yourAccount, profiles } = navigationAccountMenu;

  return (
    <>
      <div className="dropdown-content-layout">
        <p>{yourAccount.title}</p>

        <ul>
          <li>
            <Link to="/settings">
              <p>{yourAccount.help}</p>
            </Link>
          </li>
          <li>
            <Link to="/settings">
              <p>{yourAccount.watchAnywhere}</p>
            </Link>
          </li>
          <li>
            <Link to="/settings">
              <p>{yourAccount.AccountSettings}</p>
            </Link>
          </li>
          <li onClick={loggout}>
            <Link>
              <p>{yourAccount.signOut}</p>
            </Link>
          </li>
        </ul>
      </div>

      <div className="dropdown-content-layout">
        <p>{profiles.title}</p>
        <ul>
          {sortedProfileList.length > 0
            ? sortedProfileList.map((profile) => (
                <li
                  className="user-div"
                  key={profile.id}
                  onClick={() => handleSetUserProfile(profile)}
                >
                  <span className="item-image-container">
                    <img src={profile.userInfoData.img.url} alt="Avatar" />
                  </span>
                  <p>{profile.userInfoData.name}</p>
                </li>
              ))
            : null}

          <li className="user-div">
            <a href="/preview/acaiwaveplus/profiles/create">
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
              <p>{profiles.addNew}</p>
            </a>
          </li>

          <li className="user-div">
            <Link to="./profiles">
              <p>{profiles.manageProfiles}</p>
            </Link>
          </li>
          <li className="user-div">
            <Link to="./home">
              <p>{profiles.learnMore}</p>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentProfileData, setCurrentProfileData] = useState(null);

  const avatarButtonRef = useRef(null);
  const currentProfile = useSelector((state) => state.auth.currentProfile);

  function handleCurrentProfile(data) {
    setCurrentProfileData(data);
  }

  useEffect(() => {
    if (currentProfile) {
      handleCurrentProfile(currentProfile);
    }
  }, [currentProfile]);

  const handleSetIsOpen = () => {
    if (isMobile) {
      setIsOpen(!isOpen);
    }
  };

  const handleDocumentClick = (event) => {
    if (
      avatarButtonRef.current &&
      !avatarButtonRef.current.contains(event.target)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isMobile) {
      if (isOpen) {
        document.addEventListener("click", handleDocumentClick);
      }

      return () => {
        document.removeEventListener("click", handleDocumentClick);
      };
    }
  }, [isOpen]);

  const location = useLocation();

  const handleOffIsOpen = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    handleOffIsOpen();
  }, [location]);

  return currentProfileData ? (
    <li
      className="nav-bubble-btn"
      id="UserMenu-container"
      data-mobile={isMobile}
      data-open={isOpen}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <span ref={avatarButtonRef}>
        <button
          className="user-display-container"
          onClick={() => handleSetIsOpen()}
        >
          <span className="Card-avatar">
            {currentProfileData.userInfoData.img ? (
              <img src={currentProfileData.userInfoData.img.url} alt="Avatar" />
            ) : null}
          </span>
        </button>
        {isOpen && (
          <DropdownContainer
            children={
              <UserMenuChildren currentProfileData={currentProfileData} />
            }
          />
        )}
      </span>

      {isOpen && isMobile && <span className="focus-modal" />}
    </li>
  ) : null;
};

export default UserMenu;
