import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import NavProfiles from "../../../../components/Navigation/NavProfiles";
import LoadingPage from "../../../../components/utils/LoadingPage/index.jsx";
import {
  profileService,
  updateProfileLanguage,
} from "../../../../services/firebase/profileServices";
import "./styles.css";
import DoneSvg from "../../assets/DoneSvg";
import { useDispatch } from "react-redux";
import editsvg from "../../assets/edit-svg.svg";
import SelectedSvg from "../../assets/SelectedSvg";
import { syncProfiles } from "../../../../services/firebase/profileServicesHelpers";

const languages = [
  { code: "pt-BR", label: "Português (Brasil)" },
  { code: "en-US", label: "English" },
  { code: "es-ES", label: "Español" },
];

const EditProfile = () => {
  const { t } = useTranslation();
  const profilesPage = t("profiles-page", { returnObjects: true });

  const { profileId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState("pt-BR");
  const [name, setName] = useState("");
  const [previousName, setPreviousName] = useState("");
  const [nameError, setNameError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        await syncProfiles(dispatch);

        const data = await profileService.getById(profileId);
        if (data) {
          setProfile(data);
          const userName = data.userInfoData?.name || "";
          setName(userName);
          setPreviousName(userName);
          setSelectedLang(data.userInfoData?.language || "pt-BR");
        } else {
          console.error("Perfil não encontrado");
        }
      } catch (error) {
        console.error("Erro ao buscar perfil:", error);
      } finally {
        setLoading(false);
      }
    };

    if (profileId) fetchProfile();
  }, [profileId, dispatch]);

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  const handleSelectLang = async (lang, event) => {
    event.stopPropagation();
    setSelectedLang(lang);
    setIsDropdownOpen(false);
    try {
      await updateProfileLanguage(profileId, lang, dispatch);
    } catch (error) {
      console.error("Erro ao atualizar idioma:", error);
    }
  };

  const handleNameBlur = async () => {
    const trimmedName = name.trim();

    // ❌ Nome vazio → erro e restaura o anterior
    if (!trimmedName) {
      setNameError(profilesPage.editProfile.errors["name-required"]);
      setName(previousName);
      return;
    }

    // ✅ Nome diferente → atualiza
    if (trimmedName !== previousName) {
      try {
        await profileService.update(profileId, { "userInfoData.name": trimmedName });
        setProfile((prev) => ({
          ...prev,
          userInfoData: { ...prev.userInfoData, name: trimmedName },
        }));
        setPreviousName(trimmedName);
        setNameError("");
      } catch (error) {
        console.error("Erro ao atualizar nome:", error);
        setNameError(profilesPage.editProfile.errors["generic"]);
      }
    }
  };

  const goToAvatarSelection = () => navigate(`/select-avatar/${profileId}`);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    if (isDropdownOpen)
      document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDropdownOpen]);

  const navFunction = () => navigate("/select-profile");

  const openDeleteModal = () => setIsModalOpen(true);
  const closeDeleteModal = () => setIsModalOpen(false);

  const handleDeleteProfile = async () => {
    try {
      await profileService.remove(profileId);
      closeDeleteModal();
      navigate("/select-profile");
    } catch (error) {
      console.error("Erro ao excluir perfil:", error);
    }
  };

  if (loading) return <LoadingPage />;

  return (
    <>
      <NavProfiles
        text={profilesPage.selectAvatar.buttonDone}
        onSubmitNavBtn={navFunction}
      />

      <div className="profiles-page-container">
        <div className="edit-profile-container">
          <form>
            <div className="edit-profile-title">
              <h2>{profilesPage.editProfile.title}</h2>
            </div>

            <div className="edit-profile-content">
              <div className="edit-profile-picture-container">
                <div
                  className="edit-profile-picture"
                  style={{
                    background: profile.userInfoData?.img?.url
                      ? `url(${profile.userInfoData.img.url}) center/cover no-repeat`
                      : "linear-gradient(rgb(58, 60, 74), rgb(36, 38, 50)) center/contain no-repeat",
                  }}
                  onClick={goToAvatarSelection}
                >
                  <img
                    name="edit"
                    src={editsvg}
                    alt={profilesPage.editProfile["button-edit"]}
                  />
                </div>
              </div>

              <div className="profile-box-container">
                <fieldset>
                  <span className="profile-input-container">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      onBlur={handleNameBlur}
                      placeholder={
                        profilesPage.editProfile["placeholder-name"]
                      }
                      className={nameError ? "input-error" : ""}
                    />
                  </span>
                  {nameError && <p className="error-message">{nameError}</p>}
                </fieldset>

                <div className="profile-box-section-container">
                  <div className="profile-box-section-title">
                    <p>{profilesPage.editProfile["settings-title"]}</p>
                  </div>

                  <div
                    className={`profile-box-section-options ${
                      isDropdownOpen ? "active" : ""
                    }`}
                    onClick={toggleDropdown}
                    ref={dropdownRef}
                  >
                    <span>
                      <label>
                        {profilesPage.editProfile["language-label"]}
                      </label>
                      <div className="profile-box-section-options-selected">
                        {languages.find((l) => l.code === selectedLang)?.label}
                        <SelectedSvg />
                      </div>
                    </span>

                    {isDropdownOpen && (
                      <ul className="profile-box-section-options-dropdrown">
                        {languages.map((lang) => (
                          <li
                            key={lang.code}
                            className={
                              selectedLang === lang.code ? "active" : ""
                            }
                            onClick={(event) =>
                              handleSelectLang(lang.code, event)
                            }
                          >
                            {lang.label}
                            {selectedLang === lang.code && <DoneSvg />}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  className="delete-profile-btn"
                  onClick={openDeleteModal}
                >
                  {profilesPage.editProfile["button-delete"]}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <h4>
              {profilesPage.editProfile["confirm-delete"].title}{" "}
              <b className="capitalize">{name}</b>?
            </h4>
            <p>{profilesPage.editProfile["confirm-delete"].text2}</p>

            <div className="modal-buttons">
              <button onClick={closeDeleteModal} className="cancel-btn">
                {profilesPage.editProfile["confirm-delete"]["button-cancel"]}
              </button>
              <button onClick={handleDeleteProfile} className="confirm-btn">
                {profilesPage.editProfile["confirm-delete"]["button-confirm"]}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
