import React from "react";
import "./footer.css";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import logo from "../../assets/acaiwaveLogo.png";

const Footer = () => {
  const { t } = useTranslation();
  const footerSection = t("footer", { returnObjects: true });

  const legalRoutes = {
    privacyPolicy: "/legal/política-de-privacidade",
    termsOfUse: "/legal/termos-de-uso-do-acaiwaveplus",
    cookiesPolicy: "/legal/política-de-cookies",
  };

  const fallback = legalRoutes.privacyPolicy;

  return (
    <footer>
      <span className="footer-logo">
        <NavLink to="/home">
          <img src={logo} alt="Açaíwave+ logo" />
        </NavLink>
      </span>

      <div className="footer-container">
        <ul>
          <li>
            <NavLink to={legalRoutes.privacyPolicy}>
              {footerSection.links.privacyPolicy}
            </NavLink>
          </li>

          <li>
            <NavLink to={legalRoutes.termsOfUse}>
              {footerSection.links.termsOfUse}
            </NavLink>
          </li>

          <li>
            <NavLink to={fallback}>
              {footerSection.links.brazilPrivacyNotice}
            </NavLink>
          </li>

          <li>
            <NavLink to={legalRoutes.cookiesPolicy}>
              {footerSection.links.cookiesPolicy}
            </NavLink>
          </li>

          <li>
            <NavLink to={fallback}>
              {footerSection.links.dataProtectionBrazil}
            </NavLink>
          </li>

          <li>
            <NavLink to={fallback}>
              {footerSection.links.subscriptionAgreement}
            </NavLink>
          </li>

          <li>
            <NavLink to="/help">
              {footerSection.links.help}
            </NavLink>
          </li>

          <li>
            <NavLink to={fallback}>
              {footerSection.links.supportedDevices}
            </NavLink>
          </li>

          <li>
            <NavLink to="/about">
              {footerSection.links.aboutAcaiwaveplus}
            </NavLink>
          </li>

          <li>
            <NavLink to={fallback}>
              {footerSection.links.customAds}
            </NavLink>
          </li>

          <li>
            <NavLink to="/feedback">
              {footerSection.links.feedback}
            </NavLink>
          </li>

          <div className="footer-text">{footerSection.projectDescription}</div>
        </ul>

        <span className="Rights">{footerSection.copyright}</span>
      </div>
    </footer>
  );
};

export default Footer;
