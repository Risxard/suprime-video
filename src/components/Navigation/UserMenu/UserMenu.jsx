import React, { useEffect, useRef, useState } from "react";
import "./UserMenu.css";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, setCurrentProfile } from "../../../store/auth";
import { isMobile } from "react-device-detect";
import { useTranslation } from "react-i18next";
import { auth } from "../../../services/firebase/firebaseconfig";
import i18next from "i18next";
import AddProfile from "../Icons/AddProfile.jsx";
import { profileService } from "../../../services/firebase/profileServices.js";
import guestAvatar from "../../../assets/avatars/mickey/mickey.png";

const getUserType = (user) => {
  if (!user) return "NO_USER";
  if (user.isAnonymous) return "GUEST";
  return "AUTH_USER";
};

const GuestMenu = ({ handleLogout }) => {
  return (
    <div className="nav-menu-list-itens">
      <li className="nav-menu-item nopic">
        <NavLink to="./identity/sign-up/enter-email">
          <p>Criar conta</p>
        </NavLink>
      </li>

      <li className="nav-menu-item nopic" onClick={handleLogout}>
        <NavLink to="#">
          <p>Sair do modo convidado</p>
        </NavLink>
      </li>
    </div>
  );
};

const UserMenuChildren = ({ currentProfileData }) => {
  const [sortedProfileList, setCurrentProfileList] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { t } = useTranslation();
  const navigationAccountMenu = t("navigation.accountMenu", {
    returnObjects: true,
  });
  const { yourAccount, profiles } = navigationAccountMenu;
  const { editProfile, appSettings, account, help, signOut } = yourAccount;

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const allProfiles = await profileService.getAll();
        const filtered = allProfiles.filter(
          (p) => p.id !== currentProfileData?.id
        );
        const sorted = [...filtered].sort((a, b) =>
          a.id < b.id ? 1 : a.id > b.id ? -1 : 0
        );
        setCurrentProfileList(sorted);
      } catch (e) {
        console.error("Erro ao buscar perfis:", e);
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
      navigate("/landing");
    } catch (e) {
      console.error("Erro ao sair:", e);
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
          <a>
            <span
              className="nav-menu-profile-pic"
              style={{
                ...(profile.userInfoData?.img?.url && {
                  backgroundImage: `url(${profile.userInfoData.img.url})`,
                }),
              }}
            ></span>
            <p className="capitalize">{profile.userInfoData?.name}</p>
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
  const avatarButtonRef = useRef(null);

  const { user, currentProfile } = useSelector((state) => state.auth);
  const userType = getUserType(user);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const shouldRender =
    (userType === "AUTH_USER" && currentProfile) || userType === "GUEST";

  const handleLogout = async () => {
    try {
      await auth.signOut();
      dispatch(logout());
      navigate("/");
    } catch (e) {
      console.error(e);
    }
  };

  const toggleMenu = () => {
    if (isMobile) setIsOpen(!isOpen);
  };

  const handleClickOutside = (e) => {
    if (
      avatarButtonRef.current &&
      !avatarButtonRef.current.contains(e.target)
    ) {
      setIsOpen(false);
    }
  };


  useEffect(() => {
    if (isMobile && isOpen) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isOpen]);

  useEffect(() => setIsOpen(false), [location]);


  if (!shouldRender) return null;

  const displayName =
    userType === "GUEST"
      ? "Convidado"
      : currentProfile?.userInfoData?.name || "Usuário";

  const avatarDisplay =
    userType === "GUEST" ? guestAvatar : currentProfile?.userInfoData?.img?.url;

  return (
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
          <p className="capitalize">{displayName}</p>

          <span
            className="nav-menu-profile-pic"
            style={{
              ...(avatarDisplay && {
                backgroundImage: `url(${avatarDisplay})`,
              }),
            }}
          ></span>
        </a>
      </li>

      <div className="nav-menu-separator" />

      {userType === "GUEST" ? (
        <GuestMenu handleLogout={handleLogout} />
      ) : (
        <UserMenuChildren currentProfileData={currentProfile} />
      )}

      {isOpen && isMobile && <span className="focus-modal" />}
    </ul>
  );
};


export default UserMenu;
