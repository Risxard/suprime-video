import React from "react";
import "./footer.css";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import logo from "../../assets/acaiwaveLogo.png";

const Footer = () => {
  const { t } = useTranslation();
  const footerSection = t("footer", { returnObjects: true });

  return (
    <footer>
      <span className="footer-logo">
        <NavLink to="/home">
          <img src={logo} alt="Açaíwave+ logo" />
        </NavLink>
      </span>

      <div className="footer-container">
        <ul>
          <li><a href="#">{footerSection.links.privacyPolicy}</a></li>
          <li><a href="#">{footerSection.links.termsOfUse}</a></li>
          <li><a href="#">{footerSection.links.brazilPrivacyNotice}</a></li>
          <li><a href="#">{footerSection.links.cookiesPolicy}</a></li>
          <li><a href="#">{footerSection.links.dataProtectionBrazil}</a></li>
          <li><a href="#">{footerSection.links.subscriptionAgreement}</a></li>
          <li><a href="#">{footerSection.links.help}</a></li>
          <li><a href="#">{footerSection.links.supportedDevices}</a></li>
          <li><a href="#">{footerSection.links.aboutAcaiwaveplus}</a></li>
          <li><a href="#">{footerSection.links.customAds}</a></li>
          <li><a href="#">{footerSection.links.feedback}</a></li>

          <div className="footer-text">
            {footerSection.projectDescription}
          </div>
        </ul>

        <span className="Rights">{footerSection.copyright}</span>
      </div>
    </footer>
  );
};

export default Footer;
