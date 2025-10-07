import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import NavProfiles from "../../../../components/Navigation/NavProfiles";

import LoadingComponent from "../../../../components/utils/LoadingComponent/LoadingComponent";
import { profileService } from "../../../../services/firebase/profileServices";
import "./styles.css";

const SelectAvatar = () => {
  const { profileId } = useParams();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const navFunction = () => navigate("/select-profile");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (profileId) {
          const data = await profileService.getById(profileId);

          setProfile(data);
        }
      } catch (error) {
        console.error("Erro ao buscar perfil:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [profileId]);

  if (loading) return <LoadingComponent />;

  return (
    <>
      <NavProfiles
        text={profileId ? "Pronto" : "Pular"}
        onSubmitNavBtn={navFunction}
      />
      <div className="select-avatar-title-container">
        <h2>Escolha o avatar</h2>

        <div className="select-avatar-title-image-container">
          <p>{profile?.userInfoData?.name || "Usuário"}</p>
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
        <div className="select-avatar-row-list-item">
          <h4>Featured</h4>
          
        </div>
        </div>
    </>
  );
};

export default SelectAvatar;
