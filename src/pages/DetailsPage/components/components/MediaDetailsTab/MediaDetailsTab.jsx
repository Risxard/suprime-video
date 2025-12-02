import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { dateConverter, genreConverter } from "../../../../../utils/converters";
import "./styles.css";
import { useSelector } from "react-redux";

const MediaDetailsTab = ({ media }) => {
  const { t } = useTranslation();
  const { mediaType } = useParams();

  const detailsInfo = t("details-page.info", { returnObjects: true });
  const language = useSelector((state) => state.lang.language);

  const release_date = media?.release_date || media?.first_air_date;

  const genreNames =
    media?.genres?.map((g) =>
      genreConverter(g.id, language, mediaType || "movie")
    ) ||
    media?.genre_ids?.map((id) =>
      genreConverter(id, language, mediaType || "movie")
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
                  {detailsInfo.releaseDate}
                </div>
                <p>{dateConverter(release_date)}</p>
              </div>
            )}

            {genreNames.length > 0 && (
              <div className="detailsTab-info-media-item">
                <div className="media-releaseDate-title">
                  {detailsInfo.genres}
                </div>
                <p>{genreNames.slice(0, 3).join(", ")}</p>
              </div>
            )}
          </div>

          <div className="detailsTab-info-credits">
            {creatorsOrDirectors?.length > 0 && (
              <div className="detailsTab-info-media-item">
                <div className="media-releaseDate-title">
                  {mediaType === "tv"
                    ? detailsInfo.seasons
                    : detailsInfo.director}
                </div>
                {creatorsOrDirectors.map((name, idx) => (
                  <p key={idx}>{name}</p>
                ))}
              </div>
            )}

            {cast && (
              <div className="detailsTab-info-media-item">
                <div className="media-releaseDate-title">
                  {detailsInfo.cast}
                </div>
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
