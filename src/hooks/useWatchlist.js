import { useState, useEffect, useCallback } from "react";
import { getWatchlist, updateWatchlist } from "../services/firebase/profileServices";

export const useWatchlist = (profileId, dispatch) => {
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchWatchlist = useCallback(async () => {
    if (!profileId) return;

    try {
      const list = await getWatchlist(profileId, dispatch);
      setWatchlist(Array.isArray(list) ? list : []);
    } catch {
      setWatchlist([]);
    }
  }, [profileId, dispatch]);

  useEffect(() => {
    fetchWatchlist();
  }, [fetchWatchlist]);

  const toggleWatchlist = async (mediaType, mediaId, isInWatchlist) => {
    if (!profileId) return;

    setLoading(true);
    const action = isInWatchlist ? "remove" : "add";

    try {
      await updateWatchlist(profileId, mediaType, mediaId, action, dispatch);
      await fetchWatchlist();
    } catch {
      console.error("Erro ao atualizar watchlist");
    } finally {
      setLoading(false);
    }
  };

  const isInWatchlist = (mediaId, mediaType) =>
    watchlist.some(
      (item) => String(item.id) === String(mediaId) && item.media_type === mediaType
    );

  return {
    watchlist,
    loading,
    isInWatchlist,
    toggleWatchlist,
  };
};
