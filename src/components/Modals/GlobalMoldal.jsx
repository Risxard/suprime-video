import { useSelector } from "react-redux";
import "./styles.css";
const GlobalModalLayout = ({ children }) => {
  return <div className="global-modal-layout">{children}</div>;
};

const GlobalMoldal = () => {
  const globalModal = useSelector((state) => state.modals.globalModal);

  return globalModal && <GlobalModalLayout children={globalModal} />;
};

export default GlobalMoldal;
