import { useState, useEffect } from "react";
import { guestApiKey } from "../../Services/guestApi";

import axios from "axios";

export const useGetVideoKey = (id, lang, mediaType) => {
  const [videoKey, setVideoKey] = useState("");
  const APIKey = guestApiKey;
  const lang2 = lang === "pt-BR" ? "en-US" : "pt-BR";

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();

    const videoFilter = (videoArray) => {
      const filteredVideos = videoArray.filter(
        (video) =>
          video.official !== false &&
          !video.name.toLowerCase().includes("acessibilidade") &&
          !video.name.toLowerCase().includes("accessibility")
      );

      const trailerVideos = filteredVideos.filter(
        (video) => video.type === "Trailer"
      );
      const otherVideos = filteredVideos.filter(
        (video) => video.type !== "Trailer"
      );

      const orderedVideos = [...trailerVideos, ...otherVideos];

      let preferredVideo = null;

      for (const video of orderedVideos) {
        if (video.name.toLowerCase().includes("dublado")) {
          preferredVideo = video;
          break;
        } else if (!preferredVideo) {
          preferredVideo = video;
        }
      }

      return preferredVideo ? preferredVideo.key : null;
    };

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/${mediaType}/${id}/videos?language=${lang}&api_key=${APIKey}`,
          {
            cancelToken: cancelTokenSource.token,
          }
        );

        const initialData = response.data.results;

        if (videoFilter(initialData) === null) {
          const res = await axios.get(
            `https://api.themoviedb.org/3/${mediaType}/${id}/videos?language=${lang2}&api_key=${APIKey}`,
            {
              cancelToken: cancelTokenSource.token,
            }
          );

          const data = res.data.results;

          setTimeout(() => {
            setVideoKey(videoFilter(data));
          }, 0);
        } else {
          setTimeout(() => {
            setVideoKey(videoFilter(initialData));
          }, 0);
        }
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request canceled:", error.message);
        } else {
          console.error("Error fetching data:", error.message);
        }
      }
    };

    fetchData();
  }, [id, lang, lang2, APIKey]);

  return videoKey;
};

export default useGetVideoKey;
