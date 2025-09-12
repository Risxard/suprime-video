import { useState, useEffect } from "react";
import { tmdbService } from "../../../services/tmdb/tmdbServices";


export const getLogoImages = (mediaId, mediaType, language, originalLanguage) => {
    const [logoImage, setLogoImage] = useState(null);

    useEffect(() => {
        if (mediaId && mediaType && language && originalLanguage) {

            
            const fetchLogoImage = async () => {
                try {
                    const data = await tmdbService.fetchMediaLogoImage({
                        mediaId, mediaType, language, originalLanguage
                    });



                    setLogoImage(data);
                } catch (error) {
                    console.error("Error fetching logo image:", error);
                }
            };

            fetchLogoImage();
        }
    }, [mediaId, mediaType, language, originalLanguage]);

    return logoImage;
};

export default getLogoImages;