import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import NavProfiles from "../../../../components/Navigation/NavProfiles";
import LoadingComponent from "../../../../components/utils/LoadingComponent/LoadingComponent";
import {
  profileService,
  updateProfileLanguage,
} from "../../../../services/firebase/profileServices";
import "./styles.css";
import DoneSvg from "./assets/DoneSvg";
import { useDispatch } from "react-redux";
import editsvg from "./assets/edit-svg.svg";
import SelectedSvg from "./assets/selectedsvg";

const languages = [
  { code: "pt-BR", label: "Português (Brasil)" },
  { code: "en-US", label: "English" },
  { code: "es-ES", label: "Español" },
];

const EditProfile = () => {
  const { t } = useTranslation();
  const { profileId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState("pt-BR");
  const [name, setName] = useState("");

  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await profileService.getById(profileId);
        if (data) {
          setProfile(data);

          if (data.userInfoData?.name) {
            setName(data.userInfoData.name);
          }
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
    if (name !== profile.userInfoData?.name) {
      try {
        await profileService.update(profileId, {
          "userInfoData.name": name,
        });

        setProfile((prev) => ({
          ...prev,
          userInfoData: { ...prev.userInfoData, name },
        }));
      } catch (error) {
        console.error("Erro ao atualizar nome:", error);
      }
    }
  };

  const goToAvatarSelection = () => {
    navigate(`/select-avatar/${profileId}`);
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
                  onClick={goToAvatarSelection}
                >
                  <img name="edit" src={editsvg} alt="Editar" />
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
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
