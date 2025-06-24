import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import "./styles.css";
import { getAllProfiles } from "../../services/firebase/profilesManager.js";
import Profiles from "./Components/Profiles.jsx";
import ManageProfileSelect from "./Components/ManageProfile.jsx";
import NavStandalone from "../../components/Navigation/NavStandalone.jsx";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";

const ProfilesPage = () => {
  const [editMode, setEditMode] = useState(false);
  const dispatch = useDispatch();
  const profilesList = useSelector((state) => state.auth.profiles);
  const userId = Cookies.get("user_uid");
  const { t } = useTranslation();
  const profilesPage = t("profilesPage");



  useEffect(() => {
    if (userId) {
      getAllProfiles(userId, dispatch);
    }
  }, [userId, dispatch]);

  const validProfilesList = Array.isArray(profilesList) ? profilesList : [];

  function handleEditMode() {
    setEditMode((prevEditMode) => !prevEditMode);
  }


  return (
    <div className="profiles-page">
      <NavStandalone />
      {editMode ? (
        <ManageProfileSelect profileList={validProfilesList} profileLang={profilesPage.manageProfile}/>
      ) : (
        <Profiles profileList={validProfilesList} profileLang={profilesPage.selectProfile}/>
      )}

      <div className="edit-profile-btn-container">
        <button className="edit-profile-btn" onClick={handleEditMode}>
          {editMode ? profilesPage.manageProfile.button  : profilesPage.selectProfile.button1}
        </button>
      </div>
    </div>
  );
};

export default ProfilesPage;
