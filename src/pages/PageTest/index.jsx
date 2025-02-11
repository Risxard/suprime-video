import React, { useEffect, useState } from "react";
import "./styles.css";
import { useSelector } from "react-redux";
import {
  getWatchlist,
  addToWatchlist,
} from "../../services/firebase/profilesManager";

const PageTest = () => {
  const profileId = "q2rxgsz2hx9R2qdJn2SW";
  const userId = useSelector((state) => state.auth.user);
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const list = await getWatchlist(userId, profileId);
        setWatchlist(list);
        console.log(list);
      } catch (error) {
        console.error("Error fetching watchlist:", error);
      }
    };

    fetchWatchlist();
  }, [userId, profileId]);

  const handleToWatchlist = async (userId, profileId, mediaType, mediaId) => {
    try {
      const list = await addToWatchlist(userId, profileId, mediaType, mediaId);
    } catch (error) {
      console.error("Error adding to watchlist:", error);
    }
  };

  const mediaType = "movie";
  const mediaId = 14;

  return (
    <div className="page-test-container">
      <button
        onClick={() => handleToWatchlist(userId, profileId, mediaType, mediaId)}
      >
        Call it
      </button>
    </div>
  );
};

export default PageTest;
