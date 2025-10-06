import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentProfile,
  setCurrentWatchlist,
} from "../../../store/auth/index.js";

import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AddNew from "./CreateProfile/Addnew.jsx";
import { useNavigate } from "react-router-dom";
import i18next from "i18next";

const Profiles = ({ profileList, profileLang }) => {
  const dispatch = useDispatch();

  const currentProfile = useSelector((state) => state.auth.currentProfile);
  const navigate = useNavigate();

  const handleSetUserProfile = (profile) => {
    dispatch(setCurrentProfile(profile));
    dispatch(setCurrentWatchlist(profile.watchlist));
    i18next.changeLanguage(profile.userInfoData.language);
    navigate("/");
  };

  const sortedProfiles = [...profileList].sort((a, b) => {
    if (currentProfile && a.id == currentProfile.id) return -1;
    if (currentProfile && b.id == currentProfile.id) return 1;
    return 0;
  });

  return (
    <>
      <section className="profiles-page-content">
        <h2>{profileLang.title}</h2>
        <ul className="profile-list">
          {sortedProfiles.length > 0
            ? sortedProfiles.map((profile) => (
                <div
                  key={profile.id}
                  onClick={() => handleSetUserProfile(profile)}
                  className={`profile-list-item ${
                    currentProfile && currentProfile.id == profile.id
                      ? "active"
                      : ""
                  }`}
                >
                  <span className="profile-picture-container">
                    <div
                      className="picture-container"
                      style={{
                        backgroundImage: `url(${profile.userInfoData.img?.url})`,
                      }}
                    ></div>

                    <h3>{profile.userInfoData.name}</h3>
                  </span>
                </div>
              ))
            : null}

          <div className="add-new-list-item" role="button" aria-label="Adicionar perfil">
            <AddNew />
          </div>
        </ul>
      </section>
    </>
  );
};

export default Profiles;
