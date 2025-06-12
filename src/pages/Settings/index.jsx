import React, { useState } from "react";
import "./styles.css";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CheckCircle, CheckCircle2, CircleOffIcon } from "lucide-react";
import { CircleSlash } from "lucide-react";
import { setLanguage } from "../../store/language";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import {
  fetchUserData,
  updateProfileLanguage,
  nameAccountUpdate,
  sendResetPasswordEmail,
} from "../../services/firebase/profilesManager";
import CircleXIcon from "./CircleX";
import { useEffect } from "react";

const SetYourAccountChildren = ({ editAccount }) => {
  const [isResetting, setIsResetting] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [resetError, setResetError] = useState(null);
  const [emailAccount, setEmailAccount] = useState("");

  const userId = useSelector((state) => state.auth.user);

  const { t } = useTranslation();
  const yourAccount = t("settingsPage.yourAccount");
  const { changePassword, deleteMyAccount } = yourAccount;

  useEffect(() => {
    const fetchEmail = async () => {
      if (!userId) return;
      try {
        const userData = await fetchUserData(userId);
        if (userData && userData.email) {
          setEmailAccount(userData.email);
        }
      } catch (error) {
        console.error("Erro ao buscar e-mail do usuário:", error);
        setEmailAccount("");
      }
    };
    fetchEmail();
  }, [userId]);

  const handleResetPassword = async () => {
    if (!emailAccount) return;
    setIsResetting(true);
    setResetError(null);
    try {
      await sendResetPasswordEmail(emailAccount);
      setResetSuccess(true);
      setTimeout(() => setResetSuccess(false), 5000);
    } catch (error) {
      setResetError(error.message || "Erro ao enviar e-mail.");
      setTimeout(() => setResetError(null), 5000);
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <>
      <div className="settings-options-children">
        <h2>{changePassword.title}</h2>
        <div>
          <p>{changePassword.description}</p>
          <button
            className="settings-page-btn"
            onClick={handleResetPassword}
            disabled={isResetting}
            style={{ opacity: isResetting ? 0.6 : 1 }}
          >
            {isResetting
              ? changePassword.statusMessages.sendingBtn
              : "Alterar senha"}
          </button>
          {resetSuccess && (
            <span
              className="success-message-settings"
              style={{ marginLeft: 8 }}
            >
              {changePassword.statusMessages.emailSuccess}
            </span>
          )}
          {resetError && (
            <span className="error-message-settings" style={{ marginLeft: 8 }}>
              {resetError}
            </span>
          )}
        </div>
      </div>

      <div className="settings-options-children">
        <h2>{deleteMyAccount.title}</h2>
        <div>
          <p>{deleteMyAccount.description}</p>
          <Link to="/settings/" className="settings-page-btn">
            <svg
              className="_22qEau"
              viewBox="0 0 24 24"
              height="24"
              width="24"
              role="img"
              aria-hidden="true"
            >
              <title>External</title>
              <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                <title>External</title>
                <g
                  fill="none"
                  fillRule="evenodd"
                  strokeLinecap="round"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M11.828 12.314l7.779-7.778"></path>
                  <path
                    strokeLinejoin="round"
                    d="M14.657 3.828h5.657v5.657M19 14v5H5V5h5"
                  ></path>
                </g>
              </svg>
            </svg>
            <span>{deleteMyAccount.button}</span>
          </Link>
        </div>
      </div>
    </>
  );
};

const SetPlaybackChildren = ({
  playback,
  profileDescription,
  radioButtons,
}) => {
  const [playBackState, setPlayBackState] = useState(false);
  const [isSavedActive, setIsSavedActive] = useState(null);
  const currentProfile = useSelector((state) => state.auth.currentProfile);

  const triggerSavedSettings = () => {
    setIsSavedActive(true);
    setTimeout(() => {
      setIsSavedActive(null);
    }, 5000);
  };

  const handleChange = (value) => {
    setPlayBackState(value === "on");
    triggerSavedSettings();
  };

  return (
    <div
      className={`settings-options-children playback-option ${
        isSavedActive === true
          ? "success"
          : isSavedActive === false
          ? "error"
          : null
      }`}
    >
      <span className="settings-options-avatar-container">
        {currentProfile.userInfoData.img ? (
          <img src={currentProfile.userInfoData.img.url} alt="Avatar" />
        ) : null}

        {currentProfile.userInfoData.img ? (
          <p>{`${profileDescription} ${currentProfile.userInfoData.name}`}</p>
        ) : null}
      </span>

      <h2>{playback.playbackReprodution.title}</h2>
      <div>
        <p>{playback.playbackReprodution.description}</p>

        <span className="settings-radio-group">
          <label>
            <input
              type="radio"
              name="autoplay"
              value="on"
              checked={playBackState === true}
              onChange={(e) => handleChange(e.target.value)}
            />
            {radioButtons.on}
          </label>
          <label>
            <input
              type="radio"
              name="autoplay"
              value="off"
              checked={playBackState === false}
              onChange={(e) => handleChange(e.target.value)}
            />
            {radioButtons.off}
          </label>
        </span>
      </div>
    </div>
  );
};

const SetLanguageChildren = ({ lng, profileDescription }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [isSavedActive, setIsSavedActive] = useState(null);

  const triggerSavedSettings = () => {
    setIsSavedActive(true);
    setTimeout(() => {
      setIsSavedActive(null);
    }, 5000);
  };

  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user);
  const profileId = useSelector((state) => state.auth.currentProfile.id);

  const { ref } = useParams();
  const currentProfile = useSelector((state) => state.auth.currentProfile);
  const lang = i18next.language;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userId && profileId && selectedOption && dispatch) {
      try {
        const result = await updateProfileLanguage(
          userId,
          profileId,
          selectedOption,
          dispatch
        );
        if (result) {
          window.location.href = "/preview/acaiwaveplus/settings/language/";
          triggerSavedSettings();
        }
      } catch (error) {
        console.error("Error updating profile language:", error);
      }
    }
  };

  return (
    <>
      {ref === "website" ? (
        <div
          className={`settings-options-children ${
            isSavedActive === true
              ? "success"
              : isSavedActive === false
              ? "error"
              : null
          }`}
        >
          <h2>{lng.streamingLanguage.profileLanguage}</h2>
          <form
            className="language-radio-group-container"
            onSubmit={handleSubmit}
          >
            <span className="language-radio-group">
              <label>
                <input
                  type="radio"
                  name="language"
                  value="pt-BR"
                  onChange={(e) => setSelectedOption(e.target.value)}
                  defaultChecked={lang === "pt-BR"}
                />
                Português (Brasil)
              </label>
              <label>
                <input
                  type="radio"
                  name="language"
                  value="en-US"
                  onChange={(e) => setSelectedOption(e.target.value)}
                  defaultChecked={lang === "en-US"}
                />
                English
              </label>
            </span>

            <button type="submit">{lng.streamingLanguage.saveButton}</button>
          </form>
        </div>
      ) : (
        <>
          <div className="settings-options-children">
            <span className="settings-options-avatar-container">
              {currentProfile.userInfoData.img ? (
                <img src={currentProfile.userInfoData.img.url} alt="Avatar" />
              ) : null}

              {currentProfile.userInfoData.img ? (
                <p>
                  {`${profileDescription} ${currentProfile.userInfoData.name}`}
                </p>
              ) : null}
            </span>

            <h2>{lng.streamingLanguage.title}</h2>
            <div>
              <p>{lng.streamingLanguage.description}</p>

              <Link
                to="/settings/language/website"
                className="settings-page-btn"
              >
                <div>
                  <span>{lng.streamingLanguage.button}</span>
                </div>
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
};

const SettingsPage = () => {
  const { id } = useParams();
  const { t } = useTranslation();

  const settingsPage = t("settingsPage");
  const buttonsLanguage = t("buttons");
  const { radioButtons } = buttonsLanguage;

  const {
    title,
    labels,
    profileDescription,
    successMessage,
    errorMessage,
    yourAccount,
    playback,
    language,
  } = settingsPage;

  return (
    <div className="settings-page">
      <div className="settings-page-container">
        <span className="success-message-settings">
          <CheckCircle2 strokeWidth={1} />
          {successMessage}
        </span>
        <span className="error-message-settings">
          <CircleXIcon strokeWidth={1} />
          {errorMessage}
        </span>

        <div className="settings-page-content">
          <div className="settings-page-title-container">
            <h1>{title}</h1>
          </div>
          <div className="tablist-container">
            <div className="tablist" role="tablist">
              <Link
                to="/settings/your-account"
                role="tab"
                className={id === "your-account" ? "active" : ""}
              >
                {labels.yourAccount}
              </Link>
              <Link
                to="/settings/playback"
                role="tab"
                className={id === "playback" ? "active" : ""}
              >
                {labels.playback}
              </Link>
              <Link
                to="/settings/language"
                role="tab"
                className={id === "language" ? "active" : ""}
              >
                {labels.language}
              </Link>
            </div>
          </div>

          <div className="setting-page-content-container">
            <div className="setting-page-content">
              {id === "your-account" && (
                <SetYourAccountChildren editAccount={yourAccount.editAccount} />
              )}
              {id === "playback" && (
                <SetPlaybackChildren
                  playback={playback}
                  profileDescription={profileDescription}
                  radioButtons={radioButtons}
                />
              )}
              {id === "language" && (
                <SetLanguageChildren
                  lng={language}
                  profileDescription={profileDescription}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
