import { useState } from "react";
import { useParams } from "react-router-dom";
import "./styles.css";
import MediaDetailsTab from "./components/MediaDetailsTab/MediaDetailsTab";
import SuggestionsTab from "./components/SuggestionsTab/SuggestionsTab";
import SeasonsTab from "./components/SeasonsTab/SeasonsTab";

const DetailsTab = ({ media }) => {
  const { mediaType } = useParams();
  const [activeTab, setActiveTab] = useState(
    mediaType === "movie" ? "sugestoes" : "episodios"
  );

  return (
    <div className="details-tabs-container">
      <ul role="tablist" className="details-tabs-container-tablist">
        {mediaType === "tv" && (
          <li
            onClick={() => setActiveTab("episodios")}
            className={activeTab === "episodios" ? "active" : ""}
          >
            <div className="tabItem-text-1">EPISÓDIOS</div>
            <div className="tabItem-text-2">EPISÓDIOS</div>
          </li>
        )}

        <li
          onClick={() => setActiveTab("sugestoes")}
          className={activeTab === "sugestoes" ? "active" : ""}
        >
          <div className="tabItem-text-1">SUGESTÕES</div>
          <div className="tabItem-text-2">SUGESTÕES</div>
        </li>

        <li
          onClick={() => setActiveTab("detalhes")}
          className={activeTab === "detalhes" ? "active" : ""}
        >
          <div className="tabItem-text-1">DETALHES</div>
          <div className="tabItem-text-2">DETALHES</div>
        </li>
      </ul>

      <div>
        {mediaType === "tv" && (
          <div
            style={{
              display: activeTab === "episodios" ? "block" : "none",
            }}
          >
            <SeasonsTab seasons={media?.seasons} tvId={media?.id} />
          </div>
        )}

        <div style={{ display: activeTab === "sugestoes" ? "block" : "none" }}>
          <SuggestionsTab data={media?.similar?.results} />
        </div>

        <div style={{ display: activeTab === "detalhes" ? "block" : "none" }}>
          <MediaDetailsTab media={media} />
        </div>
      </div>
    </div>
  );
};

export default DetailsTab;
