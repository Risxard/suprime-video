import React, { useEffect, useRef, useState } from "react";
import "./UserMenu.css";
import {
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  logout,
  setCurrentProfile,
} from "../../../store/auth/index.js";
import { isMobile } from "react-device-detect";
import { useTranslation } from "react-i18next";
import { auth } from "../../../services/firebase/firebaseconfig.js";
import i18next from "i18next";

import AddProfile from "../Icons/AddProfile.jsx";
import { profileService } from "../../../services/firebase/profileServices.js";

const UserMenuChildren = ({ currentProfileData }) => {
  const [sortedProfileList, setCurrentProfileList] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { t } = useTranslation();
  const navigationAccountMenu = t("navigation.accountMenu", { returnObjects: true });
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
      }
    };
    fetchProfiles();
  }, [currentProfileData]);

  const handleSetUserProfile = (profile) => {
    dispatch(setCurrentProfile(profile));
    i18next.changeLanguage(profile.userInfoData.language);
    window.location.reload();
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      dispatch(logout());
      localStorage.removeItem("@AuthSV:profiles");
      localStorage.removeItem("@AuthSV:currentProfile");
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
          <a href="#">
            <span
              className="nav-menu-profile-pic"
              style={{
                ...(profile.userInfoData?.img?.url && {
                  backgroundImage: `url(${profile.userInfoData.img.url})`,
                }),
              }}
            ></span>
            {profile.userInfoData?.name && (
              <p className="capitalize">{profile.userInfoData.name}</p>
            )}
          </a>
        </li>
      ))}

      <li className="nav-menu-item">
        <NavLink to="/select-avatar">
          <span className="nav-menu-profile-pic add-new-profile-btn">
            <AddProfile />
          </span>
          <p>{profiles.addNew}</p>
        </NavLink>
      </li>

      <li className="nav-menu-item nopic">
        <NavLink to="/edit-profiles">
          <p>{editProfile}</p>
        </NavLink>
      </li>
      <li className="nav-menu-item nopic">
        <NavLink to="/settings/account">
          <p>{appSettings}</p>
        </NavLink>
      </li>
      <li className="nav-menu-item nopic">
        <NavLink to="/settings/account">
          <p>{account}</p>
        </NavLink>
      </li>
      <li className="nav-menu-item nopic">
        <NavLink to="/help">
          <p>{help}</p>
        </NavLink>
      </li>
      <li className="nav-menu-item nopic" onClick={handleLogout}>
        <NavLink to="#">
          <p>{signOut}</p>
        </NavLink>
      </li>
    </div>
  );
};

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentProfileData, setCurrentProfileData] = useState(null);
  const avatarButtonRef = useRef(null);
  const currentProfile = useSelector((state) => state.auth.currentProfile);
  const location = useLocation();

  useEffect(() => {
    if (currentProfile) setCurrentProfileData(currentProfile);
  }, [currentProfile]);

  const toggleMenu = () => {
    if (isMobile) setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (
      avatarButtonRef.current &&
      !avatarButtonRef.current.contains(event.target)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isMobile && isOpen) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return currentProfileData ? (
    <ul
      className={`nav-menu ${isOpen ? "active" : ""}`}
      data-mobile={isMobile}
      data-open={isOpen}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <li
        className="nav-menu-show-btn"
        onClick={toggleMenu}
        ref={avatarButtonRef}
      >
        <a>
          {currentProfileData.userInfoData?.name && (
            <p className="capitalize">
              {currentProfileData.userInfoData.name}
            </p>
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
