import { tmdbService } from "../services/tmdb/tmdbServices";
import HeroCarousel from "../components/Carousels/HeroCarousel/HeroCarousel";
import BackdropInfoCarousel from "../components/Carousels/BackdropInfoCarousel";

import PosterCarousel from "../components/Carousels/PosterCarousel/PosterCarousel";
import BackdropCarousel from "../components/Carousels/BackdropCarousel";
import ChannelSection from "../components/ChannelSection";
import HeroSection from "../components/HeroSection";

import HeroCarouselSkeleton from "../components/Carousels/HeroCarousel/components/HeroCarouselSkeleton";
import PosterCarouselSkeleton from "../components/Carousels/PosterCarousel/components/PosterCarouselSkeleton";
import BackdropSkeleton from "../components/Carousels/BackdropCarousel/components/BackdropSkeleton";
import ChannelSectionSkeleton from "../components/ChannelSection/components/ChannelSectionSkeleton";
import HeroSectionSkeleton from "../components/HeroSection/components/HeroSectionSkeleton";
import BackdropInfoSkeleton from "../components/Carousels/BackdropInfoCarousel/components/BackdropInfoSkeleton";

import i18n from "../i18n";



export const testPage = [
    {
        id: "test",
        carousels: [
            {
                title: null,
                type: "hero-carousel",
                component: HeroCarousel,
                skeleton: HeroCarouselSkeleton,
                fetchFn: tmdbService.fetchTrending,
                fetchParams: {
                    timeWindow: "day",
                    pageType: "movie",
                    language: i18n.language,
                    page: 1,
                },
            },

            {
                title: null,
                type: "backdropinfo",
                component: BackdropInfoCarousel,
                skeleton: BackdropInfoSkeleton,
                fetchFn: tmdbService.fetchTrending,
                fetchParams: {
                    timeWindow: "day",
                    pageType: "movie",
                    language: i18n.language,
                    page: 1,
                },
            },
            {
                title: i18n.t("sections.home.disneyChannel"),
                type: "poster",
                component: PosterCarousel,
                skeleton: PosterCarouselSkeleton,
                fetchFn: tmdbService.fetchList,
                fetchParams: {
                    list_id: 8567896,
                    language: i18n.language,
                    page: 1,
                },
            },
            {
                type: "hero-section",
                component: HeroSection,
                skeleton: HeroSectionSkeleton,
                fetchFn: tmdbService.fetchMediaDetails,
                fetchParams: { mediaType: "movie", mediaId: 617126, language: i18n.language },
            },
            // {
            //     title: i18n.t("sections.home.disneyChannel"),
            //     type: "poster",
            //     component: PosterCarousel,
            //     skeleton: PosterCarouselSkeleton,
            //     card_size: "sm-card",
            //     fetchFn: tmdbService.fetchList,
            //     fetchParams: {
            //         list_id: 8567896,
            //         language: i18n.language,
            //         page: 1,
            //     },
            // },

            // {
            //     title: i18n.t("sections.home.disneyChannel"),
            //     type: "poster",
            //     component: PosterCarousel,
            //     skeleton: PosterCarouselSkeleton,
            //     card_size: "ss-card",
            //     fetchFn: tmdbService.fetchList,
            //     fetchParams: {
            //         list_id: 8567896,
            //         language: i18n.language,
            //         page: 1,
            //     },
            // },
        ]
    }
];
