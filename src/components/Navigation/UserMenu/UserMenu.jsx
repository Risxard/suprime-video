import React, { useEffect, useRef, useState } from "react";
import "./UserMenu.css";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  logout,
  setCurrentProfile,
  setCurrentWatchlist,
} from "../../../store/auth/index.js";
import DropdownContainer from "../Layout/DropdownContainer/Index.jsx";
import { isMobile } from "react-device-detect";
import { useTranslation } from "react-i18next";
import { auth } from "../../../services/firebase/firebaseconfig.js";
import i18next from "i18next";

import holdimg from "../Icons/download.png";
import AddProfile from "../Icons/AddProfile.jsx";

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
    dispatch(setCurrentWatchlist(profile.watchlist));
    i18next.changeLanguage(profile.userInfoData.language);
    window.location.reload();
  };

  const loggout = async () => {
    try {
      await auth.signOut();

      // limpa redux
      dispatch(logout());

      // limpa localStorage
      localStorage.removeItem("@AuthSV:profiles");
      localStorage.removeItem("@AuthSV:currentProfile");
      localStorage.removeItem("@AuthSV:watchlist");

      // se preferir, limpa tudo de uma vez:
      // localStorage.clear();

      // redireciona pra página de login
      navigate("/login");
    } catch (error) {
      console.error("Erro ao sair:", error);
    }
  };

  const { t } = useTranslation();

  const navigationAccountMenu = t("navigation.accountMenu");
  const { yourAccount, profiles } = navigationAccountMenu;
  const { editProfile, appSettings, account, help, signOut } = yourAccount;

  return (
    <div className="nav-menu-list-itens">
      {sortedProfileList.length > 0
        ? sortedProfileList.map((profile) => (
            <li
              className="nav-menu-item"
              key={profile.id}
              onClick={() => handleSetUserProfile(profile)}
            >
              <a href="">
                <span className="nav-menu-profile-pic">
                  <img
                    src={profile.userInfoData.img.url}
                    alt="profile avatar"
                  />
                </span>
                <p>{profile.userInfoData.name}</p>
              </a>
            </li>
          ))
        : null}

      <li className="nav-menu-item">
        <a href="/preview/acaiwaveplus/profiles/create">
          <span className="nav-menu-profile-pic">
            <div className="add-profile">
              <AddProfile />
            </div>
          </span>
          <p>{profiles.addNew}</p>
        </a>
      </li>

      <li className="nav-menu-item nopic">
        <a href="">
          <p>{editProfile}</p>
        </a>
      </li>
      <li className="nav-menu-item nopic">
        <a href="">
          <p>{appSettings}</p>
        </a>
      </li>
      <li className="nav-menu-item nopic">
        <a href="">
          <p>{account} </p>
        </a>
      </li>
      <li className="nav-menu-item nopic">
        <a href="">
          <p>{help}</p>
        </a>
      </li>
      <li className="nav-menu-item nopic" onClick={() => loggout()}>
        <a href="">
          <p>{signOut}</p>
        </a>
      </li>
    </div>
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
    <ul
      className={`nav-menu ${isOpen && "active"}`}
      data-mobile={isMobile}
      data-open={isOpen}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <li
        className="nav-menu-show-btn"
        onClick={() => handleSetIsOpen()}
        ref={avatarButtonRef}
      >
        <a>
          {currentProfileData.userInfoData.name ? (
            <p>{currentProfileData.userInfoData.name}</p>
          ) : null}
          <span className="nav-menu-profile-pic">
            {currentProfileData.userInfoData.img ? (
              <img src={currentProfileData.userInfoData.img.url} alt="Avatar" />
            ) : null}
          </span>
        </a>
      </li>
      <div className="nav-menu-separator" />

      <UserMenuChildren currentProfileData={currentProfileData} />

      {isOpen && isMobile && <span className="focus-modal" />}
    </ul>
  ) : null;
};

export default UserMenu;
