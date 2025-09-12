import { Outlet } from "react-router-dom";
import Navigation from "../Components/Navigation/Navigation";

import { useSelector } from "react-redux";
import GlobalMoldal from "../components/Modals/GlobalMoldal";
import i18n from "../i18n";
import Footer from "../components/Footer/Footer";
import AuthListener from "../services/firebase/AuthListener";

const PrivateLayout = () => {
  const language = i18n.language;
  const modal = useSelector((state) => state.modals.filterModal);

  return (
    <>
      {!modal && <Navigation language={language} />}
      <Outlet />
      {!modal && <Footer language={language} />}
      <GlobalMoldal />
    </>
  );
};

export default PrivateLayout;
