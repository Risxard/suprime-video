import { useSelector, useDispatch } from "react-redux";
import { hidePopup } from "../../store/slices/popupSlice";
import "./styles.css";

const PopUpAlertIcon = () => (
  <svg viewBox="0 0 24 24" className="pop-up-icon warning-icon">
    <path d="M12 24C5.37 24 0 18.63 0 12S5.37 0 12 0s12 5.37 12 12-5.37 12-12 12zm0-7.5a1.5 1.5 0 1 0 .001 3.001A1.5 1.5 0 0 0 12 16.5zM10.5 6l.75 8.286c0 .395.336.714.75.714s.75-.32.75-.714L13.5 6c0-.789-.672-1.5-1.5-1.5s-1.5.711-1.5 1.5z"></path>
  </svg>
);

const PopUpDoneIcon = () => (
  <svg viewBox="0 0 24 24" className="pop-up-icon done-icon">
    <path d="M12 24C5.37 24 0 18.63 0 12S5.37 0 12 0s12 5.37 12 12-5.37 12-12 12zm-2.24-8.21l-3.1-3.1a1 1 0 1 0-1.41 1.41l3.89 3.89a1 1 0 0 0 1.49-.09L18.76 7.66a1 1 0 0 0-1.57-1.24L9.76 15.79z"></path>
  </svg>
);

const PopUpFailIcon = () => (
  <svg viewBox="0 0 24 24" className="pop-up-icon fail-icon">
    <path d="M11.1.02C9.33.19 8.01.57 6.51 1.33 4.74 2.23 3.15 3.66 1.99 5.38 1.79 5.68 1.45 6.28 1.24 6.72.45 8.32.07 9.82.01 11.6c-.07 1.99.34 3.9 1.23 5.69.62 1.26 1.27 2.16 2.29 3.18 1.04 1.04 1.94 1.68 3.16 2.3.88.43 1.45.64 2.35.86 2.34.59 4.69.48 6.97-.33.7-.26 1.91-.87 2.54-1.28 1.4-.94 2.68-2.26 3.59-3.72.33-.53.87-1.65 1.1-2.27 1.1-3.1.91-6.44-.54-9.36-.58-1.18-1.23-2.1-2.14-3.04-1.02-1.05-2.02-1.77-3.35-2.42C15.88.55 14.59.18 13.05.04 12.57 0 11.49-.01 11.1.02z" />
  </svg>
);

const PopUpMessage = () => {
  const dispatch = useDispatch();
  const { visible, message, iconType, persist } = useSelector(
    (state) => state.popup
  );

  if (visible && !persist) {
    setTimeout(() => {
      dispatch(hidePopup());
    }, 5000);
  }

  if (!visible) return null;

  return (
    <div className="pop-up-message-component">
      {iconType === "alert" && <PopUpAlertIcon />}
      {iconType === "done" && <PopUpDoneIcon />}
      {iconType === "fail" && <PopUpFailIcon />}
      <p>{message}</p>

      <div
        className="pop-up-message-close-container"
        onClick={() => dispatch(hidePopup())}
        style={{ cursor: "pointer" }}
      >
        <div className="pop-separator"></div>
        <svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.9 16.239l8.833-9.085c.255-.266.629-.404 1.01-.404.248 0 .491.056.706.175.641.338.817 1.121.301 1.649l-9.081 9.342 9.08 9.312c.517.53.343 1.311-.313 1.657-.546.287-1.276.2-1.7-.231l-8.835-9.062-8.838 9.064c-.421.428-1.152.516-1.699.229-.655-.346-.829-1.127-.312-1.657l9.08-9.312-9.08-9.341c-.516-.529-.34-1.312.313-1.657.202-.112.445-.168.693-.168.382 0 .755.138 1.007.4l8.836 9.089z"></path>
        </svg>
      </div>
    </div>
  );
};

export default PopUpMessage;
