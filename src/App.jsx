import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth, setCurrentProfile } from "./store/auth/index.js";
import Cookies from "js-cookie";
import PrivateLayout from "./routes/PrivateLayout.jsx";
import "./i18n";
import { getAllProfiles } from "./services/firebase/profilesManager.js";
import ScrollTopTop from "./functions/ScrollToTop.jsx";

function App() {
  const token = Cookies.get("@AuthToken");

  useEffect(() => {
    if (token) {
      console.log("Token no Cookie: " + token);
    }
  }, []);

  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userId = useSelector((state) => state.auth.user);

  const currentProfileId = useSelector(
    (state) => state.auth.currentProfile?.id
  );

  const handleFetchAllProfiles = async () => {
    // const profiles = await getAllProfiles(userId, dispatch);
    // if (currentProfileId) {
    //   const profile = profiles.find((p) => p.id === currentProfileId);
    //   if (profile) {
    //     dispatch(setCurrentProfile(profile));
    //   }
    // }
    // return profiles;
  };

  useEffect(() => {
    dispatch(checkAuth());
    handleFetchAllProfiles();
  }, [dispatch]);

  return (
    <div className="App">
      <ScrollTopTop />
      <PrivateLayout isAuthenticated={isAuthenticated} />
    </div>
  );
}

export default App;
