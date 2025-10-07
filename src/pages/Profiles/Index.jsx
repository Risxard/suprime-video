import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import "./styles.css";
import { getAllProfiles } from "../../services/firebase/profileServices.js";
import Profiles from "./Components/SelectProfile.jsx";
import ManageProfileSelect from "./Components/ManageProfile.jsx";
import NavProfiles from "../../components/Navigation/NavProfiles.jsx";
import { useTranslation } from "react-i18next";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../services/firebase/firebaseconfig.js";
import LoadingComponent from "../../components/utils/LoadingComponent/LoadingComponent.jsx";

const ProfilesPage = ({ children }) => {
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

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

  function handleEditMode() {
    setEditMode((prevEditMode) => !prevEditMode);
  }

  if (loading) {
    return <LoadingComponent />;
  }


  return (
    <div className="profiles-page">
      <div className="app-background" />
      {children}
    </div>
  );
};

export default ProfilesPage;
