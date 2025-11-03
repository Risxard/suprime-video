import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NavProfiles from "../../../../components/Navigation/NavProfiles";
import LoadingPage from "../../../../components/utils/LoadingPage";
import AvatarCarousel from "../../../../components/Sliders/AvatarCarousel/AvatarCarousel";
import { newProfileStorage } from "../../../../utils/sessionStorageManager";
import { profileService } from "../../../../services/firebase/profileServices";
import { loadAvatarsByCategory } from "../../../../utils/loadAvatarsByCategory";
import defaultAvatar from "../../../../assets/avatars/default.png";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import "./styles.css";

export const SelectAvatar = () => {
  const { t } = useTranslation();
  const profilesPage = t("profiles-page", { returnObjects: true });
  const { profileId } = useParams();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [avatarsByCategory, setAvatarsByCategory] = useState({});

  useEffect(() => {
    setAvatarsByCategory(loadAvatarsByCategory());
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (profileId) {
          const data = await profileService.getById(profileId);
          setProfile(data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [profileId]);

  const navFunction = () => {
    if (!profileId) {
      const existingData = newProfileStorage.get() || {};
      const updatedData = {
        ...existingData,
        referrer: "create-profile",
        imgUrl: existingData.imgUrl || defaultAvatar,
        profileName: existingData.profileName || "",
        language: existingData.language || i18next.language || "pt-BR",
      };
      newProfileStorage.set(updatedData, 15);
      navigate("/add-profile");
    } else {
      navigate("/select-profile");
    }
  };

  const handleSelectAvatar = async (avatar) => {
    const language = i18next.language;

    if (profileId) {
      try {
        await profileService.update(profileId, {
          "userInfoData.img.url": avatar.img.url,
        });
        navigate(`/edit-profile/${profileId}`);
      } catch (error) {
        console.error("Erro ao atualizar avatar:", error);
      }
    } else {
      const existingData = newProfileStorage.get() || {};
      const updatedData = {
        ...existingData,
        referrer: "create-profile",
        imgUrl: avatar.img.url,
        profileName: existingData.profileName || "",
        language: existingData.language || language || "pt-BR",
      };
      newProfileStorage.set(updatedData, 15);
      navigate("/add-profile");
    }
  };

  if (loading) return <LoadingPage />;

  const formatCategoryName = (str) => {
    return str
      .replace(/[-_]+/g, " ")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  return (
    <>
      <NavProfiles
        text={
          profileId
            ? profilesPage.selectAvatar.buttonDone
            : profilesPage.selectAvatar.buttonSkip
        }
        onSubmitNavBtn={navFunction}
      />

      <div className="select-avatar-title-container">
        <h2>{profilesPage.selectAvatar.title}</h2>

        <div className="select-avatar-title-image-container">
          {profile?.userInfoData?.name && <p>{profile.userInfoData.name}</p>}

          {profileId && (
            <div
              className="select-avatar-title-image"
              style={{
                backgroundImage: profile?.userInfoData?.img?.url
                  ? `url(${profile.userInfoData.img.url})`
                  : "linear-gradient(rgb(58,60,74), rgb(36,38,50))",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
          )}
        </div>
      </div>

      <div className="select-avatar-row-list">
        {Object.entries(avatarsByCategory).map(([category, avatars]) => (
          <AvatarCarousel
            key={category}
            avatars={avatars}
            sectionTitle={formatCategoryName(category)}
            onSelect={handleSelectAvatar}
          />
        ))}
      </div>
    </>
  );
};

export default SelectAvatar;
