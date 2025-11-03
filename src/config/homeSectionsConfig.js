import { tmdbService } from "../services/tmdb/tmdbServices";

import HeroCarousel from "../components/Sliders/HeroCarousel/HeroCarousel";
import GrandPosterCarousel from "../components/Sliders/GrandPosterCarousel/GrandPosterCarousel";
import SimpleBackdropCarousel from "../components/Sliders/SimpleBackdropCarousel";
import ChannelSection from "../components/ChannelSection";

import HeroCarouselSkeleton from "../components/Sliders/HeroCarousel/components/HeroCarouselSkeleton";
import PosterCarouselSkeleton from "../components/Sliders/GrandPosterCarousel/components/PosterCarouselSkeleton";
import SimpleBackdropSkeleton from "../components/Sliders/SimpleBackdropCarousel/components/SimpleBackdropSkeleton";
import ChannelSectionSkeleton from "../components/ChannelSection/components/ChannelSectionSkeleton";

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
          language: "pt-BR",
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
    ],
  },

  {
    id: "recomendados",
    carousels: [
      {
        title: "Recomendado para Você",
        type: "grand-poster",
        component: GrandPosterCarousel,
        skeleton: PosterCarouselSkeleton,
        fetchFn: tmdbService.fetchRecommendations,
        fetchParams: {
          mediaType: "movie",
          mediaId: 1035259,
          language: "pt-BR",
          page: 1,
        },
      },
      {
        title: "Em Alta",
        type: "simple-backdrop",
        component: SimpleBackdropCarousel,
        skeleton: SimpleBackdropSkeleton,
        fetchFn: tmdbService.fetchTrending,
        fetchParams: {
          timeWindow: "week",
          pageType: "movie",
          language: "pt-BR",
          page: 1,
        },
      },
      {
        title: "Sucessos de Bilheteria",
        type: "grand-poster",
        component: GrandPosterCarousel,
        skeleton: PosterCarouselSkeleton,
        fetchFn: tmdbService.fetchList,
        fetchParams: {
          list_id: 8568368,
          language: "pt-BR",
          page: 1,
        },
      },
    ],
  },

  {
    id: "top10",
    carousels: [
      {
        title: "Top 10 hoje no Brasil",
        type: "grand-poster",
        top10mode: true,
        component: GrandPosterCarousel,
        skeleton: PosterCarouselSkeleton,
        fetchFn: tmdbService.fetchTrending,
        fetchParams: {
          timeWindow: "day",
          pageType: "all",
          language: "pt-BR",
          page: 1,
        },
      },
      {
        title: "Emmy® 2025: Vencedores e Indicados",
        type: "grand-poster",
        component: GrandPosterCarousel,
        skeleton: PosterCarouselSkeleton,
        card_size: "ss-card",
        fetchFn: tmdbService.fetchList,
        fetchParams: {
          list_id: 8568318,
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

  {
    id: "universos",
    carousels: [
      {
        title: "Universo Cinematográfico Marvel",
        type: "grand-poster",
        component: GrandPosterCarousel,
        skeleton: PosterCarouselSkeleton,
        card_size: "ss-card",
        fetchFn: tmdbService.fetchList,
        fetchParams: {
          list_id: 8568367,
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
    ],
  },

  {
    id: "disney-channel",
    carousels: [
      {
        title: "Séries e Especiais do Disney Channel",
        type: "grand-poster",
        component: GrandPosterCarousel,
        skeleton: PosterCarouselSkeleton,
        card_size: "ss-card",
        fetchFn: tmdbService.fetchList,
        fetchParams: {
          list_id: 8567896,
          language: "pt-BR",
          page: 1,
        },
      },
    ],
  },
];
