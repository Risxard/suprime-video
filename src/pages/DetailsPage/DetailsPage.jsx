import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import i18next from "i18next";
import "./styles.css";
import {
  image_path_342,
  image_path_92,
  image_path_original,
} from "../../utils/imagePaths";
import { tmdbService } from "../../services/tmdb/tmdbServices";
import PlayActionIcon from "./assets/PlayActionIcon";
import PlusActionIcon from "./assets/PlusActionIcon";
import DetailsTab from "./components/DetailsTab";
import DoneActionIcon from "./assets/DoneActionIcon";
import { updateWatchlist } from "../../services/firebase/profileServices";
import { useDispatch, useSelector } from "react-redux";
import LoadingIcon from "../../assets/svgs/LoadingIcon";

const DetailsPage = () => {
  const [media, setMedia] = useState(null);
  const [logo, setLogo] = useState(null);
  const [bgOpacity, setBgOpacity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const language = i18next.language;
  const { mediaType, id } = useParams();
  const dispatch = useDispatch();

  const profileId = useSelector((state) => state.auth.currentProfile.id);
  const watchlist = useSelector((state) => state.auth.watchList);
  const isInWatchlist = watchlist?.[mediaType]?.includes(id);
  const action = isInWatchlist ? "remove" : "add";

  const handleToWatchlist = async (profileId, mediaType, mediaId, action) => {
    setIsLoading(true);
    try {
      await updateWatchlist(profileId, mediaType, mediaId, action, dispatch);
    } catch (error) {
      console.error("Error adding to watchlist:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchMediaData = async () => {
      try {
        const details = await tmdbService.fetchMediaDetails({
          mediaType,
          mediaId: id,
          language,
        });

        setMedia(details);

        const response = await tmdbService.fetchMediaLogoImage({
          mediaId: id,
          mediaType,
          language,
          originalLanguage: details.original_language,
        });

        if (response) {
          setLogo(response.file_path);
        }
      } catch (error) {
        console.error("Erro ao buscar mídia:", error);
      }
    };

    fetchMediaData();
  }, [id, language, mediaType]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const halfScreen = window.innerHeight / 5;

      let newOpacity = 1 - (scrollY / halfScreen) * 0.8;
      if (newOpacity < 0.2) newOpacity = 0.2;
      if (newOpacity > 1) newOpacity = 1;

      setBgOpacity(newOpacity);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);



  return (
    <>
      <div className="details-page">
        <div className="details-page-container">
          <div className="details-page-content">
            <div
              className="details-page-media-background"
              style={{ opacity: bgOpacity }}
            >
              <div className="details-page-media-background-image">
                <img
                  src={`${image_path_92}${media?.backdrop_path}`}
                  alt=""
                  className="details-page-media-background-image-blurred"
                />
                <img
                  src={`${image_path_original}${media?.backdrop_path}`}
                  alt=""
                  className="details-page-media-background-image-original"
                />
              </div>
              <div className="details-page-media-background-filter" />
            </div>

            <section className="explore-ui-main-container">
              <div className="explore-ui-main-content">
                <div className="explore-ui-main-content-logo">
                  {logo ? (
                    <img
                      src={`${image_path_342}${logo}`}
                      alt="Logo"
                      className="details-page-logo"
                    />
                  ) : (
                    <h2>{media?.title || media?.name}</h2>
                  )}
                </div>

                <div className="explore-ui-main-content-overview">
                  <p>{media?.overview}</p>
                </div>

                <div className="explore-ui-main-content-actions">
                  <a href="" className="play-action">
                    <PlayActionIcon />
                    Assistir
                  </a>
                  <div
                    className="watchlist-action"
                    onClick={() =>
                      handleToWatchlist(profileId, mediaType, id, action)
                    }
                  >
                    <button>
                      {isLoading ? (
                        <LoadingIcon />
                      ) : isInWatchlist ? (
                        <DoneActionIcon />
                      ) : (
                        <PlusActionIcon />
                      )}
                    </button>
                    <span className="watchlist-action-showup">Minha lista</span>
                  </div>
                </div>
              </div>
            </section>

            <DetailsTab media={media} />
          </div>
        </div>
      </div>
      <div className="app-background" />
    </>
  );
};

export default DetailsPage;
