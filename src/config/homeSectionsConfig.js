import { tmdbService } from "../services/tmdb/tmdbServices";
import HeroCarousel from "../components/Carousels/HeroCarousel/HeroCarousel";
import PosterCarousel from "../components/Carousels/PosterCarousel/PosterCarousel";
import BackdropCarousel from "../components/Carousels/BackdropCarousel";
import ChannelSection from "../components/ChannelSection";

import HeroCarouselSkeleton from "../components/Carousels/HeroCarousel/components/HeroCarouselSkeleton";
import PosterCarouselSkeleton from "../components/Carousels/PosterCarousel/components/PosterCarouselSkeleton";
import BackdropSkeleton from "../components/Carousels/BackdropCarousel/components/BackdropSkeleton";
import ChannelSectionSkeleton from "../components/ChannelSection/components/ChannelSectionSkeleton";
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
    ],
  },

  {
    id: "recomendados",
    carousels: [
      {
        title: i18n.t("sections.home.trending"),
        type: "simple-backdrop",
        component: BackdropCarousel,
        skeleton: BackdropSkeleton,
        fetchFn: tmdbService.fetchTrending,
        fetchParams: {
          timeWindow: "week",
          pageType: "movie",
          language: i18n.language,
          page: 1,
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
    ],
  },
  {
    id: "universos",
    carousels: [
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
    ],
  },

];
