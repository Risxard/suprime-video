import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import NavProfiles from "../../../../components/Navigation/NavProfiles";
import { useDispatch } from "react-redux";

import editsvg from "../../assets/edit-svg.svg";
import SelectedSvg from "../../assets/SelectedSvg";
import DoneSvg from "../../assets/DoneSvg";
import defaultImage from "../../../../assets/avatars/mickey/mickey.png";

import { newProfileStorage } from "../../../../utils/sessionStorageManager";
import { profileService } from "../../../../services/firebase/profileServices";
import { syncProfiles } from "../../../../services/firebase/utils/profileServicesHelpers.js";

const languages = [
  { code: "pt-BR", label: "Português (Brasil)" },
  { code: "en-US", label: "English" },
  { code: "es-ES", label: "Español" },
];

const AddProfile = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [profile, setProfile] = useState({
    userInfoData: {
      img: {
        url: defaultImage,
      },
      name: "",
      language: "pt-BR",
    },
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [name, setName] = useState("");
  const [selectedLang, setSelectedLang] = useState("pt-BR");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const data = newProfileStorage.get();
    if (data) {
      setProfile((prev) => ({
        ...prev,
        userInfoData: {
          ...prev.userInfoData,
          img: { url: data.imgUrl || prev.userInfoData.img.url },
          name: data.profileName || "",
          language: data.language || "pt-BR",
        },
      }));

      setName(data.profileName || "");
      setSelectedLang(data.language || "pt-BR");
      newProfileStorage.clear();
    }
  }, []);

  const handleNameBlur = () => {
    setProfile((prev) => ({
      ...prev,
      userInfoData: { ...prev.userInfoData, name },
    }));
  };

  const goToAvatarSelection = () => {
    newProfileStorage.set(
      {
        profileName: name,
        imgUrl: profile.userInfoData.img.url,
        language: selectedLang,
      },
      15
    );
    navigate(`/select-avatar/`);
  };

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  const handleSelectLang = (lang, event) => {
    event.stopPropagation();
    setSelectedLang(lang);
    setProfile((prev) => ({
      ...prev,
      userInfoData: { ...prev.userInfoData, language: lang },
    }));
    setIsDropdownOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setErrorMessage("");

    const profileName =
      profile.userInfoData?.name || t("profiles-page.addProfile.defaultName");
    const imgUrl = profile.userInfoData?.img?.url;

    try {
      await profileService.create({
        name: profileName,
        imgUrl: imgUrl,
      });

      await syncProfiles(dispatch);
      navigate("/select-profile");
    } catch (error) {
      console.error("Erro ao criar perfil:", error);

      if (error.message.includes("Número máximo de perfis")) {
        setErrorMessage(t("profiles-page.addProfile.error-max"));
      } else {
        setErrorMessage(t("profiles-page.addProfile.error-generic"));
      }
    } finally {
      setIsSaving(false);
    }
  };

  const navFunction = () => navigate("/");

  return (
    <>
      <NavProfiles
        text={t("profiles-page.addProfile.button-cancel")}
        onSubmitNavBtn={navFunction}
      />

      <div className="profiles-page-container">
        <div className="edit-profile-container">
          <form onSubmit={handleSubmit}>
            <div className="edit-profile-title">
              <h2>{t("profiles-page.addProfile.title")}</h2>
              <p>{t("profiles-page.addProfile.subtitle")}</p>
            </div>

            <div className="edit-profile-content">
              <div className="edit-profile-picture-container">
                <div
                  className="edit-profile-picture"
                  style={{
                    background: profile.userInfoData?.img?.url
                      ? `url(${profile.userInfoData.img.url}) center/cover no-repeat`
                      : "linear-gradient(rgb(58, 60, 74), rgb(36, 38, 50))",
                  }}
                  onClick={goToAvatarSelection}
                >
                  <img
                    name="edit"
                    src={editsvg}
                    alt={t("profiles-page.addProfile.button-edit")}
                  />
                </div>
              </div>

              <div className="profile-box-container">
                <fieldset>
                  <label htmlFor="profileName">
                    {t("profiles-page.addProfile.name-label")}
                  </label>
                  <span className="profile-input-container">
                    <input
                      id="profileName"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      onBlur={handleNameBlur}
                      required
                    />
                  </span>
                </fieldset>

                <div className="profile-box-section-container">
                  <div className="profile-box-section-title">
                    <p>{t("profiles-page.addProfile.settings-title")}</p>
                  </div>

                  <div
                    className={`profile-box-section-options ${
                      isDropdownOpen ? "active" : ""
                    }`}
                    onClick={toggleDropdown}
                    ref={dropdownRef}
                  >
                    <span>
                      <label>{t("profiles-page.addProfile.language-label")}</label>
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
                            className={selectedLang === lang.code ? "active" : ""}
                            onClick={(event) => handleSelectLang(lang.code, event)}
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
                  type="submit"
                  className={`profile-box-container-submit-button ${
                    errorMessage ? "error" : ""
                  }`}
                  disabled={!!errorMessage || isSaving}
                >
                  {errorMessage
                    ? errorMessage
                    : isSaving
                    ? t("profiles-page.addProfile.button-saving")
                    : t("profiles-page.addProfile.button-save")}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddProfile;
