import { useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./styles.css";

import MediaDetailsTab from "./components/MediaDetailsTab/MediaDetailsTab";
import SuggestionsTab from "./components/SuggestionsTab/SuggestionsTab";
import SeasonsTab from "./components/SeasonsTab/SeasonsTab";
import { auth } from "../../../services/firebase/firebaseconfig";

const DetailsTab = ({ media }) => {
  const { t } = useTranslation();
  const { mediaType } = useParams();

  const isGuest = auth.currentUser?.isAnonymous === true;


  const tabs = t("details-page.tabs", { returnObjects: true });

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
            <div className="tabItem-text-1">{tabs.episodes || "EPISÓDIOS"}</div>
            <div className="tabItem-text-2">{tabs.episodes || "EPISÓDIOS"}</div>
          </li>
        )}

        <li
          onClick={() => setActiveTab("sugestoes")}
          className={activeTab === "sugestoes" ? "active" : ""}
        >
          <div className="tabItem-text-1">{tabs.similar}</div>
          <div className="tabItem-text-2">{tabs.similar}</div>
        </li>

        <li
          onClick={() => setActiveTab("detalhes")}
          className={activeTab === "detalhes" ? "active" : ""}
        >
          <div className="tabItem-text-1">{tabs.details}</div>
          <div className="tabItem-text-2">{tabs.details}</div>
        </li>
      </ul>

      <div className="details-tabs-content">
        {mediaType === "tv" && (
          <div
            className={isGuest ? "locked-content" : ""}
            style={{
              display: activeTab === "episodios" ? "block" : "none",
            }}
          >
            <div className="login-to-unlock">
              <div className="login-to-unlock-content">
                <h2>Logue para desbloquear o conteúdo</h2>
                <button>Login</button>
              </div>
            </div>

            <SeasonsTab seasons={media?.seasons} tvId={media?.id} />
          </div>
        )}

        <div style={{ display: activeTab === "sugestoes" ? "block" : "none" }}>
          <SuggestionsTab data={media} />
        </div>

        <div style={{ display: activeTab === "detalhes" ? "block" : "none" }}>
          <MediaDetailsTab media={media} />
        </div>
      </div>
    </div>
  );
};

export default DetailsTab;
