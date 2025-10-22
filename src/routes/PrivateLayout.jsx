import { Outlet } from "react-router-dom";

import { useSelector } from "react-redux";
import GlobalMoldal from "../components/Modals/GlobalMoldal";
import Footer from "../components/Footer/Footer";
import Navigation from "../components/Navigation/Navigation";


const PrivateLayout = () => {
  const modal = useSelector((state) => state.modals.filterModal);

  return (
    <>
      {!modal && <Navigation />}
      <Outlet />
      {!modal && <Footer />}
      <GlobalMoldal />
      
    </>
  );
};

export default PrivateLayout;
