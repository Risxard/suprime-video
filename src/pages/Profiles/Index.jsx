import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import "./styles.css";
import { getAllProfiles } from "../../services/firebase/profileServices.js";
import Profiles from "./Components/Profiles.jsx";
import ManageProfileSelect from "./Components/ManageProfile.jsx";
import NavStandalone from "../../components/Navigation/NavStandalone.jsx";
import { useTranslation } from "react-i18next";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../services/firebase/firebaseconfig.js";

const ProfilesPage = () => {
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const profilesList = useSelector((state) => state.auth.profiles);
  const { t } = useTranslation();
  const profilesPage = t("profilesPage");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        getAllProfiles(dispatch)
          .catch((err) => console.error("Erro ao buscar perfis:", err))
          .finally(() => setLoading(false));
      } else {
        console.warn("Nenhum usuário logado.");
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  const validProfilesList = Array.isArray(profilesList) ? profilesList : [];

  function handleEditMode() {
    setEditMode((prevEditMode) => !prevEditMode);
  }

  if (loading) {
    return (
      <div className="profiles-page">
        <NavStandalone />
        <p>Carregando perfis...</p>
      </div>
    );
  }

  return (
    <div className="profiles-page">
      <div className="app-background" />

      <NavStandalone />
      {editMode ? (
        <ManageProfileSelect
          profileList={validProfilesList}
          profileLang={profilesPage.manageProfile}
        />
      ) : (
        <Profiles
          profileList={validProfilesList}
          profileLang={profilesPage.selectProfile}
        />
      )}

      <div className="edit-profile-btn-container">
        <button className="edit-profile-btn" onClick={handleEditMode}>
          {editMode
            ? profilesPage.manageProfile.button
            : profilesPage.selectProfile.button1}
        </button>
      </div>
    </div>
  );
};

export default ProfilesPage;
