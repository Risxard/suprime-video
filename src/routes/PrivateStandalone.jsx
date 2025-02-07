import { Outlet } from "react-router-dom";
import Footer from "../Components/Footer/Footer";
import { useEffect } from "react";
import NavStandalone from "../components/Navigation/NavStandalone";

const PrivateStandalone = ({ isAuthenticated }) => {
  const language = "pt-br";

  useEffect(() => {
    if (!isAuthenticated) {
      window.location.href = "/";
    }
  }, [isAuthenticated]);

  return (
    <>
      {isAuthenticated ? (
        <>
          <Outlet language={language} />
          <Footer language={language} />
        </>
      ) : null}
    </>
  );
};

export default PrivateStandalone;
