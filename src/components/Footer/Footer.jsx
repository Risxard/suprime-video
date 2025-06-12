import React from "react";
import "./footer.css";
import suprimevideologo from "../../assets/acaiwaveLogo.png";
import { useTranslation } from "react-i18next";

const Footer = (props) => {
  const { t } = useTranslation();
  const footerSection = t("footer");

  return (
    <footer id="#footer">
      <span className="footer-logo">
        <img src={suprimevideologo} alt="suprime video logo" />
      </span>

      <div className="footer-container">
        <ul>
          <li>
            <a href="">{footerSection.links.termsAndPrivacy}</a>
          </li>
          <li>
            <a href="">{footerSection.links.feedback}</a>
          </li>
          <li>
            <a href="">{footerSection.links.help}</a>
          </li>
        </ul>
        <span className="Rights">
        {footerSection.copyright}
        </span>
      </div>
    </footer>
  );
};

export default Footer;
