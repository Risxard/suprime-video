import { guestApiKey } from "../guestApi";

export const getPerGenres = (SectionData) => {
    const { mediaType, movieId, language, selectedGenre, filterMode, filterScope, sortBy } = SectionData;


    const APIKey = guestApiKey;
    const api_path = "https://api.themoviedb.org/";
    const rawApiKey = `&api_key=${APIKey}`;
    const rawLanguage = `language=${language}`;
    const baseWithout = "&without_genres=";
    const timeWindow = SectionData.timeWindow ? SectionData.timeWindow : "day";
    const pageNumber = SectionData.pageNumber ? SectionData.timeWindow : 1;
    /* Modo de Filtro: genre ou trending */
    /* Per genre options: movie or tv; Per Trending options: all, movie, tv, people. */
    /* Time Window options: day or week */

    let filtered;
    let medias;



    if (filterScope === "movie") {
        let array;
        let noGenre;
        switch (selectedGenre) {
            case 28:
                array = [28];
                noGenre = [16, 99];
                filtered = `${array.join("%2C")}${baseWithout + noGenre}`;
                break;
            case 12:
                array = [12, 878];
                filtered = array.join("%2C");
                break;
            case 35:
                array = [35, 12];
                noGenre = [16, 10770, 28, 99];
                filtered = `${array.join("%2C")}${baseWithout}${noGenre.join("%2C")}`;
                break;
            case 80:
                array = [80];
                noGenre = [35, 16, 99];
                filtered = `${array.join("%2C")}${baseWithout}${noGenre.join("%2C")}`;
                break;
            case 18:
                array = [18];
                noGenre = [878, 10770, 99, 10752, 36, 28];
                filtered = `${array.join("%2C")}${baseWithout}${noGenre.join("%2C")}`;
                break;
            case 9648:
                array = [9648, 53];
                noGenre = [16, 27];
                filtered = `${array.join("%2C")}${baseWithout}${noGenre.join("%2C")}`;
                break;
            case 878:
                array = [878, 28];
                filtered = `${array.join("%2C")}`;
                break;
            case 53:
                array = [53];
                noGenre = [16, 27, 28];
                filtered = `${array.join("%2C")}${baseWithout}${noGenre.join("%2C")}`;
                break;
            case 10751:
                array = [10751, 35];
                noGenre = [27, 10752, 80];
                filtered = `${array.join("%2C")}${baseWithout}${noGenre.join("%2C")}`;
                break;
            default:
                filtered = selectedGenre;
        }
    }
    if (filterScope === "tv") {
        let array;
        let noGenre;
        switch (selectedGenre) {
            case 10759:
                array = [10759];
                noGenre = [16];
                filtered = `${array.join("%2C")}${baseWithout + noGenre}`;
                break;
            case 35:
                array = [35];
                noGenre = [16];
                filtered = `${array.join("%2C")}${baseWithout}${noGenre.join("%2C")}`;
                break;
            case 80:
                array = [80];
                noGenre = [16];
                filtered = `${array.join("%2C")}${baseWithout}${noGenre.join("%2C")}`;
                break;
            case 18:
                array = [18];
                noGenre = [16, 35];
                filtered = `${array.join("%2C")}${baseWithout}${noGenre.join("%2C")}`;
                break;
            case 9648:
                array = [9648,];
                noGenre = [35];
                filtered = `${array.join("%2C")}${baseWithout}${noGenre.join("%2C")}`;
                break;
            case 27:
                array = [18, 9648, 10765];
                noGenre = [10762, 10751, 10763, 10767, 16];
                filtered = `${array.join("%2C")}${baseWithout}${noGenre.join("%2C")}`;
                break;
            case 28:
                array = [10759];
                noGenre = [];
                filtered = `${array.join("%2C")}${baseWithout}${noGenre.join("%2C")}`;
                break;
            case 14:
                array = [10765];
                noGenre = [];
                filtered = `${array.join("%2C")}${baseWithout}${noGenre.join("%2C")}`;
                break;
            case 878:
                array = [10765];
                noGenre = [];
                filtered = `${array.join("%2C")}${baseWithout}${noGenre.join("%2C")}`;
                break;
            case 10751:
                array = [10751, 10762];
                noGenre = [10768, 10763, 80];
                filtered = `${array.join("%2C")}${baseWithout}${noGenre.join("%2C")}`;
                break;

            default:
                filtered = selectedGenre;
        }
    }






    const perGenreRaw = `
${api_path}3/discover/${filterScope}?include_adult=false&include_video=false&${rawLanguage}&page=${pageNumber}&sort_by=${sortBy ? sortBy : "popularity.desc"}${rawApiKey}&with_genres=${filtered}`;

    const perTrendingRaw = `
${api_path}3/trending/${filterScope}/${timeWindow}?${rawLanguage}${rawApiKey}`;

    const recomendations = mediaType && movieId ? `${api_path}3/${mediaType}/${movieId}?append_to_response=recommendations%2Csimilar&${rawLanguage}${rawApiKey}` : "";


    const selectedRaw =
        filterMode === "genre"
            ? perGenreRaw
            : filterMode === "trending"
                ? perTrendingRaw
                : filterMode === "recomendations"
                    ? recomendations
                    : "";




    if (language) {
        return new Promise((resolve, reject) => {


            fetch(selectedRaw)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                })
                .then((data) => {
                    if (filterMode === "recomendations") {
                        const recommendations = data.recommendations.results;
                        const similar = data.similar.results;

                        const selectedMediaData =
                            recommendations.length > 0
                                ? recommendations
                                : similar.length > 0
                                    ? similar
                                    : [];

                        const dataFiltered = selectedMediaData.filter(
                            (obj) => obj.backdrop_path !== null && obj.backdrop_path !== ""
                        );

                        medias = dataFiltered;
                        resolve(medias);


                        if (dataFiltered.length <= 0) {
                            const alternativeUrl = mediaType && selectedGenre ? `${api_path}3/discover/${mediaType}?${rawLanguage}&page=1&sort_by=popularity.desc&with_genres=${selectedGenre}${rawApiKey}` : "";

                            fetch(alternativeUrl)
                                .then((response) => {
                                    if (!response.ok) {
                                        throw new Error("Network response was not ok");
                                    }
                                    return response.json();
                                })
                                .then((data) => {

                                    medias = data.results;
                                    resolve(medias);
                                });
                        }
                    } else {
                        const selectedMediaData = data.results;

                        const dataFiltered = selectedMediaData.filter(
                            (obj) => obj.backdrop_path !== null && obj.backdrop_path !== ""
                        );

                        medias = dataFiltered
                        resolve(medias);
                    }
                })
                .catch((error) => {
                    console.error("Fetch error:", error);
                    reject(error);
                });
        })

    }
}