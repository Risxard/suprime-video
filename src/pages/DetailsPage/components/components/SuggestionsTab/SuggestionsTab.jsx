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

        let results = response?.results || [];


        if (results.length === 0) {
          const fallbackResponse = await tmdbService.fetchPerGenres({
            pageType: mediaType,
            language,
            with_genres: data?.genres?.map((genre) => genre.id).join(","),
            page: 1,
            sort_by: "popularity.desc",
          });

          results = fallbackResponse || [];
        }

        setMedias(results.slice(0, 8));
      } catch (error) {
        console.error("Erro ao buscar mídia:", error);
      }
    };

    if (!data?.similar?.results || data.similar.results.length === 0) {
      fetchMediaData();
    } else {
      setMedias(data.similar.results.slice(0, 8));
    }
  }, [data, id, mediaType, language]);

  return (
    <div className="tab-content">
      <SmallCardList medias={medias} />
    </div>
  );
};

export default SuggestionsTab;
