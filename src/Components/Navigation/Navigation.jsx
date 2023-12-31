import { NavLink, Link } from "react-router-dom";
import React, { useEffect, useState, useRef } from "react";
import "./Navigation.css";
import Pesquisa from "./Search/SearchComponent";
import UserMenu from "./UserMenu/UserMenu";
import LogoIcon from "../../assets/Logo.svg";

import { Home, ChevronDown, Youtube, Layers3} from "lucide-react";

import SearchComponent from './Search/SearchComponent'


import { connect } from "react-redux";
import { langUpdate } from "../../store/actions/Language/langAction";

var NavMenu = (SectionData) => {
  const language = SectionData.language;
  const logged = localStorage.getItem("statusLog");
  const [selectedOption, setSelectedOption] = useState(language || "en-US");
  const [isSectionOptionsOpen, setIsSectionOptionsOpen] = useState(false);
  const langContainerRef = useRef(null);

  function setLanguage(language) {
    switch (language) {
      case "pt-BR":
        return "PT";
      case "en-US":
        return "EN";
      case "es-ES":
      case "es-MX":
        return "ES";
      case "fr-FR":
        return "FR";
      default:
        return "EN";
    }
  }

  const handleSelectChange = (value) => {
    setSelectedOption(value);
    SectionData.newLangUpdate(value);
  };

  const toggleClass = () => {
    const updatedState = !isSectionOptionsOpen;
    setIsSectionOptionsOpen(updatedState);

    if (langContainerRef.current) {
      langContainerRef.current.classList.toggle("active", updatedState);
    }
  };



  useEffect(() => {
    function ocultar() {
      const navContainer = document.querySelector('.navLogada')
      const nav = document.getElementById("nav");

      // Verifica a largura da tela
      const isSmallScreen = window.innerWidth < 880;

      if (window.scrollY > 0) {
        if (isSmallScreen) {
          // Largura menor que 880, aplicar estilos desejados
          nav.style.marginTop = "0rem";
          navContainer.style.width = "100%";
          nav.style.width = "100%";
          nav.style.borderRadius = "0";
          nav.style.boxShadow = "none";
        } else {
          // Largura maior ou igual a 880, aplicar outros estilos
          nav.style.marginTop = "1rem";
          navContainer.style.width = "100%";
          nav.style.width = "auto";
          nav.style.borderRadius = "8px";
          nav.style.boxShadow = "0 4px 8px 2px rgba(0,5,13,.5)";
          // Outros estilos aqui...
        }
      } else {
        // Lógica para quando o scrollY é 0
        nav.style.marginTop = "0rem";
        nav.style.borderRadius = "0";
        nav.style.boxShadow = "none";
        // Outros estilos aqui...
      }
    }

    document.addEventListener("scroll", ocultar);

    // Adicione ouvintes de eventos para alterações na largura da tela, se necessário
    const handleResize = () => {
      ocultar();
    };

    window.addEventListener("resize", handleResize);

    // Remova os ouvintes de eventos quando o componente for desmontado
    return () => {
      document.removeEventListener("scroll", ocultar);
      window.removeEventListener("resize", handleResize);
    };
  }, []);



  
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        langContainerRef.current &&
        !langContainerRef.current.contains(e.target)
      ) {
        langContainerRef.current.classList.remove("active");
        setIsSectionOptionsOpen(false);
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  function addClass() {
    const hamBtn = document.querySelector(".hamMenu");
    hamBtn.classList.toggle("ativo");
  }

  document.addEventListener("click", function (event) {
    const hamBtn = document.querySelector(".hamMenu");
    const isClickedInsideHamBtn = hamBtn.contains(event.target);
  
    if (!isClickedInsideHamBtn) {
      hamBtn.classList.remove("ativo");
    }
  });



  return (
    <div className="Navigation" id="nav">
      <div className="hamMenu">
        <p onTouchEnd={() => addClass()} className="btnMenu">
          Menu
          <ChevronDown color="white" className="hamMenuChevron"/>

        </p>
        <div className="hamMenu-ul">
          <span className="hamMenu-li">
            <Home />
            <p>Home</p>
          </span>
          <span className="hamMenu-li">
            <Layers3 />
            <p>Categories</p>
            <ChevronDown />
          </span>
          <span className="hamMenu-li">
            <Youtube />
            <p>My Stuff</p>
          </span>
        </div>
      </div>

      <NavLink to="/suprime-video/home" className="NavLogo">
        <h2>suprime video</h2>
      </NavLink>

      <ul className="NavigationLinks">
        <li>
          <div  className="NavLinks">
            <p>Home</p>
            <ChevronDown color="#807E81" />
            <div className="showList">
              <NavLink to="/suprime-video/home">
                <p>All</p>
              </NavLink>

              <NavLink to="/suprime-video/movies">
                <p>Movies</p>
              </NavLink>

              <NavLink to="/suprime-video/tv-series">
                <p>TV shows</p>
              </NavLink>
            </div>
          </div>
        </li>

        <li>
          <div to="/suprime-video/" className="NavLinks">
            <p>Categories</p>
            <ChevronDown color="#807E81" />
          </div>
        </li>

        <li>
          <div className="NavLinks">
            <p>My Stuff</p>
            <ChevronDown color="#807E81" />
            <div className="showList">
              <Link to="/suprime-video/home">
                <p>All</p>
              </Link>

              <Link to="/suprime-video/movies">
                <p>WatchList</p>
              </Link>

              <Link to="/suprime-video/tv-series">
                <p>Watch History</p>
              </Link>
            </div>
          </div>
        </li>
      </ul>

      <span className="nav-user">
        <div id="lang-container" ref={langContainerRef}>
          <span id="MultiLang" onClick={toggleClass}>
            <p>{setLanguage(language)}</p>
          </span>

          <div
            id="select-options"
            className={isSectionOptionsOpen ? "active" : ""}
          >
            <span>
              <input
                type="radio"
                name="opcao"
                value="en-US"
                id="EN"
                onChange={() => handleSelectChange("en-US")}
                checked={selectedOption === "en-US"}
              />
              <label htmlFor="EN">English (United States)</label>
            </span>

            <span>
              <input
                type="radio"
                name="opcao"
                value="pt-BR"
                id="PT"
                onChange={() => handleSelectChange("pt-BR")}
                checked={selectedOption === "pt-BR"}
              />
              <label htmlFor="PT" onClick={toggleClass}>
                Português (Brasil)
              </label>
            </span>
          </div>
        </div>
        
        <SearchComponent/>

        {logged === "true" ? (
          <UserMenu></UserMenu>
        ) : (
          <Link to={`/suprime-video/login`} className="sing-btn">
            <p>Sign In</p>
          </Link>
        )}
      </span>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    language: state.lang.dataLang,
  };
};

function mapActionCreatorsToProp(dispatch) {
  return {
    newLangUpdate(newLang) {
      const action = langUpdate(newLang);
      dispatch(action);
    },
  };
}

export default connect(mapStateToProps, mapActionCreatorsToProp)(NavMenu);
