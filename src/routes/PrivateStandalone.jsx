import { Outlet } from "react-router-dom";
import Footer from "../Components/Footer/Footer";
import { useEffect } from "react";
import NavStandalone from "../components/Navigation/NavStandalone";
import GlobalMoldal from "../components/Modals/GlobalMoldal";
import { useNavigate } from "react-router-dom";
import AuthListener from "../services/firebase/AuthListener";

const PrivateStandalone = ({ isAuthenticated }) => {
  const language = "pt-br";
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      useEffect(() => {
        if (!isAuthenticated) {
          navigate("/");
        }
      }, [isAuthenticated, navigate]);
    }
  }, [isAuthenticated]);

  return (
    <>
      <AuthListener />
      {isAuthenticated ? (
        <>
          <Outlet language={language} />
          <Footer language={language} />
          <GlobalMoldal />
        </>
      ) : null}
    </>
  );
};

export default PrivateStandalone;
