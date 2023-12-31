import React, { useState, useEffect } from "react";
import { guestApiKey } from "../../services/guestApi";

const useMediaClassification = ({ id, language, mediaType }) => {
  const [mediaClass, setMediaClass] = useState("");
  const APIKey = guestApiKey;

  useEffect(() => {
    const movieUrl = `https://api.themoviedb.org/3/movie/${id}/release_dates?api_key=${APIKey}`;
    const tvUrl = `https://api.themoviedb.org/3/tv/${id}/content_ratings?api_key=${APIKey}`;
    const lang = localStorage.getItem("country");

    if (language) {
      fetch(mediaType === 'tv' ? tvUrl : movieUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {

          const dados = data.results;

          let langTarget = language == "pt-BR" ? "BR" : "US";

          const objetoEncontrado = dados.find(
            (objeto) => objeto.iso_3166_1 === langTarget
          );

          if (objetoEncontrado !== undefined && mediaType === "movie") {
            const releaseDates = objetoEncontrado.release_dates;

            if (releaseDates && releaseDates.length > 0) {
              const ultimoObjeto = releaseDates
                .slice()
                .reverse()
                .find((obj) => obj.certification.trim() !== "");

              if (ultimoObjeto) {
                const certification = ultimoObjeto.certification;
                setMediaClass(certification);
              } else {
                
              }
            } else {
              
            }
          }
          if (objetoEncontrado !== undefined && mediaType === "tv") {
            const certification = objetoEncontrado.rating;
            setMediaClass(certification)
          } else {
            
          }
        })
        .catch((error) => {
          console.error("Fetch error:", error);
        });
    }
  }, [id, language]);

  return mediaClass;
};

export default useMediaClassification;
