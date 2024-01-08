import React, { useState, useEffect } from "react";
import { guestApiKey } from "../../Services/guestApi.js";
import { useParams } from "react-router-dom";

import "./Login.css";
import SingIn from "../../Components/Register/SingIn.jsx";
import Background from "./Background.jpg";

function LoginPage(SectionData) {
  const logged = localStorage.getItem("statusLog");
  const mediaType = SectionData.mediaType;
  const APIKey = guestApiKey;

  const image_path = "https://image.tmdb.org/t/p/original/";
  const [image, setImage] = useState([]);
  const { id } = useParams();



  console.log(mediaType)
  

  
  useEffect(() => {
    if(id !== undefined && id !== null && mediaType !== undefined && mediaType !== null){
      fetch(`
      https://api.themoviedb.org/3/${mediaType}/${id}?language=en-US&api_key=${APIKey}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          const movieImg = data;
          console.log(movieImg);
          setImage(movieImg);
        });
    }
  }, [id, APIKey]);


  const selectedBackground = image != '' ? `${image_path}${image.backdrop_path}` : Background;

  return (
    <div className="LoginPage">
      <img src={selectedBackground} alt={mediaType == 'tv'? image.name : image.title} />

      <span className="LoginPageContent">
        <h1>
          You need to
          <br />
          subscribe to enjoy
        </h1>
        <SingIn></SingIn>
      </span>
    </div>
  );
}

export default LoginPage;
