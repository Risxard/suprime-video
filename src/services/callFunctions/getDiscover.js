import { guestApiKey } from "../guestApi";

export const getDiscover = (SectionData) => {
    const APIKey = guestApiKey;

    const { language, mediaType, genresArray, sortBy } = SectionData;



    const rawApiKey = `&api_key=${APIKey}`;
    const rawLanguage = `&language=${language}`;


    const api_path = "https://api.themoviedb.org/";


    const apiUrl = `
  ${api_path}3/discover/${mediaType}?include_adult=false&include_video=false
  ${rawLanguage}&page=1&sort_by=${sortBy}${rawApiKey}&with_genres=${genresArray}`;

    if (language) {
        return new Promise((resolve, reject) => {
            fetch(apiUrl)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                })
                .then((data) => {
                    const mediaArray = data.results;
                    resolve(mediaArray);
                })
                .catch((error) => {
                    reject("Fetch error:", error);
                });
        })
    }
};

