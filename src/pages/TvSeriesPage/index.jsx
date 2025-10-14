import "./styles.css";

import BrowseComponent from "../../components/BrowseComponent/index.jsx";

const TvSeriesPage = () => {
  return (
    <div className="tvseries-page">
      <BrowseComponent mediaType={"tv"} />
    </div>
  );
};

export default TvSeriesPage;
