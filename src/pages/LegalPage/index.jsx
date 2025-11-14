import { useEffect, useState, useRef } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import logo from "../../assets/acaiwaveLogo.png";
import { ChevronDown } from "lucide-react";
import Footer from "../../components/Footer/Footer";
import "./styles.css";

const LegalPage = () => {
  const { t } = useTranslation();
  const [selected, setSelected] = useState(1);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { id } = useParams();
  const navigate = useNavigate();

  const pages = {
    "política-de-privacidade": 1,
    "termos-de-uso-do-acaiwaveplus": 2,
    "política-de-cookies": 3,
  };

  const titles = {
    1: t("legalPage.dropdown.privacy"),
    2: t("legalPage.dropdown.terms"),
    3: t("legalPage.dropdown.cookies"),
  };

  useEffect(() => {
    if (pages[id]) {
      setSelected(pages[id]);
    } else {
      navigate("/legal/política-de-privacidade", { replace: true });
      setSelected(1);
    }
  }, [id]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (n) => {
    setSelected(n);
    const path = Object.keys(pages).find((key) => pages[key] === n);
    navigate(`/legal/${path}`);
    setDropdownOpen(false);
  };

  const renderPrivacy = () => (
    <>
      <div className="legal-title">{t("legalPage.privacy.title")}</div>

      <p>{t("legalPage.privacy.p1")}</p>

      <h3>{t("legalPage.privacy.section1-title")}</h3>
      <p>{t("legalPage.privacy.section1-text")}</p>
      <ul>
        <li>{t("legalPage.privacy.section1-list.item1")}</li>
        <li>{t("legalPage.privacy.section1-list.item2")}</li>
        <li>{t("legalPage.privacy.section1-list.item3")}</li>
      </ul>

      <h3>{t("legalPage.privacy.section2-title")}</h3>
      <p>{t("legalPage.privacy.section2-text")}</p>

      <h3>{t("legalPage.privacy.section3-title")}</h3>
      <p>{t("legalPage.privacy.section3-text")}</p>

      <h3>{t("legalPage.privacy.section4-title")}</h3>
      <p>{t("legalPage.privacy.section4-text")}</p>

      <h3>{t("legalPage.privacy.section5-title")}</h3>
      <p>{t("legalPage.privacy.section5-text")}</p>

      <h3>{t("legalPage.privacy.section6-title")}</h3>
      <p>{t("legalPage.privacy.section6-text")}</p>
    </>
  );

  const renderTerms = () => (
    <>
      <div className="legal-title">{t("legalPage.terms.title")}</div>

      <p>{t("legalPage.terms.p1")}</p>

      <h3>{t("legalPage.terms.section1-title")}</h3>
      <p>{t("legalPage.terms.section1-text")}</p>

      <h3>{t("legalPage.terms.section2-title")}</h3>
      <p>{t("legalPage.terms.section2-text")}</p>

      <h3>{t("legalPage.terms.section3-title")}</h3>
      <p>{t("legalPage.terms.section3-text")}</p>

      <h3>{t("legalPage.terms.section4-title")}</h3>
      <p>{t("legalPage.terms.section4-text")}</p>

      <h3>{t("legalPage.terms.section5-title")}</h3>
      <ul>
        <li>{t("legalPage.terms.section5-list.item1")}</li>
        <li>{t("legalPage.terms.section5-list.item2")}</li>
        <li>{t("legalPage.terms.section5-list.item3")}</li>
      </ul>

      <h3>{t("legalPage.terms.section6-title")}</h3>
      <p>{t("legalPage.terms.section6-text")}</p>
    </>
  );

  const renderCookies = () => (
    <>
      <div className="legal-title">{t("legalPage.cookies.title")}</div>

      <p>{t("legalPage.cookies.p1")}</p>

      <h3>{t("legalPage.cookies.section1-title")}</h3>
      <p>{t("legalPage.cookies.section1-text")}</p>

      <h3>{t("legalPage.cookies.section2-title")}</h3>
      <ul>
        <li>{t("legalPage.cookies.section2-list.item1")}</li>
        <li>{t("legalPage.cookies.section2-list.item2")}</li>
        <li>{t("legalPage.cookies.section2-list.item3")}</li>
        <li>{t("legalPage.cookies.section2-list.item4")}</li>
      </ul>

      <h3>{t("legalPage.cookies.section3-title")}</h3>
      <p>{t("legalPage.cookies.section3-text")}</p>

      <h3>{t("legalPage.cookies.section4-title")}</h3>
      <ul>
        <li>{t("legalPage.cookies.section4-list.item1")}</li>
        <li>{t("legalPage.cookies.section4-list.item2")}</li>
        <li>{t("legalPage.cookies.section4-list.item3")}</li>
      </ul>

      <h3>{t("legalPage.cookies.section5-title")}</h3>
      <p>{t("legalPage.cookies.section5-text")}</p>

      <ul>
        <li>
          <a
            href="https://support.google.com/chrome/answer/95647"
            target="_blank"
            rel="noreferrer"
          >
            {t("legalPage.cookies.section5-links.chrome")}
          </a>
        </li>
        <li>
          <a
            href="https://support.mozilla.org/pt-BR/kb/ativando-e-desativando-cookies"
            target="_blank"
            rel="noreferrer"
          >
            {t("legalPage.cookies.section5-links.firefox")}
          </a>
        </li>
        <li>
          <a
            href="https://support.microsoft.com/pt-br/microsoft-edge"
            target="_blank"
            rel="noreferrer"
          >
            {t("legalPage.cookies.section5-links.edge")}
          </a>
        </li>
        <li>
          <a
            href="https://support.apple.com/pt-br/guide/safari/sfri11471/mac"
            target="_blank"
            rel="noreferrer"
          >
            {t("legalPage.cookies.section5-links.safari")}
          </a>
        </li>
      </ul>
    </>
  );

  const renderContent = () => {
    if (selected === 1) return renderPrivacy();
    if (selected === 2) return renderTerms();
    if (selected === 3) return renderCookies();
    return null;
  };

  return (
    <div className="legal-page">
      <div className="legal-page-container">
        <NavLink to="/" className="NavLogo">
          <img src={logo} alt="acaiwaveplus logo" />
        </NavLink>

        <div className="legal-content-container">
          <h1>{t("legalPage.title")}</h1>

          <nav ref={dropdownRef}>
            <div
              className={`legal-nav-dropdown ${dropdownOpen ? "open" : ""}`}
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <div className="selected-legal-dropdown-container">
                <span>{titles[selected]}</span>
                <ChevronDown />
              </div>

              <div
                className={`legal-dropdown-list ${dropdownOpen ? "show" : ""}`}
              >
                <span
                  onClick={() => handleSelect(1)}
                  className={selected === 1 ? "selected" : ""}
                >
                  {t("legalPage.dropdown.privacy")}
                </span>

                <span
                  onClick={() => handleSelect(2)}
                  className={selected === 2 ? "selected" : ""}
                >
                  {t("legalPage.dropdown.terms")}
                </span>

                <span
                  onClick={() => handleSelect(3)}
                  className={selected === 3 ? "selected" : ""}
                >
                  {t("legalPage.dropdown.cookies")}
                </span>
              </div>
            </div>

            <span
              onClick={() => handleSelect(1)}
              className={selected === 1 ? "active" : ""}
            >
              {t("legalPage.dropdown.privacy")}
            </span>

            <span
              onClick={() => handleSelect(2)}
              className={selected === 2 ? "active" : ""}
            >
              {t("legalPage.dropdown.terms")}
            </span>

            <span
              onClick={() => handleSelect(3)}
              className={selected === 3 ? "active" : ""}
            >
              {t("legalPage.dropdown.cookies")}
            </span>
          </nav>

          <div className="legal-print-content">
            <button onClick={() => window.print()}>
              {t("legalPage.print")}
            </button>
          </div>

          <div className="legal-content">{renderContent()}</div>
        </div>
      </div>

      <div className="app-background" />
      <Footer />
    </div>
  );
};

export default LegalPage;
