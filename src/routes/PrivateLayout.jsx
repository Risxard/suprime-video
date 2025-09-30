import { Outlet } from "react-router-dom";
import Navigation from "../Components/Navigation/Navigation";

import { useSelector } from "react-redux";
import GlobalMoldal from "../components/Modals/GlobalMoldal";
import i18n from "../i18n";
import Footer from "../components/Footer/Footer";
import AuthListener from "../services/firebase/AuthListener";
import Nav from "../components/Navigation/Nav";

const PrivateLayout = () => {
  const modal = useSelector((state) => state.modals.filterModal);

  return (
    <>
      {!modal && <Nav />}
      <Outlet />
      {!modal && <Footer />}
      <GlobalMoldal />
    </>
  );
};

export default PrivateLayout;
