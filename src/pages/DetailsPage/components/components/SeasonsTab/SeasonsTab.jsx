import { ChevronDown } from "lucide-react";
import "./styles.css";
import { useState, useEffect, useRef } from "react";
import i18next from "i18next";
import { tmdbService } from "../../../../../services/tmdb/tmdbServices";
import DetailCardList from "../../../../../components/Cards/DetailCardList/DetailCardList";

const SeasonsTab = ({ seasons = [], tvId }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [medias, setMedias] = useState({});
  const language = i18next.language;

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchMediaData = async () => {
      try {
        const details = await tmdbService.fetchSeason({
          tvId,
          seasonNumber: selectedSeason,
          language,
        });

        setMedias(details);
      } catch (error) {
        console.error("Erro ao buscar mídia:", error);
      }
    };

    if (language && tvId && language) {
      fetchMediaData();
    }
  }, [selectedSeason, tvId, language]);

  const handleSelectSeason = (season_number) => {
    setSelectedSeason(season_number);
    setShowDropdown(false);
  };

  const selectedSeasonName =
    seasons.find((s) => s.season_number === selectedSeason)?.name ||
    "Selecione uma temporada";

  return (
    <div className="tab-content">
      <div className="season-tab-dropdown" ref={dropdownRef}>
        {seasons.length === 1 ? (
          <p>{selectedSeasonName}</p>
        ) : (
          <>
            <button onClick={() => setShowDropdown((prev) => !prev)}>
              <span>{selectedSeasonName}</span>
              <ChevronDown />
            </button>

            {showDropdown && seasons.length > 0 && (
              <ul>
                {seasons.map((season) => (
                  <li
                    key={season.id || season.season_number}
                    className={
                      selectedSeason === season.season_number ? "active" : ""
                    }
                    onClick={() => handleSelectSeason(season.season_number)}
                  >
                    {season.name}
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>

      <DetailCardList
        cards={(medias.episodes || []).filter((ep) => !!ep.still_path)}
      />
    </div>
  );
};

export default SeasonsTab;
