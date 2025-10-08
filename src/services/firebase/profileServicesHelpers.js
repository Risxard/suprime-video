import { profileService } from "./profileServices";
import { userProfiles, setCurrentProfile } from "../../store/auth";

export const syncProfiles = async (dispatch) => {
  try {
    const profiles = await profileService.getAll();
    if (!profiles) return [];

    dispatch(userProfiles({ profiles }));
    localStorage.setItem("@AuthSV:profiles", JSON.stringify(profiles));

    const currentProfile = JSON.parse(localStorage.getItem("@AuthSV:currentProfile"));
    if (!currentProfile && profiles.length) {
      const mainProfile = profiles.find(p => p.isMain) || profiles[0];
      localStorage.setItem("@AuthSV:currentProfile", JSON.stringify(mainProfile));
      dispatch(setCurrentProfile(mainProfile));
    }

    return profiles;
  } catch (error) {
    console.error("Erro ao sincronizar perfis:", error);
    return [];
  }
};
