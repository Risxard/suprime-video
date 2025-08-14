import React, { useEffect, useRef } from "react";
import "../MovieOptionsModal/styles.css";
import XSvg from "../MovieOptionsModal/XSvg";
import { setGlobalModal } from "../../../store/slices/modals";
import { useDispatch, useSelector } from "react-redux";
import { deleteProfile } from "../../../services/firebase/profileServices.js";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const GeneralModal = ({ props }) => {
  const { userId, profileId, currentProfile } = props;
  const globalModal = useSelector((state) => state.modals.globalModal);
  const { t } = useTranslation();
  const profilesPage = t("profilesPage.editProfile");
  const { removeProfile } = profilesPage;
  const { removeProfileModal } = removeProfile;
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const handleSetGlobalModal = () => {
    dispatch(setGlobalModal(null));
  };

  const dialogRef = useRef(null);

  const handleDocumentClick = (event) => {
    if (dialogRef.current && !dialogRef.current.contains(event.target)) {
      handleSetGlobalModal();
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (globalModal) {
        document.addEventListener("click", handleDocumentClick);
      }

      return () => {
        document.removeEventListener("click", handleDocumentClick);
      };
    }, 400);
  }, [globalModal]);

  const handleDrag = (event) => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const startY =
      event.type === "touchstart" ? event.touches[0].clientY : event.clientY;
    const initialHeight = dialog.offsetHeight;

    const onMove = (moveEvent) => {
      const clientY =
        moveEvent.type === "touchmove"
          ? moveEvent.touches[0].clientY
          : moveEvent.clientY;
      const deltaY = clientY - startY;
      const newHeight = initialHeight - deltaY;
      dialog.style.maxHeight = "90vh";
      dialog.style.height = `${Math.max(newHeight, 100)}px`;
    };

    const onEnd = () => {
      const currentHeight = dialog.offsetHeight;
      if (currentHeight > 305) {
        dialog.style.height = "100%";
      }
      if (currentHeight < initialHeight && currentHeight > 305) {
        dialog.style.height = "305px";
      }
      if (currentHeight < 305) {
        handleSetGlobalModal();
      }

      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onEnd);
      document.removeEventListener("touchmove", onMove);
      document.removeEventListener("touchend", onEnd);
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onEnd);
    document.addEventListener("touchmove", onMove);
    document.addEventListener("touchend", onEnd);
  };

  useEffect(() => {
    const dialog = dialogRef.current;
    if (innerWidth <= 599) {
      const dragButton = dialog?.querySelector(
        ".draggable-resize-button-container"
      );
      if (dragButton) {
        dragButton.addEventListener("mousedown", handleDrag);
        dragButton.addEventListener("touchstart", handleDrag);
      }

      return () => {
        if (dragButton) {
          dragButton.removeEventListener("mousedown", handleDrag);
          dragButton.removeEventListener("touchstart", handleDrag);
        }
      };
    }
  }, []);

  async function handleDeleteProfile(
    userId,
    profileId,
    currentProfile,
    dispatch
  ) {
    const result = await deleteProfile(
      userId,
      profileId,
      currentProfile,
      dispatch
    );
    if (result) {
      handleSetGlobalModal();
      navigate("/profiles");
    } else {
      console.error("Failed to delete profile");
      return false;
    }
  }

  return (
    <div className="movie-options-modal-overlay">
      <div className="movie-options-modal-container">
        <div className="movie-options-dialog" role="dialog" ref={dialogRef}>
          <span className="draggable-resize-button-container">
            <span className="draggable-resize-button" />
          </span>

          <div className="movie-options-dialog-header">
            <span className="movie-options-dialog-header-title">
              <h2>{removeProfileModal.title}</h2>
            </span>
            <span className="XSvg" onClick={handleSetGlobalModal}>
              <XSvg />
            </span>
          </div>
          <div className="movie-options-dialog-main">
            <ul>
              <li>
                <p>{removeProfileModal.description}</p>
              </li>
            </ul>

            <span className="movie-options-dialog-buttons">
              <button onClick={handleSetGlobalModal}>
                {removeProfileModal.cancelButton}
              </button>
              <button
                onClick={() =>
                  handleDeleteProfile(
                    userId,
                    profileId,
                    currentProfile,
                    dispatch
                  )
                }
              >
                {removeProfileModal.removeButton}
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralModal;
