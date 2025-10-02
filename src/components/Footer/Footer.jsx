import React from "react";
import "./footer.css";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";
import { NavLink } from "react-router-dom";
import logo from "../../assets/acaiwaveLogo.png";

const Footer = () => {
  const language = i18n.language;
  const { t } = useTranslation();
  const footerSection = t("footer", { returnObjects: true });

  return (
    <footer>
      <span className="footer-logo">
        <NavLink to="/home">
          <img src={logo} alt="acaiwaveplus logo" />
        </NavLink>
      </span>

      <div className="footer-container">
        <ul>
          <li>
            <a href="">{footerSection.links.privacyPolicy}</a>
          </li>
          <li>
            <a href="">{footerSection.links.termsOfUse}</a>
          </li>
          <li>
            <a href="">{footerSection.links.brazilPrivacyNotice}</a>
          </li>
          <li>
            <a href="">{footerSection.links.cookiesPolicy}</a>
          </li>
          <li>
            <a href="">{footerSection.links.dataProtectionBrazil}</a>
          </li>
          <li>
            <a href="">{footerSection.links.subscriptionAgreement}</a>
          </li>
          <li>
            <a href="">{footerSection.links.help}</a>
          </li>
          <li>
            <a href="">{footerSection.links.supportedDevices}</a>
          </li>
          <li>
            <a href="">{footerSection.links.aboutAcaiwaveplus}</a>
          </li>
          <li>
            <a href="">{footerSection.links.customAds}</a>
          </li>
          <li>
            <a href="">{footerSection.links.feedback}</a>
          </li>

          <div className="footer-text">
            O AçaiWave+ é um projeto pessoal, desenvolvido unicamente para fins
            de estudo e portfólio. Ele funciona como um catálogo de filmes
            fictício, sem qualquer finalidade comercial. Este projeto não possui
            vínculo com a Disney, Disney+, ou qualquer outro serviço de
            streaming. A interface foi inspirada na experiência de navegação do
            Disney+, servindo apenas como referência de design e usabilidade.
            Nenhum filme ou conteúdo exibido aqui é transmitido, distribuído ou
            comercializado. Todo o material apresentado tem caráter ilustrativo
            e acadêmico.
          </div>
        </ul>

        <span className="Rights">{footerSection.copyright}</span>
      </div>
    </footer>
  );
};

export default Footer;
