import { guestApiKey } from "../../../../Services/guestApi";

export const fetchMediaClassification = ({ id, language, mediaType }) => {
    const APIKey = guestApiKey;


    const movieUrl = `https://api.themoviedb.org/3/movie/${id}/release_dates?api_key=${APIKey}`;
    const tvUrl = `https://api.themoviedb.org/3/tv/${id}/content_ratings?api_key=${APIKey}`;

    if (language) {

        return new Promise((resolve, reject) => {

            fetch(mediaType === "tv" ? tvUrl : movieUrl)
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
                                resolve(certification);
                            } else {
                            }
                        } else {
                        }
                    }
                    if (objetoEncontrado !== undefined && mediaType === "tv") {
                        const certification = objetoEncontrado.rating;
                        resolve(certification);
                    } else {
                    }
                })
                .catch((error) => {
                    reject("Fetch error:", error);
                });
        })

    }

};

