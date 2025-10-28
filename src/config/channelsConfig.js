import { tmdbService } from "../services/tmdb/tmdbServices";

import disneyVideo from "../assets/channels/disney/disneyVideo.mp4";
import introDisneyDesktop from "../assets/channels/disney/introDisneyDesktop.webp";
import introDisneyMobile from "../assets/channels/disney/introDisneyMobile.webp";
import introDisneyLogo from "../assets/channels/disney/introDisneyLogo.webp";


import pixarVideo from "../assets/channels/pixar/pixarVideo.mp4";
import introPixarDesktop from "../assets/channels/pixar/introPixarDesktop.webp";
import introPixarMobile from "../assets/channels/pixar/introPixarMobile.webp";
import introPixarLogo from "../assets/channels/pixar/introPixarLogo.webp";


import marvelVideo from "../assets/channels/marvel/marvelVideo.mp4";
import introMarvelDesktop from "../assets/channels/marvel/introMarvelDesktop.webp";
import introMarvelMobile from "../assets/channels/marvel/introMarvelMobile.webp";
import introMarvelLogo from "../assets/channels/marvel/introMarvelLogo.webp";


import starWarsVideo from "../assets/channels/starwars/starWarsVideo.mp4";
import introStarWarsDesktop from "../assets/channels/starwars/introStarWarsDesktop.webp";
import introStarWarsMobile from "../assets/channels/starwars/introStarWarsMobile.webp";
import introStarWarsLogo from "../assets/channels/starwars/introStarWarsLogo.webp";


import nationalVideo from "../assets/channels/national/nationalVideo.mp4";
import introNationalDesktop from "../assets/channels/national/introNationalDesktop.webp";
import introNationalMobile from "../assets/channels/national/introNationalMobile.webp";
import introNationalLogo from "../assets/channels/national/introNationalLogo.webp";

export const channelsConfig = {
    disney: {
        name: "Disney",
        video: disneyVideo,
        desktopImage: introDisneyDesktop,
        mobileImage: introDisneyMobile,
        logo: introDisneyLogo,
        carousels: [
            {
                title: "Feras e Monstros",
                type: "grand-poster",
                fetchFn: tmdbService.fetchList,
                fetchParams: {
                    list_id: 8567702,
                    language: "pt-BR",
                    page: 1,
                },
                smallPoster: true,
            },
            // {
            //     title: "Top 10 Filmes Disney",
            //     type: "grand-poster",
            //     fetchFn: tmdbService.fetchRecommendations,
            //     fetchParams: {
            //         mediaType: "movie",
            //         mediaId: 1035259,
            //         language: "pt-BR",
            //     },
            //     smallPoster: true,
            // },
        ],
    },

    pixar: {
        name: "Pixar",
        video: pixarVideo,
        desktopImage: introPixarDesktop,
        mobileImage: introPixarMobile,
        logo: introPixarLogo,
        carousels: [
            {
                title: "Filmes da Pixar em Destaque",
                type: "simple-backdrop",
                fetchFn: tmdbService.fetchTrending,
                fetchParams: {
                    timeWindow: "day",
                    pageType: "movie",
                    language: "pt-BR",
                },
            },
            {
                title: "Top Animações Pixar",
                type: "grand-poster",
                fetchFn: tmdbService.fetchRecommendations,
                fetchParams: {
                    mediaType: "movie",
                    mediaId: 508947,
                    language: "pt-BR",
                },
                top10mode: true,
            },
        ],
    },

    marvel: {
        name: "Marvel",
        video: marvelVideo,
        desktopImage: introMarvelDesktop,
        mobileImage: introMarvelMobile,
        logo: introMarvelLogo,
        carousels: [
            {
                title: "Heróis em Destaque",
                type: "simple-backdrop",
                fetchFn: tmdbService.fetchTrending,
                fetchParams: {
                    timeWindow: "week",
                    pageType: "movie",
                    language: "pt-BR",
                },
            },
            {
                title: "Filmes do Universo Marvel",
                type: "grand-poster",
                fetchFn: tmdbService.fetchRecommendations,
                fetchParams: {
                    mediaType: "movie",
                    mediaId: 299534,
                    language: "pt-BR",
                },
                top10mode: true,
            },
        ],
    },

    starwars: {
        name: "Star Wars",
        video: starWarsVideo,
        desktopImage: introStarWarsDesktop,
        mobileImage: introStarWarsMobile,
        logo: introStarWarsLogo,
        carousels: [
            {
                title: "A Galáxia em Destaque",
                type: "simple-backdrop",
                fetchFn: tmdbService.fetchTrending,
                fetchParams: {
                    timeWindow: "week",
                    pageType: "movie",
                    language: "pt-BR",
                },
            },
            {
                title: "Saga Star Wars",
                type: "grand-poster",
                fetchFn: tmdbService.fetchRecommendations,
                fetchParams: {
                    mediaType: "movie",
                    mediaId: 181812,
                    language: "pt-BR",
                },
                top10mode: true,
            },
        ],
    },

    national: {
        name: "National Geographic",
        video: nationalVideo,
        desktopImage: introNationalDesktop,
        mobileImage: introNationalMobile,
        logo: introNationalLogo,
        carousels: [
            {
                title: "Explorando o Mundo",
                type: "simple-backdrop",
                fetchFn: tmdbService.fetchTrending,
                fetchParams: {
                    timeWindow: "week",
                    pageType: "tv",
                    language: "pt-BR",
                },
            },
            {
                title: "Documentários em Destaque",
                type: "grand-poster",
                fetchFn: tmdbService.fetchRecommendations,
                fetchParams: {
                    mediaType: "tv",
                    mediaId: 70785,
                    language: "pt-BR",
                },
                top10mode: true,
            },
        ],
    },
};
