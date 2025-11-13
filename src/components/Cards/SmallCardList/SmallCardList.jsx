import "./styles.css";
import BackdropInfoItem from "../../Carousels/BackdropInfoCarousel/components/BackdropInfoItem";

const BackdropInfoList = ({ medias }) => {
  if (!medias || medias.length === 0) return null;

  const validMedias = medias.filter((media) => media.backdrop_path);

  return (
    <div className="small-card-list">
      {validMedias.map((media) => {
        return <BackdropInfoItem key={media.id} movie={media} />;
      })}
    </div>
  );
};

export default BackdropInfoList;
