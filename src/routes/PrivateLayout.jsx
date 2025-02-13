import { Outlet, useNavigate } from "react-router-dom";
import Navigation from "../Components/Navigation/Navigation";
import Footer from "../Components/Footer/Footer";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWatchlist } from "../services/firebase/profilesManager";

const PrivateLayout = ({ isAuthenticated }) => {
  const language = "pt-br";
  const currentProfile = useSelector((state) => state.auth.currentProfile);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    } else if (!currentProfile) {
      navigate("/profiles");
    }
  }, [isAuthenticated, currentProfile, navigate]);

  const userId = useSelector((state) => state.auth.user);
  const modal = useSelector((state) => state.modals.filterModal);

  const dispatch = useDispatch();

  useEffect(() => {
    if(userId){
      const fetchWatchlist = async () => {
        try {
          await getWatchlist(userId, currentProfile.id, dispatch);
        } catch (error) {
          console.error("Error fetching watchlist:", error);
        }
      };
  
      fetchWatchlist();
    }
  }, [userId, currentProfile]);

  return (
    <>
      {isAuthenticated && currentProfile ? (
        <>
          {!modal && <Navigation language={language} />}

          <Outlet language={language} />

          {!modal && <Footer language={language} />}
        </>
      ) : null}
    </>
  );
};

export default PrivateLayout;
