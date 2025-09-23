import React, { useEffect, useState } from "react";
import { tmdbService } from "../../services/tmdb/tmdbServices";

const SlideDistributorItem = (props) => {
  const [medias, setMedias] = useState([]);

  const { pageType, language, with_genres, page, sectionTitle, Slider } = props;



  useEffect(() => {
    const fetchPerGenres = async () => {
      try {
        const data = await tmdbService.fetchPerGenres({
          pageType,
          language,
          with_genres,
          page,
          sort_by: "popular.desc",
        });
        setMedias(Array.isArray(data) ? data : data.results || []);
      } catch (err) {
        console.error("Erro ao buscar filmes:", err);
      }
    };

    fetchPerGenres();
  }, [pageType, language, with_genres, page]);

  return (
    <div className="slide-distributor-item">
      {Slider ? (
        <Slider medias={medias} sectionTitle={sectionTitle} language={language}/>
      ) : (
        <div>⚠ Nenhum slider recebido</div>
      )}
    </div>
  );
};

export default SlideDistributorItem;
