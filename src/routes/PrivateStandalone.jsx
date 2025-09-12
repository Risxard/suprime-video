import { Outlet, useNavigate } from "react-router-dom";
import GlobalMoldal from "../components/Modals/GlobalMoldal";
import { useEffect } from "react";
import Footer from "../components/Footer/Footer";

const PrivateStandalone = ({ isAuthenticated }) => {
  const language = "pt-br";
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      {isAuthenticated && (
        <>
          <Outlet context={{ language }} />
          <Footer language={language} />
          <GlobalMoldal />
        </>
      )}
    </>
  );
};

export default PrivateStandalone;
