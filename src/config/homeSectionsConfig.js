import { tmdbService } from "../services/tmdb/tmdbServices";
import HeroCarousel from "../components/Carousels/HeroCarousel/HeroCarousel";
import PosterCarousel from "../components/Carousels/PosterCarousel/PosterCarousel";
import BackdropCarousel from "../components/Carousels/BackdropCarousel";
import ChannelSection from "../components/ChannelSection";
import HeroSection from "../components/HeroSection";
import BackdropInfoCarousel from "../components/Carousels/BackdropInfoCarousel";

import HeroCarouselSkeleton from "../components/Carousels/HeroCarousel/components/HeroCarouselSkeleton";
import PosterCarouselSkeleton from "../components/Carousels/PosterCarousel/components/PosterCarouselSkeleton";
import BackdropSkeleton from "../components/Carousels/BackdropCarousel/components/BackdropSkeleton";
import ChannelSectionSkeleton from "../components/ChannelSection/components/ChannelSectionSkeleton";
import HeroSectionSkeleton from "../components/HeroSection/components/HeroSectionSkeleton";
import BackdropInfoSkeleton from "../components/Carousels/BackdropInfoCarousel/components/BackdropInfoSkeleton";

import i18n from "../i18n";

export const homeSections = [
  {
    id: "hero",
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
        type: "channel-section",
        component: ChannelSection,
        skeleton: ChannelSectionSkeleton,
        fetchFn: null,
      },
      {
        title: i18n.t("sections.home.recommended"),
        type: "poster",
        component: PosterCarousel,
        skeleton: PosterCarouselSkeleton,
        fetchFn: tmdbService.fetchRecommendations,
        fetchParams: {
          mediaType: "movie",
          mediaId: 1035259,
          language: i18n.language,
          page: 1,
        },
      },
      {
        title: i18n.t("sections.home.trending"),
        type: "backdropinfo",
        component: BackdropInfoCarousel,
        skeleton: BackdropInfoSkeleton,
        fetchFn: tmdbService.fetchTrending,
        fetchParams: {
          timeWindow: "week",
          pageType: "movie",
          language: i18n.language,
          page: 1,
        },
      },
      {
        title: i18n.t("sections.home.actionAdventure"),
        type: "backdropinfo",
        component: BackdropInfoCarousel,
        skeleton: BackdropInfoSkeleton,
        fetchFn: tmdbService.fetchPerGenres,
        fetchParams: {
          pageType: "movie",
          language: i18n.language,
          with_genres: 12,
          page: 1,
          sort_by: "popularity.desc",
        },
      },
      {
        title: i18n.t("sections.home.boxOffice"),
        type: "poster",
        component: PosterCarousel,
        skeleton: PosterCarouselSkeleton,
        fetchFn: tmdbService.fetchList,
        fetchParams: {
          list_id: 8568368,
          language: i18n.language,
          page: 1,
        },
      },
    ],
  },

  {
    id: "universos",
    carousels: [
      {
        title: i18n.t("sections.home.emmy"),
        type: "poster",
        component: PosterCarousel,
        skeleton: PosterCarouselSkeleton,
        card_size: "ss-card",
        fetchFn: tmdbService.fetchList,
        fetchParams: {
          list_id: 8568318,
          language: i18n.language,
          page: 1,
        },
      },
      {
        title: i18n.t("sections.home.sciFi"),
        type: "backdropinfo",
        component: BackdropInfoCarousel,
        skeleton: BackdropInfoSkeleton,
        fetchFn: tmdbService.fetchPerGenres,
        fetchParams: {
          pageType: "movie",
          language: i18n.language,
          with_genres: 878,
          page: 1,
          sort_by: "popularity.desc",
        },
      },
      {
        title: i18n.t("sections.home.marvelSeries"),
        type: "poster",
        component: PosterCarousel,
        skeleton: PosterCarouselSkeleton,
        card_size: "ss-card",
        fetchFn: tmdbService.fetchList,
        fetchParams: {
          list_id: 8568331,
          language: i18n.language,
          page: 1,
        },
      },
      {
        type: "hero-section",
        component: HeroSection,
        skeleton: HeroSectionSkeleton,
        fetchFn: tmdbService.fetchMediaDetails,
        fetchParams: { mediaType: "movie", mediaId: 845781, language: i18n.language },
      },

      {
        title: i18n.t("sections.home.animationMovies"),
        type: "backdropinfo",
        component: BackdropInfoCarousel,
        skeleton: BackdropInfoSkeleton,
        fetchFn: tmdbService.fetchPerGenres,
        fetchParams: {
          pageType: "movie",
          language: i18n.language,
          with_genres: 12,
          page: 1,
          sort_by: "popularity.desc",
        },
      },
      {
        title: i18n.t("sections.home.top10"),
        type: "poster",
        top10mode: true,
        component: PosterCarousel,
        skeleton: PosterCarouselSkeleton,
        fetchFn: tmdbService.fetchTrending,
        fetchParams: {
          timeWindow: "day",
          pageType: "all",
          language: i18n.language,
          page: 1,
        },
      },
      {
        title: i18n.t("sections.pixar.toyStory"),
        type: "grand-poster",
        component: PosterCarousel,
        skeleton: PosterCarouselSkeleton,
        card_size: "ss-card",
        fetchFn: tmdbService.fetchList,
        fetchParams: { list_id: 8568116, language: i18n.language, page: 1 },
      },
      {
        title: i18n.t("sections.home.mcuUniverse"),
        type: "poster",
        component: PosterCarousel,
        skeleton: PosterCarouselSkeleton,
        card_size: "ss-card",
        fetchFn: tmdbService.fetchList,
        fetchParams: {
          list_id: 8568367,
          language: i18n.language,
          page: 1,
        },
      },

      {
        title: i18n.t("sections.home.mcuTimeline"),
        type: "poster",
        component: PosterCarousel,
        skeleton: PosterCarouselSkeleton,
        card_size: "ss-card",
        fetchFn: tmdbService.fetchList,
        fetchParams: {
          list_id: 8568171,
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
      {
        title: i18n.t("sections.home.thunderbolts"),
        type: "poster",
        component: PosterCarousel,
        skeleton: PosterCarouselSkeleton,
        card_size: "ss-card",
        fetchFn: tmdbService.fetchList,
        fetchParams: {
          list_id: 8568157,
          language: i18n.language,
          page: 1,
        },
      },
      {
        title: i18n.t("sections.home.disneyChannel"),
        type: "poster",
        component: PosterCarousel,
        skeleton: PosterCarouselSkeleton,
        card_size: "ss-card",
        fetchFn: tmdbService.fetchList,
        fetchParams: {
          list_id: 8567896,
          language: i18n.language,
          page: 1,
        },
      },
      {
        title: i18n.t("sections.home.crime"),
        type: "poster",
        component: PosterCarousel,
        skeleton: PosterCarouselSkeleton,
        card_size: "ss-card",
        fetchFn: tmdbService.fetchList,
        fetchParams: {
          list_id: 8570921,
          language: i18n.language,
          page: 1,
        },
      },
      {
        title: i18n.t("sections.home.seriesForYou"),
        type: "poster",
        component: PosterCarousel,
        skeleton: PosterCarouselSkeleton,
        card_size: "ss-card",
        fetchFn: tmdbService.fetchPerGenres,
        fetchParams: {
          pageType: "tv",
          language: i18n.language,
          with_genres: 28,
          page: 1,
          sort_by: "popularity.desc",
        },
      },
    ],
  },

];
