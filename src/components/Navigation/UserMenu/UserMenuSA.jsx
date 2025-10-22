import React, { useEffect, useRef, useState } from "react";
import "./UserMenuSA.css";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../store/auth/index.js";
import { isMobile } from "react-device-detect";
import { useTranslation } from "react-i18next";
import { auth } from "../../../services/firebase/firebaseconfig.js";

import AddProfile from "../Icons/AddProfile.jsx";

const UserMenuSAChildren = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { t } = useTranslation();
  const navigationAccountMenu = t("navigation.accountMenu");
  const { yourAccount, profiles } = navigationAccountMenu;
  const { editProfile, appSettings, account, help, signOut } = yourAccount;

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
    <div className="nav-menu-sa-list-itens">
      <li className="nav-menu-sa-item">
        <NavLink to="/select-avatar">
          <span className="nav-menu-sa-profile-pic add-new-profile-btn">
            <AddProfile />
          </span>
          <p>{profiles.addNew}</p>
        </NavLink>
      </li>

      <li className="nav-menu-sa-item nopic">
        <NavLink to="/select-profile">
          <p>Selecione um perfil</p>
        </NavLink>
      </li>
      <li className="nav-menu-sa-item nopic">
        <NavLink to="/edit-profiles">
          <p>{editProfile}</p>
        </NavLink>
      </li>
      <li className="nav-menu-sa-item nopic">
        <NavLink to="/settings/app-settings">
          <p>{appSettings}</p>
        </NavLink>
      </li>
      <li className="nav-menu-sa-item nopic">
        <NavLink to="/settings/account">
          <p>{account}</p>
        </NavLink>
      </li>
      <li className="nav-menu-sa-item nopic">
        <NavLink to="/settings/account">
          <p>{help}</p>
        </NavLink>
      </li>
      <li className="nav-menu-sa-item nopic" onClick={loggout}>
        <NavLink>
          <p>{signOut}</p>
        </NavLink>
      </li>
    </div>
  );
};

const UserMenuSA = () => {
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
      className={`nav-menu-sa ${isOpen && "active"}`}
      data-mobile={isMobile}
      data-open={isOpen}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <li
        className="nav-menu-sa-show-btn"
        onClick={() => handleSetIsOpen()}
        ref={avatarButtonRef}
      >
        <a>
          {currentProfileData.userInfoData.name && (
            <p>{currentProfileData.userInfoData.name}</p>
          )}

          <span
            className="nav-menu-sa-profile-pic"
            style={{
              ...(currentProfileData.userInfoData?.img?.url && {
                backgroundImage: `url(${currentProfileData.userInfoData.img.url})`,
              }),
            }}
          ></span>
        </a>
      </li>

      <UserMenuSAChildren />

      {isOpen && isMobile && <span className="focus-modal" />}
    </ul>
  ) : null;
};

export default UserMenuSA;
