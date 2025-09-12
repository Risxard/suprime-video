import { tmdbService } from "../../../services/tmdb/tmdbServices";
import BackdropSlider from "../BackdropSlider/BackdropSlider";
import { useEffect, useState } from "react";

const RecommendationsSlider = (props, sectionTitle) => {
  const [medias, setMedias] = useState([]);

  const { language, mediaId, mediaType } = props;
  const page = 1;

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const data = await tmdbService.fetchRecommendations({
          mediaType,
          mediaId,
          language,
          page,
        });
        setMedias(Array.isArray(data) ? data : data.results || []);
      } catch (err) {
        console.error("Erro ao buscar filmes:", err);
      }
    };

    fetchRecommendations();
  }, []);

  console.log(medias);

  return (
    <div className="recommendations-slider">
      <BackdropSlider medias={medias} sectionTitle={sectionTitle} />
    </div>
  );
};

export default RecommendationsSlider;
