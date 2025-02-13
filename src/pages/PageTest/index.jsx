import React, { useEffect, useState } from "react";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getWatchlist,
  addToWatchlist,
} from "../../services/firebase/profilesManager";
import { setCurrentWatchlist } from "../../store/auth";

const PageTest = () => {
  const currentProfileId = useSelector((state) => state.auth.currentProfile.id);
  const userId = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        await getWatchlist(userId, currentProfileId, dispatch);
      } catch (error) {
        console.error("Error fetching watchlist:", error);
      }
    };

    fetchWatchlist();
  }, [userId, currentProfileId]);

  const handleToWatchlist = async (userId, profileId, mediaType, mediaId) => {
    try {
      const list = await addToWatchlist(userId, profileId, mediaType, mediaId, dispatch);
    } catch (error) {
      console.error("Error adding to watchlist:", error);
    }
  };

  const mediaType = "movie";
  const mediaId = 14;

  return (
    <div className="page-test-container">
      <button
        onClick={() =>
          handleToWatchlist(userId, currentProfileId, mediaType, mediaId)
        }
      >
        Call it
      </button>
    </div>
  );
};

export default PageTest;
