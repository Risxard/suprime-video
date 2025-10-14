import "./styles.css";

import BrowseComponent from "../../components/BrowseComponent/index.jsx";

const MoviesPage = () => {
  return (
    <div className="movies-page">
      <BrowseComponent mediaType={"movie"} />
    </div>
  );
};

export default MoviesPage;
