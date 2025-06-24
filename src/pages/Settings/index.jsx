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
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { set } from "react-hook-form";
import { logout } from "../../store/auth";
import useDeleteAccount from "../../hooks/Auth/DeleteAccount";

const SetYourAccountChildren = ({ editAccount }) => {
  const [isResetting, setIsResetting] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [resetError, setResetError] = useState(null);
  const [emailAccount, setEmailAccount] = useState("");
  const [confirmDelete, setConfirmeDelete] = useState(false);
  const [password, setPassword] = useState("");
  const { deleteAccount, loading, error, setError } = useDeleteAccount();

  const { ref } = useParams();

  const navigate = useNavigate();

  const userId = useSelector((state) => state.auth.user.uid);
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

  const handleDeleteAccount = (value) => {
    setConfirmeDelete(value);
  };

  function handleNavigate() {
    handleDeleteAccount(false);
    setError("");
    setPassword("");
    navigate("/settings/your-account");
  }

  const handleDelete = async () => {
    const success = await deleteAccount(password);
    if (success) {
      alert("Sua conta foi excluída com sucesso.");
    }
  };

  return (
    <>
      {ref === "deleteAccount" ? (
        <div className={`settings-options-children`}>
          <h2>{deleteMyAccount.title}</h2>
          <div>
            <p>
              {confirmDelete
                ? deleteMyAccount.confirmDelete.description
                : deleteMyAccount.description}
            </p>
          </div>

          <div className="language-radio-group-container delete-account-container">
            {confirmDelete && (
              <>
                <label><p>{deleteMyAccount.confirmDelete.passwordConfirmation}</p></label>
                <input
                  type="password"
                  placeholder={deleteMyAccount.confirmDelete.passwordPlaceholder}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
              </>
            )}

            {error && <div style={{ color: "red" }}>{error}</div>}

            <span className="delete-buttons">
              {confirmDelete ? (
                <>
                  <button onClick={handleNavigate} disabled={loading}>
                    {deleteMyAccount.confirmDelete.cancelButton}
                  </button>
                  <button onClick={handleDelete} disabled={loading}>
                    {deleteMyAccount.confirmDelete.confirmButton}
                  </button>
                </>
              ) : (
                <button
                  onClick={() => handleDeleteAccount(true)}
                  disabled={loading}
                >
                  {deleteMyAccount.deleteButton1}
                </button>
              )}
            </span>
          </div>
        </div>
      ) : (
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
                <span
                  className="error-message-settings"
                  style={{ marginLeft: 8 }}
                >
                  {resetError}
                </span>
              )}
            </div>
          </div>

          <div className="settings-options-children">
            <h2>{deleteMyAccount.title}</h2>
            <div>
              <p>{deleteMyAccount.description}</p>
              <Link
                to="/settings/your-account/deleteAccount"
                className="settings-page-btn"
              >
                <span>{deleteMyAccount.deleteButton1}</span>
              </Link>
            </div>
          </div>
        </>
      )}
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
  const userId = useSelector((state) => state.auth.user.uid);
  const profileId = useSelector((state) => state.auth.currentProfile.id);

  const { ref } = useParams();
  const currentProfile = useSelector((state) => state.auth.currentProfile);
  const lang = i18next.language;
  const navigate = useNavigate();
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
          triggerSavedSettings();
          window.location.reload();
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
              <label>
                <input
                  type="radio"
                  name="language"
                  value="es-ES"
                  onChange={(e) => setSelectedOption(e.target.value)}
                  defaultChecked={lang === "es-ES"}
                />
                Español {`(${lng.streamingLanguage.notFullySupported})`}
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
