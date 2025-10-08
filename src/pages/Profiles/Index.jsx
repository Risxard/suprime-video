import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import "./styles.css";
import { getAllProfiles } from "../../services/firebase/profileServices.js";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../services/firebase/firebaseconfig.js";
import LoadingComponent from "../../components/utils/LoadingComponent/LoadingComponent.jsx";

const ProfilesPage = ({ children }) => {
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
