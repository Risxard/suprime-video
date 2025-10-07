import { useDispatch, useSelector } from "react-redux";
import AddNew from "./CreateProfile/Addnew";
import { useNavigate } from "react-router-dom";
import NavProfiles from "../../../components/Navigation/NavProfiles";

const ManageProfileSelect = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentProfile = useSelector((state) => state.auth.currentProfile);

  const { t } = useTranslation();
  const profilesPage = t("profilesPage");
  const profilesList = useSelector((state) => state.auth.profiles);
  const validProfilesList = Array.isArray(profilesList) ? profilesList : [];

  const sortedProfiles = currentProfile
    ? [...validProfilesList].sort((a, b) => {
        if (a.id == currentProfile.id) return -1;
        if (b.id == currentProfile.id) return 1;
        return 0;
      })
    : [...validProfilesList];

  const handleNavigateToEditProfile = (profileId) => {
    navigate(`/editing&profileId/${profileId}`);
  };

  return (
    <>
      <NavProfiles text="Editar Perfil" onSubmitNavBtn={() => navFunction()} />
        
      <div className="profiles-page-container">
        <h1>{profilesPage.title}</h1>
        <ul className="profile-list">
          {sortedProfiles.length > 0
            ? sortedProfiles.map((profile) => (
                <li
                  key={profile.id}
                  onClick={() => handleNavigateToEditProfile(profile.id)}
                  className={
                    currentProfile && currentProfile.id == profile.id
                      ? "active"
                      : ""
                  }
                >
                  <span className="profile-picture-container">
                    <div className="picture-container">
                      <img
                        src={profile.userInfoData.img?.url}
                        alt={profile.userInfoData.name}
                      />
                    </div>
                    <p>{profile.userInfoData.name}</p>
                  </span>
                  <span className={`edit-btn active`}>
                    <svg
                      className="fbl-icon _30dE3d _1a_Ljt _1gd3Wc TKitl4"
                      viewBox="0 0 24 24"
                      height="30"
                      width="30"
                      role="img"
                      aria-hidden="true"
                    >
                      <title>Edit</title>
                      <svg
                        width="30"
                        height="30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M17.300 2.859 C 16.958 2.934,16.579 3.096,16.291 3.291 C 16.154 3.384,12.882 6.409,9.021 10.013 L 2.000 16.565 2.000 19.283 L 2.000 22.000 4.697 22.000 L 7.394 22.000 14.067 15.776 C 17.737 12.352,20.899 9.396,21.092 9.206 C 21.656 8.653,21.925 8.188,22.060 7.534 C 22.208 6.816,22.070 6.041,21.674 5.371 C 21.529 5.124,20.411 3.952,19.920 3.531 C 19.559 3.221,19.016 2.944,18.607 2.860 C 18.254 2.788,17.628 2.787,17.300 2.859 M18.345 4.864 C 18.538 4.944,19.891 6.272,20.007 6.495 C 20.168 6.808,20.144 7.209,19.944 7.504 C 19.857 7.634,18.457 8.960,18.408 8.960 C 18.392 8.960,17.804 8.384,17.100 7.680 L 15.821 6.401 15.921 6.306 C 16.751 5.514,17.405 4.936,17.536 4.876 C 17.742 4.783,18.134 4.777,18.345 4.864 M15.660 9.080 L 16.940 10.361 16.640 10.636 C 16.475 10.788,14.153 12.955,11.480 15.453 L 6.620 19.995 5.309 19.998 L 3.999 20.000 4.009 18.708 L 4.020 17.417 9.171 12.608 C 12.004 9.964,14.335 7.800,14.351 7.800 C 14.367 7.800,14.956 8.376,15.660 9.080 "
                          fill="currentColor"
                          stroke="none"
                          fillRule="evenodd"
                        ></path>
                      </svg>
                    </svg>
                  </span>
                </li>
              ))
            : null}
          <li>
            <AddNew />
          </li>
        </ul>
      </div>
    </>
  );
};

export default ManageProfileSelect;
