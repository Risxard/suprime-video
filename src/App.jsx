import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth, setCurrentProfile } from "./store/auth/index.js";
import Cookies from "js-cookie";
import PrivateLayout from "./routes/PrivateLayout.jsx";
import "./i18n";
import { getAllProfiles } from "./services/firebase/profilesManager.js";
import ScrollTopTop from "./functions/ScrollToTop.jsx";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const isAuthenticated = !!user && !!token;

  const currentProfileId = useSelector(
    (state) => state.auth.currentProfile?.id
  );



  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <div className="App">
      <ScrollTopTop />
      <PrivateLayout isAuthenticated={isAuthenticated} />
    </div>
  );
}

export default App;
