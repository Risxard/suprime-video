import { tmdbService } from "../services/tmdb/tmdbServices";

import GrandPosterCarousel from "../components/Sliders/GrandPosterCarousel/GrandPosterCarousel";
import SimpleBackdropCarousel from "../components/Sliders/SimpleBackdropCarousel";
import HeroSection from "../components/HeroSection";

import PosterCarouselSkeleton from "../components/Sliders/GrandPosterCarousel/components/PosterCarouselSkeleton";
import SimpleBackdropSkeleton from "../components/Sliders/SimpleBackdropCarousel/components/SimpleBackdropSkeleton";
import HeroSectionSkeleton from "../components/HeroSection/components/HeroSectionSkeleton";

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


const carouselTypeMap = {
    "grand-poster": {
        component: GrandPosterCarousel,
        skeleton: PosterCarouselSkeleton,
    },
    "simple-backdrop": {
        component: SimpleBackdropCarousel,
        skeleton: SimpleBackdropSkeleton,
    },
    "hero-section": {
        component: HeroSection,
        skeleton: HeroSectionSkeleton,
    },
};

export const channelsConfig = {
    disney: {
        name: "Disney",
        video: disneyVideo,
        desktopImage: introDisneyDesktop,
        mobileImage: introDisneyMobile,
        logo: introDisneyLogo,
        carousels: [
            {
                title: "Destaques",
                type: "simple-backdrop",
                component: SimpleBackdropCarousel,
                skeleton: SimpleBackdropSkeleton,
                fetchFn: tmdbService.fetchList,
                fetchParams: {
                    list_id: 8567891,
                    language: "pt-BR",
                    page: 1,
                },
            },
            {
                title: "Princesas",
                type: "simple-backdrop",
                component: SimpleBackdropCarousel,
                skeleton: SimpleBackdropSkeleton,
                fetchFn: tmdbService.fetchList,
                fetchParams: {
                    list_id: 8567844,
                    language: "pt-BR",
                    page: 1,
                },
            },
            {
                title: "Feras e Monstros",
                type: "grand-poster",
                component: GrandPosterCarousel,
                skeleton: PosterCarouselSkeleton,
                card_size: "sm-card",
                fetchFn: tmdbService.fetchList,
                fetchParams: {
                    list_id: 8567702,
                    language: "pt-BR",
                    page: 1,
                },
            },
            {
                title: "Séries da disney",
                type: "simple-backdrop",
                component: SimpleBackdropCarousel,
                skeleton: SimpleBackdropSkeleton,
                fetchFn: tmdbService.fetchList,
                fetchParams: {
                    list_id: 8567896,
                    language: "pt-BR",
                    page: 1,
                },
            },
            {
                title: "Filmes em Live-Action",
                type: "grand-poster",
                component: GrandPosterCarousel,
                skeleton: PosterCarouselSkeleton,
                card_size: "ss-card",
                fetchFn: tmdbService.fetchList,
                fetchParams: {
                    list_id: 8567846,
                    language: "pt-BR",
                    page: 1,
                },
            },
            {
                title: "Clássicos",
                type: "simple-backdrop",
                component: SimpleBackdropCarousel,
                skeleton: SimpleBackdropSkeleton,
                fetchFn: tmdbService.fetchList,
                fetchParams: {
                    list_id: 338,
                    language: "pt-BR",
                    page: 1,
                },
            },
            {
                title: "Era uma Vez...",
                type: "grand-poster",
                component: GrandPosterCarousel,
                skeleton: PosterCarouselSkeleton,
                card_size: "ss-card",
                fetchFn: tmdbService.fetchList,
                fetchParams: {
                    list_id: 8567899,
                    language: "pt-BR",
                    page: 1,
                },
            },
            {
                title: "Mickey e Seus Amigos",
                type: "grand-poster",
                component: GrandPosterCarousel,
                skeleton: PosterCarouselSkeleton,
                card_size: "ss-card",
                fetchFn: tmdbService.fetchList,
                fetchParams: {
                    list_id: 8567890,
                    language: "pt-BR",
                    page: 1,
                },
            },
            {
                title: "Animações classicas",
                type: "grand-poster",
                component: GrandPosterCarousel,
                skeleton: PosterCarouselSkeleton,
                card_size: "ss-card",
                fetchFn: tmdbService.fetchList,
                fetchParams: {
                    list_id: 24035,
                    language: "pt-BR",
                    page: 1,
                },
            },
            {
                title: "Lilo e Stitch",
                type: "grand-poster",
                component: GrandPosterCarousel,
                skeleton: PosterCarouselSkeleton,
                card_size: "ss-card",
                fetchFn: tmdbService.fetchList,
                fetchParams: {
                    list_id: 8567704,
                    language: "pt-BR",
                    page: 1,
                },
            },
            {
                title: "Coleção Buddies",
                type: "grand-poster",
                component: GrandPosterCarousel,
                skeleton: PosterCarouselSkeleton,
                card_size: "ss-card",
                fetchFn: tmdbService.fetchCollection,
                fetchParams: {
                    collection_id: 91657,
                    language: "pt-BR",
                    page: 1,
                },
            },
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
                title: "Destaques",
                type: "simple-backdrop",
                component: SimpleBackdropCarousel,
                skeleton: SimpleBackdropSkeleton,
                fetchFn: tmdbService.fetchList,
                fetchParams: {
                    list_id: 8567918,
                    language: "pt-BR",
                    page: 1,
                },
            },
            {
                title: "Filmes",
                type: "simple-backdrop",
                component: SimpleBackdropCarousel,
                skeleton: SimpleBackdropSkeleton,
                fetchFn: tmdbService.fetchList,
                fetchParams: {
                    list_id: 8567910,
                    language: "pt-BR",
                    page: 1,
                },
            },
            {
                type: "hero-section",
                component: HeroSection,
                skeleton: HeroSectionSkeleton,
                fetchFn: tmdbService.fetchMediaDetails,
                fetchParams: {
                    mediaType: "movie",
                    mediaId: 1022787,
                    language: "pt-BR"
                },
            },


            {
                title: "Toy Story",
                type: "grand-poster",
                component: GrandPosterCarousel,
                skeleton: PosterCarouselSkeleton,
                card_size: "ss-card",
                fetchFn: tmdbService.fetchList,
                fetchParams: {
                    list_id: 8568116,
                    language: "pt-BR",
                    page: 1,
                },
            },
            {
                title: "Garfinho Pergunta",
                type: "grand-poster",
                component: GrandPosterCarousel,
                skeleton: PosterCarouselSkeleton,
                card_size: "ss-card",
                fetchFn: tmdbService.fetchList,
                fetchParams: {
                    list_id: 8568113,
                    language: "pt-BR",
                    page: 1,
                },
            },
            {
                title: "Coleção Os incríveis",
                type: "grand-poster",
                component: GrandPosterCarousel,
                skeleton: PosterCarouselSkeleton,
                card_size: "ss-card",
                fetchFn: tmdbService.fetchList,
                fetchParams: {
                    list_id: 8567971,
                    language: "pt-BR",
                    page: 1,
                },
            },
            {
                title: "Coleção Carros",
                type: "grand-poster",
                component: GrandPosterCarousel,
                skeleton: PosterCarouselSkeleton,
                card_size: "ss-card",
                fetchFn: tmdbService.fetchList,
                fetchParams: {
                    list_id: 8567975,
                    language: "pt-BR",
                    page: 1,
                },
            },
            {
                title: "Curtas",
                type: "grand-poster",
                component: GrandPosterCarousel,
                skeleton: PosterCarouselSkeleton,
                card_size: "ss-card",
                fetchFn: tmdbService.fetchList,
                fetchParams: {
                    list_id: 8567969,
                    language: "pt-BR",
                    page: 1,
                },
            },
            {
                title: "Originais",
                type: "grand-poster",
                component: GrandPosterCarousel,
                skeleton: PosterCarouselSkeleton,
                card_size: "ss-card",
                fetchFn: tmdbService.fetchList,
                fetchParams: {
                    list_id: 8568111,
                    language: "pt-BR",
                    page: 1,
                },
            },

            {
                title: "Lembranças",
                type: "grand-poster",
                component: GrandPosterCarousel,
                skeleton: PosterCarouselSkeleton,
                card_size: "ss-card",
                fetchFn: tmdbService.fetchList,
                fetchParams: {
                    list_id: 8568107,
                    language: "pt-BR",
                    page: 1,
                },
            },
            {
                title: "Feras e Monstros",
                type: "grand-poster",
                component: GrandPosterCarousel,
                skeleton: PosterCarouselSkeleton,
                card_size: "ss-card",
                fetchFn: tmdbService.fetchList,
                fetchParams: {
                    list_id: 8568128,
                    language: "pt-BR",
                    page: 1,
                },
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
                title: "Destaques",
                type: "simple-backdrop",
                component: SimpleBackdropCarousel,
                skeleton: SimpleBackdropSkeleton,
                fetchFn: tmdbService.fetchList,
                fetchParams: {
                    list_id: 8568143,
                    language: "pt-BR",
                    page: 1,
                },
            },
            {
                title: "UCM: Saga do Infinito",
                type: "simple-backdrop",
                component: SimpleBackdropCarousel,
                skeleton: SimpleBackdropSkeleton,
                fetchFn: tmdbService.fetchList,
                fetchParams: {
                    list_id: 8568169,
                    language: "pt-BR",
                    page: 1,
                },
            },
            {
                title: "UCM: Saga do Multiverso",
                type: "simple-backdrop",
                component: SimpleBackdropCarousel,
                skeleton: SimpleBackdropSkeleton,
                fetchFn: tmdbService.fetchList,
                fetchParams: {
                    list_id: 8568168,
                    language: "pt-BR",
                    page: 1,
                },
            },
            {
                type: "hero-section",
                component: HeroSection,
                skeleton: HeroSectionSkeleton,
                fetchFn: tmdbService.fetchMediaDetails,
                fetchParams: {
                    mediaType: "tv",
                    mediaId: 138505,
                    language: "pt-BR"
                },
            },
            {
                title: "Aventuras Fantásticas",
                type: "simple-backdrop",
                component: SimpleBackdropCarousel,
                skeleton: SimpleBackdropSkeleton,
                fetchFn: tmdbService.fetchList,
                fetchParams: {
                    list_id: 8568160,
                    language: "pt-BR",
                    page: 1,
                },
            },
            {
                title: "Monstros da Marvel",
                type: "grand-poster",
                component: GrandPosterCarousel,
                skeleton: PosterCarouselSkeleton,
                card_size: "sm-card",
                fetchFn: tmdbService.fetchList,
                fetchParams: {
                    list_id: 8568154,
                    language: "pt-BR",
                    page: 1,
                },
            },
            {
                title: "Os Defensores",
                type: "grand-poster",
                component: GrandPosterCarousel,
                skeleton: PosterCarouselSkeleton,
                card_size: "ss-card",
                fetchFn: tmdbService.fetchList,
                fetchParams: {
                    list_id: 8568155,
                    language: "pt-BR",
                    page: 1,
                },
            },
            {
                title: "Com personagens de Thunderbolts*",
                type: "grand-poster",
                component: GrandPosterCarousel,
                skeleton: PosterCarouselSkeleton,
                card_size: "ss-card",
                fetchFn: tmdbService.fetchList,
                fetchParams: {
                    list_id: 8568157,
                    language: "pt-BR",
                    page: 1,
                },
            },
            {
                title: "Universo Wakanda",
                type: "grand-poster",
                component: GrandPosterCarousel,
                skeleton: PosterCarouselSkeleton,
                card_size: "ss-card",
                fetchFn: tmdbService.fetchList,
                fetchParams: {
                    list_id: 8568159,
                    language: "pt-BR",
                    page: 1,
                },
            },
            {
                title: "Sam Wilson: Capitão América",
                type: "grand-poster",
                component: GrandPosterCarousel,
                skeleton: PosterCarouselSkeleton,
                card_size: "ss-card",
                fetchFn: tmdbService.fetchList,
                fetchParams: {
                    list_id: 8568166,
                    language: "pt-BR",
                    page: 1,
                },
            },
            {
                title: "UCM: Linha do Tempo dos Filmes",
                type: "grand-poster",
                component: GrandPosterCarousel,
                skeleton: PosterCarouselSkeleton,
                card_size: "ss-card",
                fetchFn: tmdbService.fetchList,
                fetchParams: {
                    list_id: 8568171,
                    language: "pt-BR",
                    page: 1,
                },
            },
            {
                title: "Séries e Especiais da Marvel",
                type: "grand-poster",
                component: GrandPosterCarousel,
                skeleton: PosterCarouselSkeleton,
                card_size: "ss-card",
                fetchFn: tmdbService.fetchList,
                fetchParams: {
                    list_id: 8568331,
                    language: "pt-BR",
                    page: 1,
                },
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
                title: "Originais",
                type: "grand-poster",
                component: GrandPosterCarousel,
                skeleton: PosterCarouselSkeleton,
                card_size: "ss-card",
                fetchFn: tmdbService.fetchList,
                fetchParams: {
                    list_id: 8568180,
                    language: "pt-BR",
                    page: 1,
                },
            },
            {
                title: "Filmes",
                type: "grand-poster",
                component: GrandPosterCarousel,
                skeleton: PosterCarouselSkeleton,
                card_size: "ss-card",
                fetchFn: tmdbService.fetchList,
                fetchParams: {
                    list_id: 8568181,
                    language: "pt-BR",
                    page: 1,
                },
            },
            {
                type: "hero-section",
                component: HeroSection,
                skeleton: HeroSectionSkeleton,
                fetchFn: tmdbService.fetchMediaDetails,
                fetchParams: {
                    mediaType: "tv",
                    mediaId: 114479,
                    language: "pt-BR"
                },
            },

            {
                title: "Séries e Especiais",
                type: "grand-poster",
                component: GrandPosterCarousel,
                skeleton: PosterCarouselSkeleton,
                card_size: "ss-card",
                fetchFn: tmdbService.fetchList,
                fetchParams: {
                    list_id: 8568187,
                    language: "pt-BR",
                    page: 1,
                },
            },
            {
                title: "Star Wars em Ordem Cronológica",
                type: "grand-poster",
                component: GrandPosterCarousel,
                skeleton: PosterCarouselSkeleton,
                card_size: "ss-card",
                fetchFn: tmdbService.fetchList,
                fetchParams: {
                    list_id: 8568193,
                    language: "pt-BR",
                    page: 1,
                },
            },
            {
                title: "Animações",
                type: "grand-poster",
                component: GrandPosterCarousel,
                skeleton: PosterCarouselSkeleton,
                card_size: "ss-card",
                fetchFn: tmdbService.fetchList,
                fetchParams: {
                    list_id: 8568190,
                    language: "pt-BR",
                    page: 1,
                },
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
                type: "grand-poster",
                component: GrandPosterCarousel,
                skeleton: PosterCarouselSkeleton,
                card_size: "ss-card",
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
                component: GrandPosterCarousel,
                skeleton: PosterCarouselSkeleton,
                card_size: "ss-card",
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
