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
import { profileService } from "../../../services/firebase/profileServices.js";

const UserMenuChildren = ({ currentProfileData }) => {
  const [sortedProfileList, setCurrentProfileList] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const avatarButtonRef = useRef(null);

  const { t } = useTranslation();
  const navigationAccountMenu = t("navigation.accountMenu");
  const { yourAccount, profiles } = navigationAccountMenu;
  const { editProfile, appSettings, account, help, signOut } = yourAccount;

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const allProfiles = await profileService.getAll();


        const filteredProfiles = allProfiles.filter(
          (profile) => profile.id !== currentProfileData?.id
        );


        const sortedList = [...filteredProfiles].sort((a, b) =>
          a.id < b.id ? 1 : a.id > b.id ? -1 : 0
        );

        setCurrentProfileList(sortedList);
      } catch (error) {
        console.error("Erro ao buscar perfis:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
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
      dispatch(logout());
      localStorage.removeItem("@AuthSV:profiles");
      localStorage.removeItem("@AuthSV:currentProfile");
      localStorage.removeItem("@AuthSV:watchlist");
      navigate("/login");
    } catch (error) {
      console.error("Erro ao sair:", error);
    }
  };


  return (
    <div className="nav-menu-list-itens">
      {sortedProfileList.map((profile) => (
        <li
          className="nav-menu-item"
          key={profile.id}
          onClick={() => handleSetUserProfile(profile)}
        >
          <a href="">
            <span
              className="nav-menu-profile-pic"
              style={{
                ...(profile.userInfoData?.img?.url && {
                  backgroundImage: `url(${profile.userInfoData.img.url})`,
                }),
              }}
            ></span>
            {profile.userInfoData?.name && <p>{profile.userInfoData.name}</p>}
          </a>
        </li>
      ))}

      <li className="nav-menu-item">
        <a href="/preview/acaiwaveplus/profiles/create">
          <span className="nav-menu-profile-pic add-new-profile-btn">
            <AddProfile />
          </span>
          <p>{profiles.addNew}</p>
        </a>
      </li>

      <li className="nav-menu-item nopic">
        <a href="/preview/acaiwaveplus/edit-profiles">
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
          <p>{account}</p>
        </a>
      </li>
      <li className="nav-menu-item nopic">
        <a href="">
          <p>{help}</p>
        </a>
      </li>
      <li className="nav-menu-item nopic" onClick={loggout}>
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
          {currentProfileData.userInfoData.name && (
            <p>{currentProfileData.userInfoData.name}</p>
          )}

          <span
            className="nav-menu-profile-pic"
            style={{
              ...(currentProfileData.userInfoData?.img?.url && {
                backgroundImage: `url(${currentProfileData.userInfoData.img.url})`,
              }),
            }}
          ></span>
        </a>
      </li>

      <div className="nav-menu-separator" />

      <UserMenuChildren currentProfileData={currentProfileData} />

      {isOpen && isMobile && <span className="focus-modal" />}
    </ul>
  ) : null;
};

export default UserMenu;
