import React from "react";
import "./BackgroundComponent.css";

import Intro from "../Intro/Intro"
import BackgroundImage from './BG.png'
import Background from './BGground.png'

var headerbg = (props) => {

    var callback = props.receberDados



    return (
        <div className="BackgroundComponent-Container">
            <Intro quandoClicar={callback}></Intro>
            <div className="Img-container">
                <span className="Bg-filter"></span>
                <img src={BackgroundImage} alt="" />

            </div>
            <img src={Background} className="BGground" alt=""></img>
        </div>
    )
}

export default headerbg
