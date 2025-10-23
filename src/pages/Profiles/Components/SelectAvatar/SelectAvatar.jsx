import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import NavProfiles from "../../../../components/Navigation/NavProfiles";
import LoadingPage from "../../../../components/utils/LoadingPage/index.jsx";
import { profileService } from "../../../../services/firebase/profileServices";
import "./styles.css";
import AvatarCarousel from "../../../../components/Sliders/AvatarCarousel/AvatarCarousel";
import { newProfileStorage } from "../../../../utils/sessionStorageManager";
import { mockAvatars } from "./mockAvatars";
import i18next from "i18next";
import { useTranslation } from "react-i18next";

export const SelectAvatar = () => {
  const { t } = useTranslation();
  const profilesPage = t("profiles-page", { returnObjects: true });

  const { profileId } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const navFunction = () => {
    if (!profileId) {
      const existingData = newProfileStorage.get() || {};
      const updatedData = {
        ...existingData,
        referrer: "create-profile",
        imgUrl:
          existingData.imgUrl ||
          "https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/BD2FA0F3965617FC515E3CEBD3AD51C00CCFFBF98F96448EFE46B82867FCE542/scale?width=600&aspectRatio=1.00&format=png",
        profileName: existingData.profileName || "",
        language: existingData.language || i18next.language || "pt-BR",
      };

      newProfileStorage.set(updatedData, 15);
      navigate("/add-profile");
    } else {
      navigate("/select-profile");
    }
  };

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

  const handleSelectAvatar = async (avatar) => {
    const language = i18next.language;

    if (profileId) {
      try {
        await profileService.update(profileId, {
          "userInfoData.img.url": avatar.img.url,
        });
        navigate(`/edit-profile/${profileId}`);
      } catch (error) {
        console.error("Erro ao atualizar o avatar do perfil:", error);
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

  return (
    <>
      <NavProfiles
        text={profileId ? profilesPage.selectAvatar.buttonDone : profilesPage.selectAvatar.buttonSkip}
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
        <AvatarCarousel
          avatars={mockAvatars}
          sectionTitle={profilesPage.selectAvatar.featured}
          onSelect={handleSelectAvatar}
        />
      </div>
    </>
  );
};

export default SelectAvatar;
