import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

const AddNewButton = () => {
  const { t } = useTranslation();

  const profilesPage = t("profiles-page", { returnObjects: true });

  return (
    <NavLink
      to="/select-avatar"
      className="profile-picture-container add-new-profile-list-btn"
    >
      <div className="picture-container">
        <svg
          aria-hidden="true"
          aria-label="plus"
          color="white"
          role="img"
          viewBox="0 0 36 36"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M16.469 17.219V5.5a1 1 0 0 1 1-1h.312a1 1 0 0 1 1 1v11.719H30.5a1 1 0 0 1 1 1v.312a1 1 0 0 1-1 1H18.781V31.25a1 1 0 0 1-1 1h-.312a1 1 0 0 1-1-1V19.531H4.75a1 1 0 0 1-1-1v-.312a1 1 0 0 1 1-1h11.719z"></path>
        </svg>
      </div>

      <h3>{profilesPage.editProfiles["button-add"]}</h3>
    </NavLink>
  );
};

export default AddNewButton;
