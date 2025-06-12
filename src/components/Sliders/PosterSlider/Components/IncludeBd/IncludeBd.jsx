import React, { useEffect } from "react";
import MediaClass from "../MediaClass/MediaClass";
import { useTranslation } from "react-i18next";

const IncludeBd = (props) => {
  const id = props.id;
  const language = props.language;
  const mediaType = props.mediaType;

  const { t } = useTranslation();

  const componentsLang = t("components");

  const { includeWithAcaiwave } = componentsLang;

  return (
    <div className="class-container">
      <span className="includeBD">
        <span>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_437_254)">
              <path
                d="M11.1198 2.03902C8.64083 2.28702 6.41383 3.36202 4.76083 5.10702C1.80583 8.22802 1.15783 12.819 3.13683 16.623C3.61983 17.552 4.16383 18.288 4.93783 19.061C5.92983 20.051 7.03783 20.789 8.27183 21.278C11.6338 22.61 15.3128 22.08 18.1998 19.845C18.6368 19.507 19.5068 18.637 19.8448 18.2C21.2558 16.378 21.9998 14.236 21.9998 12C21.9998 7.43202 18.8418 3.38702 14.4298 2.30302C13.4458 2.06202 12.0278 1.94802 11.1198 2.03902ZM17.0918 8.19102C17.4098 8.34102 17.6598 8.59202 17.8158 8.92002C17.9258 9.15102 17.9398 9.22102 17.9398 9.54102C17.9398 9.86902 17.9278 9.92702 17.8048 10.181C17.6788 10.443 17.4798 10.651 14.5448 13.588C11.5778 16.558 11.4058 16.723 11.1398 16.848C10.8878 16.967 10.8238 16.98 10.4998 16.98C10.1758 16.98 10.1118 16.967 9.85983 16.848C9.60383 16.726 9.46583 16.6 8.19283 15.328C6.91483 14.051 6.79383 13.918 6.67183 13.66C6.55383 13.408 6.53983 13.344 6.53983 13.02C6.53983 12.7 6.55383 12.631 6.66383 12.4C6.82083 12.07 7.06983 11.821 7.39983 11.664C7.63083 11.554 7.69983 11.54 8.01983 11.54C8.34283 11.54 8.40783 11.554 8.65383 11.67C8.89083 11.782 9.03583 11.907 9.71383 12.578L10.4998 13.356L13.0198 10.843C15.6288 8.24002 15.6868 8.18802 16.1098 8.08102C16.3798 8.01302 16.8168 8.06102 17.0918 8.19102Z"
                fill="#7B26D2"
              />
            </g>
            <defs>
              <clipPath id="clip0_437_254">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </span>
        <p>{includeWithAcaiwave.title}</p>
      </span>

      <MediaClass language={language} id={id} mediaType={mediaType} />
    </div>
  );
};

export default IncludeBd;
