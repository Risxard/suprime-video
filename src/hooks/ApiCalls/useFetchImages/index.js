import axios from 'axios';
import { guestApiKey } from '../../../Services/guestApi';

const API_KEY = guestApiKey;

const movieFetchImage = async (movieId, mediaType, language) => {
    const response = await axios.get(`https://api.themoviedb.org/3/${mediaType}/${movieId}/images?include_image_language=en%2Cpt%2C${language}`, {
        params: {
            api_key: API_KEY
        }
    });
    return response.data;
}

const getLogoImages = async (movieId, mediaType, language) => {
    const dicLanguage = language === 'en-us' ? 'en' : 'pt';
    const alternativeLanguage = dicLanguage === 'en' ? 'pt' : 'en';

    const imagesData = await movieFetchImage(movieId, mediaType, language);
    const logos = imagesData.logos || [];

    const filteredMainLanguageLogos = logos.filter(logo => logo.iso_639_1 === dicLanguage);
    const filteredAlternativeLanguageLogos = logos.filter(logo => logo.iso_639_1 === alternativeLanguage);
    const selectedLogos = filteredMainLanguageLogos.length > 0 ? filteredMainLanguageLogos : filteredAlternativeLanguageLogos;
    
    return selectedLogos.length > 0 ? selectedLogos[0] : null;
}

export default getLogoImages;
