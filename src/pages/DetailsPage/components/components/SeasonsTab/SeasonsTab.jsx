import { ChevronDown } from "lucide-react";
import "./styles.css";
import { useState, useEffect, useRef } from "react";
import i18next from "i18next";
import { tmdbService } from "../../../../../services/tmdb/tmdbServices";
import DetailCardList from "../../../../../components/Cards/DetailCardList/DetailCardList";
import { auth } from "../../../../../services/firebase/firebaseconfig";


const SeasonsTab = ({ seasons = [], tvId }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [medias, setMedias] = useState({});
  const language = i18next.language;

  const dropdownRef = useRef(null);

  const isGuest = auth.currentUser?.isAnonymous === true;

const guestCustomEpisodes = {
  episodes: [
    {
      id: 1,
      name: "Episódio 1",
      overview: "Disponível apenas para usuários registrados.",
      still_path: "/bAG05yQkT56yFuLAETr12UfK05y.jpg",
      episode_number: 1,
      season_number: selectedSeason,
    },
    {
      id: 2,
      name: "Episódio 2",
      overview: "Faça login para desbloquear o conteúdo.",
      still_path: "/aucOJvfpmoqDPYZsvdAGR8WwJMC.jpg",
      episode_number: 2,
      season_number: selectedSeason,
    },
    {
      id: 3,
      name: "Episódio 3",
      overview: "Assista criando sua conta gratuita.",
      still_path: "/sE5gqaRgOSAQ2AYVDjxmsfeJVTu.jpg",
      episode_number: 3,
      season_number: selectedSeason,
    },
    {
      id: 4,
      name: "Episódio 4",
      overview: "Conteúdo exclusivo para membros.",
      still_path: "/2BFNBZD0jpMlhGwglWfC3XI2yW7.jpg",
      episode_number: 4,
      season_number: selectedSeason,
    },
    {
      id: 5,
      name: "Episódio 5",
      overview: "Crie sua conta grátis para continuar.",
      still_path: "/iX77zMSqUv2Qt7ToEnN2mmEudEf.jpg",
      episode_number: 5,
      season_number: selectedSeason,
    },
    {
      id: 6,
      name: "Episódio 6",
      overview: "Faça upgrade para assistir este episódio.",
      still_path: "/87uShMszqPxwA034GsskGdzJOgN.jpg",
      episode_number: 6,
      season_number: selectedSeason,
    },
    {
      id: 7,
      name: "Episódio 7",
      overview: "Conteúdo premium desbloqueado apenas para membros.",
      still_path: "/zUATenHdRhv0cnkAyAhv9fqxVUh.jpg",
      episode_number: 7,
      season_number: selectedSeason,
    },
    {
      id: 8,
      name: "Episódio 8",
      overview: "Crie sua conta para ver este final emocionante!",
      still_path: "/sShAzjIQlf65OEsb7SxL2aKDn4M.jpg",
      episode_number: 8,
      season_number: selectedSeason,
    },
  ],
};


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
      if (isGuest) {
        setMedias(guestCustomEpisodes);
        return;
      }

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

    if (language && tvId) {
      fetchMediaData();
    }
  }, [selectedSeason, tvId, language, isGuest]);


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
