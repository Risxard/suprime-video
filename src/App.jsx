import React, { useEffect} from "react";
import { Outlet } from 'react-router-dom';
import Navigation from './Components/Navigation/Navigation.jsx';
import Footer from './Components/Footer/Footer.jsx'

import toTOPbtn from './assets/svgs/buttons/toTOP.svg'

import { useParams } from "react-router-dom";

import { connect } from "react-redux";

import { langUpdate } from './store/actions/Language/langAction.js'
import MenuSlider from './Components/Header/MenuSlider/MenuSlider.jsx'


function App(SectionData) {
const {id} = useParams();

  const language = SectionData.language;

  const logged = localStorage.getItem("statusLog");

  return (
    <div className="App" language={language}>
      {!id ?
        <nav className="navLogada">
          <Navigation language={language}/>
          <MenuSlider></MenuSlider>
        </nav>
      :
        <nav className="navNormal">
        <Navigation language={language}/>
        </nav>
      }
        <Outlet language={language}/>
        <Footer language={language}></Footer>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    language: state.lang.dataLang,
  };
};


function mapActionCreatorsToProp(dispatch){
  return {
    newLangUpdate(newLang){
      const action = langUpdate(newLang)
      dispatch(action)
    }
  }
}



export default connect(mapStateToProps,  mapActionCreatorsToProp)(App);
