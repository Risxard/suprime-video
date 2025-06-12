import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { createNewProfile } from "../../../../services/firebase/profilesManager.js";
import NavStandalone from "../../../../components/Navigation/NavStandalone.jsx";

import imageList from "../../assets/ImageList.json";
import { useTranslation } from "react-i18next";

const CreateNewProfilePage = () => {
  const [picSelector, setPicSelector] = useState(false);
  const [imageProfile, setImageProfile] = useState("");
  const handlePicSelector = () => {
    setPicSelector(true);
  };

  const handleSetImageProfile = (imageUrl) => {
    setImageProfile(imageUrl);
    setPicSelector(false);
  };


    const { t } = useTranslation();
    const profilesPage = t("profilesPage");


  return (
    <>
      <NavStandalone />
      <div className="profiles-page">
        {picSelector ? (
          <div>
            <div className="pic-profile-selector-container">
              <h1>{profilesPage.changeImageProfile}</h1>
              <ul className="picture-list">
                {imageList.map((image, index) => (
                  <li
                    key={index}
                    onClick={() => handleSetImageProfile(image.url)}
                  >
                    <img src={image.url} alt={image.title} />
                  </li>
                ))}
              </ul>
              <div className="editing-profile-controlers">
                <a
                  className="edit-options-li-btn"
                  onClick={() => setPicSelector(false)}
                >
                  {profilesPage.newProfile.cancelButton}
                </a>
              </div>
            </div>
          </div>
        ) : (
          <CreateAProfile
            imageProfile={imageProfile}
            onPicSelector={handlePicSelector}
            profilesPage={profilesPage.newProfile}
          />
        )}
      </div>
    </>
  );
};

const CreateAProfile = ({ imageProfile, onPicSelector, profilesPage }) => {
  const [dataChange, setDataChange] = useState(false);
  const profiles = useSelector((state) => state.auth.profiles);
  const userId = useSelector((state) => state.auth.user);
  const [inputName, setInputName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputName(value);
    setDataChange(value !== "");
  };



  async function handleCreateProfile(userId, inputName, imageProfile) {
    if (isSubmitting) return;
    setIsSubmitting(true);
    const result = await createNewProfile(userId, inputName, imageProfile);
    setIsSubmitting(false);
    if (result) {
      console.log("Create Profile successfully");
      window.location.href = "/preview/acaiwaveplus/profiles";
    } else {
      console.log("Failed to Create a Profile");
    }
  }

  return (
    <>
      <h1>{profilesPage.title}</h1>

      <div className="editing-profiles-container">
        <div
          className="editing-profiles-image-container"
          onClick={() => onPicSelector()}
        >
          <img
            className="editing-profiles-image"
            src={
              imageProfile
                ? imageProfile
                : "https://m.media-amazon.com/images/G/02/CerberusPrimeVideo-FN38FSBD/adult-2.png"
            }
            alt="Profile"
          />

          <svg
            viewBox="0 0 24 24"
            height="24"
            width="24"
            role="img"
            aria-hidden="true"
          >
            <title>Edit</title>
            <svg
              width="24"
              height="24"
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
        </div>

        <div className="changeName-input-container">
          <span>
            <div>
              <input
                type="text"
                value={inputName}
                onChange={handleInputChange}
                placeholder={profilesPage.placeHolderNameInput}
                maxLength={50}
              />
            </div>
          </span>
        </div>
      </div>

      <div className="editing-profile-controlers">
        <a
          href="/preview/acaiwaveplus/profiles"
          className="edit-options-li-btn"
        >
          {profilesPage.cancelButton}
        </a>
        <span
          href=""
          className="edit-options-li-btn"
          data-changes={dataChange}
          onClick={() => handleCreateProfile(userId, inputName, imageProfile)}
        >
          {profilesPage.saveButton}
        </span>
      </div>
    </>
  );
};

export default CreateNewProfilePage;
