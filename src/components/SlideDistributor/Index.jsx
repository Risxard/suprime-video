import { lazy, useEffect, useState } from "react";
import { guestApiKey } from "../../Services/guestApi";
import { useIntersectionObserver } from "../../hooks/IntersectionObserver/useIntersationObserver";
import { setSectionTitle } from "../../functions/Converter";

const BackdropSlider = lazy(() =>
  import("../Sliders/BackdropSlider/BackdropSlider")
);

const SlideDistributor = ({ language, mediaType }) => {
  const [genresArray, setGenresArray] = useState([]);
  const APIKey = guestApiKey;
  const api_path = "https://api.themoviedb.org/";
  const initialSections = 2;
  const numberPeerVisible = 4;
  const filterMode = "genre";
  const filterScope = mediaType;

  useEffect(() => {
    const rawUrl = `${api_path}3/genre/${mediaType}/list?language=${language}&api_key=${APIKey}`;


    fetch(rawUrl)
      .then((response) => response.json())
      .then((data) => {
        const genres = data.genres.slice(0, 6);

        setGenresArray(genres);
      });
  }, []);

  const visibleSections = useIntersectionObserver(
    initialSections,
    numberPeerVisible
  );
  return (
    <div>
      {genresArray.slice(0, visibleSections).map((genre) => (
        <BackdropSlider
          key={genre.name}
          sectionTitle={setSectionTitle(genre.id, mediaType, language)}
          language={language}
          selectedGenre={genre.id}
          filterMode={filterMode}
          filterScope={filterScope}
          suprimeTitle={true}
          receivingMode={false}
        ></BackdropSlider>
      ))}

      <svg
        id="InfiniteCheck"
        style={{
          visibility:
            visibleSections[0] < genresArray.length ? "visible" : "hidden",
        }}
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
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
