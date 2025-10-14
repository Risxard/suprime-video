import { useEffect, useRef, useState } from "react";
import genresList from "../../utils/genresList.json";
import "./styles.css";
import { useSelector } from "react-redux";
import SmallCardList from "../../components/Cards/SmallCardList/SmallCardList";
import { tmdbService } from "../../services/tmdb/tmdbServices";
import NextBtnTablist from "./components/NextBtnTablist";
import PrevBtnTablist from "./components/PrevBtnTablist";
import LoadingComponent from "../utils/LoadingComponent";

const BrowseComponent = ({ mediaType }) => {
  const carouselRef = useRef(null);
  const observerRef = useRef(null);
  const language = useSelector((state) => state.lang.language);

  const genres = mediaType === "movie" ? genresList.movies : genresList.tv;

  const [selectedGenre, setSelectedGenre] = useState(
    genres.length > 0 ? genres[0].id : null
  );

  const [genreCache, setGenreCache] = useState({});
  const [loading, setLoading] = useState(false);

  const scrollLeft = () => {
    carouselRef.current?.scrollBy({ left: -200 });
  };

  const scrollRight = () => {
    carouselRef.current?.scrollBy({ left: 200 });
  };

  const MAX_PAGES = 5;

  const fetchMedias = async (genreId, page = 1) => {
    if (loading) return;

    if (page > MAX_PAGES) return;

    setLoading(true);
    try {
      const data = await tmdbService.fetchPerGenres({
        pageType: mediaType,
        language,
        with_genres: genreId,
        page,
        sort_by: "popularity.desc",
      });

      const results = Array.isArray(data) ? data : data.results || [];

      setGenreCache((prev) => {
        const prevData = prev[genreId] || {
          medias: [],
          page: 0,
          hasMore: true,
        };

        return {
          ...prev,
          [genreId]: {
            medias: page === 1 ? results : [...prevData.medias, ...results],
            page,

            hasMore: results.length > 0 && page < MAX_PAGES,
          },
        };
      });
    } catch (err) {
      console.error("Erro ao buscar filmes/séries:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!selectedGenre) return;

    if (!genreCache[selectedGenre]) {
      fetchMedias(selectedGenre, 1);
    }
  }, [selectedGenre, language]);

  useEffect(() => {
    if (loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const currentGenre = genreCache[selectedGenre];
        if (entries[0].isIntersecting && currentGenre && currentGenre.hasMore) {
          fetchMedias(selectedGenre, (currentGenre.page || 1) + 1);
        }
      },
      { threshold: 1 }
    );

    if (observerRef.current) observer.observe(observerRef.current);

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [selectedGenre, genreCache, loading]);

  const currentGenreData = genreCache[selectedGenre] || { medias: [] };

  return (
    <div className="browse-container">
      <h1>{mediaType === "movie" ? "Filmes" : "Séries"}</h1>

      <div className="tablist-carousel-container">
        <button className="tablist-carousel-prevbtn" onClick={scrollLeft}>
          <PrevBtnTablist />
        </button>

        <div className="tablist-carousel-list-container" ref={carouselRef}>
          <div role="tablist" className="tablist-carousel-list">
            {genres.map((genre) => (
              <button
                key={genre.id}
                className={selectedGenre === genre.id ? "active" : ""}
                onClick={() => setSelectedGenre(genre.id)}
              >
                {genre.name[language]}
              </button>
            ))}
          </div>
        </div>

        <button className="tablist-carousel-nextbtn" onClick={scrollRight}>
          <NextBtnTablist />
        </button>
      </div>

      <div className="browse-media-cards">
        <SmallCardList medias={currentGenreData.medias} />
        
        {loading && <LoadingComponent />}

        <div ref={observerRef} style={{ height: "1px" }} />
      </div>
    </div>
  );
};

export default BrowseComponent;
