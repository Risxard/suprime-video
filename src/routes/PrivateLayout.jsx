import { Outlet, useNavigate } from "react-router-dom";
import Navigation from "../Components/Navigation/Navigation";
import Footer from "../Components/Footer/Footer";
import { useEffect } from "react";
import { useSelector } from "react-redux";

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

  return (
    <>
      {isAuthenticated && currentProfile ? (
        <>
          <Navigation language={language} />
          <Outlet language={language} />
          <Footer language={language} />
        </>
      ) : null}
    </>
  );
};

export default PrivateLayout;
