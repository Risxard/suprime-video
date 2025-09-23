import { useEffect, useState } from "react";
import { useIntersectionObserver } from "../../hooks/IntersectionObserver/useIntersationObserver";
import { setSectionTitle } from "../../functions/Converter";
import SlideDistributorItem from "./SlideDistributorItem";
import { tmdbService } from "../../services/tmdb/tmdbServices";


const SlideDistributor = ({ language, mediaType, sliderMap = {}, defaultSlider }) => {
  const [genresArray, setGenresArray] = useState([]);

  const initialSections = 2;
  const numberPeerVisible = 2;


  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await tmdbService.fetchGenres({
          pageType: mediaType,
          language,
        });

        if (data) {
          setGenresArray(data.slice(0, 15));
        }
      } catch (err) {
        console.error("Erro ao buscar gêneros:", err);
      }
    };

    fetchData();
  }, [language, mediaType]);

  const visibleSections = useIntersectionObserver(
    initialSections,
    numberPeerVisible
  );

  return (
    <div>
      {genresArray.slice(0, visibleSections).map((genre) => {
        const SelectedSlider = sliderMap[genre.id] || defaultSlider;

        return (
          <SlideDistributorItem
            key={genre.id}
            Slider={SelectedSlider}
            sectionTitle={setSectionTitle(genre.id, mediaType, language)}
            language={language}
            pageType={mediaType}
            with_genres={genre.id}
            page={1}
          />
        );
      })}

      <svg
        id="InfiniteCheck"
        style={{
          visibility:
            visibleSections[0] < genresArray.length ? "visible" : "hidden",
        }}
        xmlns="http://www.w3.org/2000/svg"
        width="200px"
        height="200px"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
      >
        <circle
          cx="50"
          cy="50"
          fill="none"
          stroke="#4f4e50"
          strokeWidth="10"
          r="35"
          strokeDasharray="164.93361431346415 56.97787143782138"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            repeatCount="indefinite"
            dur="0.5319148936170213s"
            values="0 50 50;360 50 50"
            keyTimes="0;1"
          />
        </circle>
      </svg>
    </div>
  );
};

export default SlideDistributor;
