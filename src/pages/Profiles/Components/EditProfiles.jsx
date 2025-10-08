import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentProfile,
  setCurrentWatchlist,
} from "../../../store/auth/index.js";

import { useNavigate } from "react-router-dom";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import NavProfiles from "../../../components/Navigation/NavProfiles.jsx";
import AddNewButton from "../assets/AddNewButton.jsx";

const EditProfiles = () => {
  const dispatch = useDispatch();

  const { t } = useTranslation();
  const profilesPage = t("profilesPage");
  const profilesList = useSelector((state) => state.auth.profiles);
  const validProfilesList = Array.isArray(profilesList) ? profilesList : [];

  const currentProfile = useSelector((state) => state.auth.currentProfile);
  const navigate = useNavigate();

  const handleSetUserProfile = (profile) => {
    dispatch(setCurrentProfile(profile));
    dispatch(setCurrentWatchlist(profile.watchlist));
    i18next.changeLanguage(profile.userInfoData.language);
    navigate("/");
  };

  const sortedProfiles = [...validProfilesList].sort((a, b) => {
    if (currentProfile && a.id == currentProfile.id) return -1;
    if (currentProfile && b.id == currentProfile.id) return 1;
    return 0;
  });

  const handleNavigateToEditProfile = (profileId) => {
    navigate(`/edit-profile/${profileId}`);
  };

  function navFunction() {
    navigate("/select-profile");
  }

  return (
    <>
      <NavProfiles text="Pronto" onSubmitNavBtn={() => navFunction()} />

      <div className="profiles-page-container">
        <section className="profiles-page-content">
          <h2>Editar perfis</h2>
          <h4>Selecione um perfil para editar</h4>
          <ul className="profile-list">
            {sortedProfiles.length > 0
              ? sortedProfiles.map((profile) => (
                  <div
                    key={profile.id}
                    onClick={() => handleNavigateToEditProfile(profile.id)}
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
                          background: profile.userInfoData?.img?.url
                            ? `url(${profile.userInfoData.img.url}) center/cover no-repeat`
                            : "linear-gradient(rgb(58, 60, 74), rgb(36, 38, 50)) center/contain no-repeat",
                        }}
                      >
                        <img
                          aria-label={`Editar o perfil de ${profile.userInfoData?.name}.`}
                          name="edit"
                          src="https://static-assets.bamgrid.com/product/disneyplus/images/edit.0a8445c2cff0e80361b2e66906aaeca0.svg"
                        ></img>
                      </div>

                      <h3>{profile.userInfoData.name}</h3>
                    </span>
                  </div>
                ))
              : null}

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

export default EditProfiles;
