import { useParams } from "react-router-dom";
import {
  dateConverter,
  genreConverter,
} from "../../../../../functions/Converter";
import "./styles.css";

const MediaDetailsTab = ({ media }) => {
  const { mediaType } = useParams();
  const release_date = media?.release_date || media?.first_air_date;

  const genreNames =
    media?.genres?.map((g) =>
      genreConverter(g.id, "pt-BR", mediaType || "movie")
    ) ||
    media?.genre_ids?.map((id) =>
      genreConverter(id, "pt-BR", mediaType || "movie")
    ) ||
    [];

  const creatorsOrDirectors =
    mediaType === "tv"
      ? media?.created_by?.length > 0
        ? media.created_by.map((c) => c.name)
        : null
      : media?.credits?.crew
          ?.filter((c) => c.job === "Director")
          .map((c) => c.name) || null;

  const cast =
    media?.credits?.cast?.length > 0 ? media.credits.cast.slice(0, 10) : null;

  return (
    <div className="tab-content">
      <div className="detailsTab">
        <div className="detailsTab-title-container">
          <h3>{media?.title || media?.name}</h3>
          <p>{media?.overview}</p>
        </div>

        <div className="detailsTab-info-container">
          <div className="detailsTab-info-media">
            {release_date && (
              <div className="detailsTab-info-media-item">
                <div className="media-releaseDate-title">
                  Data de lançamento:
                </div>
                <p>{dateConverter(release_date)}</p>
              </div>
            )}

            {genreNames.length > 0 && (
              <div className="detailsTab-info-media-item">
                <div className="media-releaseDate-title">Gênero:</div>
                <p>{genreNames.slice(0, 3).join(", ")}</p>
              </div>
            )}
          </div>

          <div className="detailsTab-info-credits">
            {creatorsOrDirectors?.length > 0 && (
              <div className="detailsTab-info-media-item">
                <div className="media-releaseDate-title">
                  {mediaType === "tv" ? "Criação:" : "Direção:"}
                </div>
                {creatorsOrDirectors.map((name, idx) => (
                  <p key={idx}>{name}</p>
                ))}
              </div>
            )}

            {cast && (
              <div className="detailsTab-info-media-item">
                <div className="media-releaseDate-title">Elenco:</div>
                {cast.map((c) => (
                  <p key={c.id}>{c.name}</p>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaDetailsTab;
