import { useEffect, useState } from "react";
import SmallCardList from "../../../../../components/Cards/SmallCardList/SmallCardList";
import { tmdbService } from "../../../../../services/tmdb/tmdbServices";
import i18next from "i18next";
import { useParams } from "react-router-dom";
import "./styles.css";

const SuggestionsTab = ({ data }) => {
  const [medias, setMedias] = useState([]);
  const language = i18next.language;
  const { mediaType, id } = useParams();

  useEffect(() => {
    const fetchMediaData = async () => {
      try {
        const response = await tmdbService.fetchRecommendations({
          mediaType,
          mediaId: id,
          language,
          page: 1,
        });


        const filteredMedias = response.slice(0, 8);
        setMedias(filteredMedias);
      } catch (error) {
        console.error("Erro ao buscar mídia:", error);
      }
    };

    if (!data || data.length === 0) {
      fetchMediaData();
    } else {
      const filteredMedias = data?.slice(0, 8);
      setMedias(filteredMedias);
    }
  }, [data, id, mediaType, language]);

  return (
    <div className="tab-content">
      <SmallCardList medias={medias} />
    </div>
  );
};

export default SuggestionsTab;
