import React, { useEffect, useRef } from "react";
import "./styles.css";
import XSvg from "./XSvg";
import { setGlobalModal } from "../../../store/slices/modals";
import { useDispatch, useSelector } from "react-redux";
import { Check, Film, Info, Play, Plus, PlusIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { addToWatchlist } from "../../../services/firebase/profilesManager";
import { useTranslation } from "react-i18next";

const MovieOptionsModal = ({ props, mediaType }) => {
  const globalModal = useSelector((state) => state.modals.globalModal);
  const watchlist = useSelector((state) => state.auth.watchList);
  const isInWatchlist = watchlist?.[props.media_type]?.includes(props.id);
  const userId = useSelector((state) => state.auth.user);
  const profileId = useSelector((state) => state.auth.currentProfile.id);
    const { t } = useTranslation();
    const buttonsLang = t("buttons");
    const { optionsButtons } = buttonsLang;

  const dispatch = useDispatch();
  const handleSetGlobalModal = () => {
    dispatch(setGlobalModal(null));
  };

  const mediaTypeClass = mediaType ? mediaType : props.media_type;

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

  const handleToWatchlist = async (userId, profileId, mediaType, mediaId) => {
    try {
      await addToWatchlist(userId, profileId, mediaType, mediaId, dispatch);
    } catch (error) {
      console.error("Error adding to watchlist:", error);
    }
  };

  return (
    <div className="movie-options-modal-overlay">
      <div className="movie-options-modal-container">
        <div className="movie-options-dialog" role="dialog" ref={dialogRef}>
          <span className="draggable-resize-button-container">
            <span className="draggable-resize-button" />
          </span>

          <div className="movie-options-dialog-header">
            <span className="movie-options-dialog-header-title">
              <h2>{props.name || props.title}</h2>
            </span>
            <span className="XSvg" onClick={handleSetGlobalModal}>
              <XSvg />
            </span>
          </div>
          <div className="movie-options-dialog-main">
            <ul>
              <li>
                <Link
                  to={`/detail/${mediaTypeClass}/${props.id}/play`}
                  onClick={handleSetGlobalModal}
                >
                  <Film />
                  <span>{optionsButtons.trailer}</span>
                </Link>
              </li>
              <li>
                <Link
                  to={`/detail/${mediaTypeClass}/${props.id}/play`}
                  onClick={handleSetGlobalModal}
                >
                  <Play />
                  <span>{optionsButtons.play1}</span>
                </Link>
              </li>
              <li>
                <button
                  onClick={() =>
                    handleToWatchlist(userId, profileId, mediaTypeClass, props.id)
                  }
                >
                  {isInWatchlist ? <Check /> : <Plus />}
                  <span>{optionsButtons.watchlist}</span>
                </button>
              </li>
              <li>
                <Link
                  to={`/detail/${mediaTypeClass}/${props.id}`}
                  onClick={handleSetGlobalModal}
                >
                  <Info />
                  <span>{optionsButtons.details}</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieOptionsModal;
