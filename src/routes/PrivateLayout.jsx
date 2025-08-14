import { Outlet, useNavigate } from "react-router-dom";
import Navigation from "../Components/Navigation/Navigation";
import Footer from "../Components/Footer/Footer";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWatchlist } from "../services/firebase/profileServices";
import GlobalMoldal from "../components/Modals/GlobalMoldal";
import Cookies from "js-cookie";
import i18n from "../i18n";
import AuthListener from "../services/firebase/AuthListener";

const PrivateLayout = ({ isAuthenticated }) => {
  const language = i18n.language;
  const currentProfile = useSelector((state) => state.auth.currentProfile);
  const navigate = useNavigate();
  const modal = useSelector((state) => state.modals.filterModal);
  const dispatch = useDispatch();


  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    } else if (!currentProfile) {
      navigate("/profiles");
    }
  }, [isAuthenticated, currentProfile, navigate]);




  return (
    <>
      <AuthListener />
      {isAuthenticated && currentProfile ? (
        <>
          {!modal && <Navigation language={language} />}

          <Outlet language={language} />

          {!modal && <Footer language={language} />}
          <GlobalMoldal />
        </>
      ) : null}
    </>
  );
};

export default PrivateLayout;
