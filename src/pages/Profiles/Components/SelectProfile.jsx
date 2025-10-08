import { useDispatch } from "react-redux";
import {
  setCurrentProfile,
  setCurrentWatchlist,
  userProfiles,
} from "../../../store/auth/index.js";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import NavProfiles from "../../../components/Navigation/NavProfiles.jsx";
import { profileService } from "../../../services/firebase/profileServices.js";
import AddNewButton from "../assets/AddNewButton.jsx";

const SelectProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const profilesPage = t("profilesPage");

  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentProfile, setCurrentLocalProfile] = useState(null);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const allProfiles = await profileService.getAll();
        setProfiles(allProfiles);

        if (allProfiles.length > 0) {
          const savedProfile = allProfiles[0];
          setCurrentLocalProfile(savedProfile);
          dispatch(setCurrentProfile(savedProfile));
          dispatch(setCurrentWatchlist(savedProfile.watchlist));
          i18next.changeLanguage(savedProfile.userInfoData.language);
        }
      } catch (error) {
        console.error("Erro ao buscar perfis:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, [dispatch]);

  const handleSetUserProfile = (profile) => {
    setCurrentLocalProfile(profile);
    dispatch(setCurrentProfile(profile));
    dispatch(setCurrentWatchlist(profile.watchlist));
    i18next.changeLanguage(profile.userInfoData.language);
    navigate("/");
  };

  const sortedProfiles = [...profiles].sort((a, b) => {
    if (currentProfile && a.id === currentProfile.id) return -1;
    if (currentProfile && b.id === currentProfile.id) return 1;
    return 0;
  });

  const navFunction = () => navigate("/edit-profiles");

  return (
    <>
      <NavProfiles text="Editar Perfil" onSubmitNavBtn={navFunction} />

      <div className="profiles-page-container">
        <section className="profiles-page-content">
          <h2>{profilesPage.selectProfile.title}</h2>
          <ul className="profile-list">
            {sortedProfiles.map((profile) => (
              <div
                key={profile.id}
                onClick={() => handleSetUserProfile(profile)}
                className={`profile-list-item ${
                  currentProfile && currentProfile.id === profile.id
                    ? "active"
                    : ""
                }`}
              >
                <span className="profile-picture-container">
                  <div
                    className="picture-container"
                    style={{
                      background: profile.userInfoData?.img?.url
                        ? `url(${profile.userInfoData.img.url}) center/cover no-repeat`
                        : "linear-gradient(rgb(58, 60, 74), rgb(36, 38, 50)) center/contain no-repeat",
                    }}
                  ></div>

                  <h3>{profile.userInfoData.name}</h3>
                </span>
              </div>
            ))}

            <div className="add-new-list-item">
              <div
                className="profile-list-item"
                role="button"
                aria-label="Adicionar perfil"
              >
                <AddNewButton />
              </div>
            </div>
          </ul>
        </section>
      </div>
    </>
  );
};

export default SelectProfile;
