import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import "./styles.css";
import { getAllProfiles } from "../../services/firebase/profilesManager.js";
import Profiles from "./Components/Profiles.jsx";
import ManageProfileSelect from "./Components/ManageProfile.jsx";
import NavStandalone from "../../components/Navigation/NavStandalone.jsx";

const ProfilesPage = () => {
  const [editMode, setEditMode] = useState(false);

  const dispatch = useDispatch();
  const profilesList = useSelector((state) => state.auth.profiles);
  const userId = useSelector((state) => state.auth.user.uid);


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
        <ManageProfileSelect profileList={validProfilesList} />
      ) : (
        <Profiles profileList={validProfilesList} />
      )}

      <div className="edit-profile-btn-container">
        <button className="edit-profile-btn" onClick={handleEditMode}>
          Edit profile
        </button>
      </div>
    </div>
  );
};

export default ProfilesPage;
