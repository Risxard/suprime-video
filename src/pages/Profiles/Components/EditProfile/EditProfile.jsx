import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import NavProfiles from "../../../../components/Navigation/NavProfiles";
import LoadingComponent from "../../../../components/utils/LoadingComponent/LoadingComponent";
import { profileService } from "../../../../services/firebase/profileServices";
import "./styles.css";
import DoneSvg from "./assets/doneSvg";

const languages = [
  { code: "pt-BR", label: "Português (Brasil)" },
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
];

const EditProfile = () => {
  const { t } = useTranslation();
  const { profileId } = useParams();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState("pt-BR");

  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await profileService.getById(profileId);
        if (data) {
          setProfile(data);
          if (data.userInfoData?.language) {
            setSelectedLang(data.userInfoData.language);
          }
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
  }, [profileId]);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleSelectLang = (lang, event) => {
    event.stopPropagation();
    setSelectedLang(lang);
    setIsDropdownOpen(false);
    // profileService.update(profileId, { "userInfoData.language": lang })
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const navFunction = () => navigate("/select-profile");

  if (loading) return <LoadingComponent />;

  return (
    <>
      <NavProfiles text="Pronto" onSubmitNavBtn={navFunction} />
      <div className="profiles-page-container">
        <div className="edit-profile-container">
          <form>
            <div className="edit-profile-title">
              <h2>Editar perfil</h2>
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
                >
                  <img
                    name="edit"
                    src="https://static-assets.bamgrid.com/product/disneyplus/images/edit.0a8445c2cff0e80361b2e66906aaeca0.svg"
                    alt="Editar"
                  />
                </div>
              </div>

              <div className="profile-box-container">
                <fieldset>
                  <span className="profile-input-container">
                    <input
                      type="text"
                      defaultValue={profile.userInfoData?.name || ""}
                    />
                  </span>
                </fieldset>

                <div className="profile-box-section-container">
                  <div className="profile-box-section-title">
                    <p>Configurações de reprodução e idioma</p>
                  </div>

                  <div
                    className={`profile-box-section-options ${
                      isDropdownOpen ? "active" : ""
                    }`}
                    onClick={toggleDropdown}
                    ref={dropdownRef}
                  >
                    <span>
                      <label>Idioma do aplicativo</label>
                      <div className="profile-box-section-options-selected">
                        {languages.find((l) => l.code === selectedLang)?.label}
                        <svg
                          aria-hidden="true"
                          aria-label="arrowDown"
                          color="#FFFFFF"
                          role="img"
                          viewBox="0 0 36 36"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M28.35 11.565c.578-.538 1.433-.355 1.81.325.122.21.182.463.182.72 0 .398-.15.786-.437 1.048L18.93 23.827a1.126 1.126 0 0 1-1.555 0L6.432 13.655c-.468-.438-.563-1.198-.25-1.767.377-.681 1.23-.863 1.809-.325l10.164 9.446 10.195-9.445z"></path>
                        </svg>
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
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
