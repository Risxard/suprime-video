import { tmdbService } from "../services/tmdb/tmdbServices";

import PosterCarousel from "../components/Carousels/PosterCarousel/PosterCarousel";
import BackdropCarousel from "../components/Carousels/BackdropCarousel";
import HeroSection from "../components/HeroSection";

import PosterCarouselSkeleton from "../components/Carousels/PosterCarousel/components/PosterCarouselSkeleton";
import BackdropSkeleton from "../components/Carousels/BackdropCarousel/components/BackdropSkeleton";
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
import i18n from "../i18n";

export const getChannelsConfig = (language, t) => ({
  disney: {
    name: "Disney",
    video: disneyVideo,
    desktopImage: introDisneyDesktop,
    mobileImage: introDisneyMobile,
    logo: introDisneyLogo,
    sections: [
      {
        carousels: [
          {
            title: t("sections.disney.highlights"),
            type: "simple-backdrop",
            component: BackdropCarousel,
            skeleton: BackdropSkeleton,
            fetchFn: tmdbService.fetchList,
            fetchParams: { list_id: 8567891, language: language, page: 1 },
          },
          {
            title: t("sections.disney.princesses"),
            type: "simple-backdrop",
            component: BackdropCarousel,
            skeleton: BackdropSkeleton,
            fetchFn: tmdbService.fetchList,
            fetchParams: { list_id: 8567844, language: language, page: 1 },
          },
          {
            title: t("sections.disney.beastsAndMonsters"),
            type: "grand-poster",
            component: PosterCarousel,
            skeleton: PosterCarouselSkeleton,
            card_size: "sm-card",
            fetchFn: tmdbService.fetchList,
            fetchParams: { list_id: 8567702, language: language, page: 1 },
          },

        ],
      },
      {
        carousels: [
          {
            title: t("sections.disney.series"),
            type: "simple-backdrop",
            component: BackdropCarousel,
            skeleton: BackdropSkeleton,
            fetchFn: tmdbService.fetchList,
            fetchParams: { list_id: 8567896, language: language, page: 1 },
          },
          {
            title: t("sections.disney.liveAction"),
            type: "grand-poster",
            component: PosterCarousel,
            skeleton: PosterCarouselSkeleton,
            card_size: "ss-card",
            fetchFn: tmdbService.fetchList,
            fetchParams: { list_id: 8567846, language: language, page: 1 },
          },
          {
            title: t("sections.disney.classics"),
            type: "simple-backdrop",
            component: BackdropCarousel,
            skeleton: BackdropSkeleton,
            fetchFn: tmdbService.fetchList,
            fetchParams: { list_id: 338, language: language, page: 1 },
          },
        ],
      },
      {
        carousels: [
          {
            title: t("sections.disney.onceUpon"),
            type: "grand-poster",
            component: PosterCarousel,
            skeleton: PosterCarouselSkeleton,
            card_size: "ss-card",
            fetchFn: tmdbService.fetchList,
            fetchParams: { list_id: 8567899, language: language, page: 1 },
          },
          {
            title: t("sections.disney.mickeyFriends"),
            type: "grand-poster",
            component: PosterCarousel,
            skeleton: PosterCarouselSkeleton,
            card_size: "ss-card",
            fetchFn: tmdbService.fetchList,
            fetchParams: { list_id: 8567890, language: language, page: 1 },
          },
          {
            title: t("sections.disney.classicAnimations"),
            type: "grand-poster",
            component: PosterCarousel,
            skeleton: PosterCarouselSkeleton,
            card_size: "ss-card",
            fetchFn: tmdbService.fetchList,
            fetchParams: { list_id: 24035, language: language, page: 1 },
          },
        ],
      },
      {
        carousels: [
          {
            title: t("sections.disney.liloAndStitch"),
            type: "grand-poster",
            component: PosterCarousel,
            skeleton: PosterCarouselSkeleton,
            card_size: "ss-card",
            fetchFn: tmdbService.fetchList,
            fetchParams: { list_id: 8567704, language: language, page: 1 },
          },
          {
            title: t("sections.disney.buddies"),
            type: "grand-poster",
            component: PosterCarousel,
            skeleton: PosterCarouselSkeleton,
            card_size: "ss-card",
            fetchFn: tmdbService.fetchCollection,
            fetchParams: { collection_id: 91657, language: language, page: 1 },
          },
        ],
      },
    ],
  },

  pixar: {
    name: "Pixar",
    video: pixarVideo,
    desktopImage: introPixarDesktop,
    mobileImage: introPixarMobile,
    logo: introPixarLogo,
    sections: [
      {
        carousels: [
          {
            title: t("sections.pixar.highlights"),
            type: "simple-backdrop",
            component: BackdropCarousel,
            skeleton: BackdropSkeleton,
            fetchFn: tmdbService.fetchList,
            fetchParams: { list_id: 8567918, language: language, page: 1 },
          },
          {
            title: t("sections.pixar.films"),
            type: "simple-backdrop",
            component: BackdropCarousel,
            skeleton: BackdropSkeleton,
            fetchFn: tmdbService.fetchList,
            fetchParams: { list_id: 8567910, language: language, page: 1 },
          },
          {
            type: "hero-section",
            component: HeroSection,
            skeleton: HeroSectionSkeleton,
            fetchFn: tmdbService.fetchMediaDetails,
            fetchParams: { mediaType: "movie", mediaId: 1022787, language: language },
          },
        ],
      },
      {
        carousels: [
          {
            title: t("sections.pixar.toyStory"),
            type: "grand-poster",
            component: PosterCarousel,
            skeleton: PosterCarouselSkeleton,
            card_size: "ss-card",
            fetchFn: tmdbService.fetchList,
            fetchParams: { list_id: 8568116, language: language, page: 1 },
          },
          {
            title: t("sections.pixar.forkyAsks"),
            type: "grand-poster",
            component: PosterCarousel,
            skeleton: PosterCarouselSkeleton,
            card_size: "ss-card",
            fetchFn: tmdbService.fetchList,
            fetchParams: { list_id: 8568113, language: language, page: 1 },
          },
          {
            title: t("sections.pixar.incredibles"),
            type: "grand-poster",
            component: PosterCarousel,
            skeleton: PosterCarouselSkeleton,
            card_size: "ss-card",
            fetchFn: tmdbService.fetchList,
            fetchParams: { list_id: 8567971, language: language, page: 1 },
          },
        ],
      },
      {
        carousels: [
          {
            title: t("sections.pixar.cars"),
            type: "grand-poster",
            component: PosterCarousel,
            skeleton: PosterCarouselSkeleton,
            card_size: "ss-card",
            fetchFn: tmdbService.fetchList,
            fetchParams: { list_id: 8567975, language: language, page: 1 },
          },
          {
            title: t("sections.pixar.shorts"),
            type: "grand-poster",
            component: PosterCarousel,
            skeleton: PosterCarouselSkeleton,
            card_size: "ss-card",
            fetchFn: tmdbService.fetchList,
            fetchParams: { list_id: 8567969, language: language, page: 1 },
          },
          {
            title: t("sections.pixar.originals"),
            type: "grand-poster",
            component: PosterCarousel,
            skeleton: PosterCarouselSkeleton,
            card_size: "ss-card",
            fetchFn: tmdbService.fetchList,
            fetchParams: { list_id: 8568111, language: language, page: 1 },
          },
        ],
      },
      {
        carousels: [
          {
            title: t("sections.pixar.memories"),
            type: "grand-poster",
            component: PosterCarousel,
            skeleton: PosterCarouselSkeleton,
            card_size: "ss-card",
            fetchFn: tmdbService.fetchList,
            fetchParams: { list_id: 8568107, language: language, page: 1 },
          },
          {
            title: t("sections.pixar.monsters"),
            type: "grand-poster",
            component: PosterCarousel,
            skeleton: PosterCarouselSkeleton,
            card_size: "ss-card",
            fetchFn: tmdbService.fetchList,
            fetchParams: { list_id: 8568128, language: language, page: 1 },
          },
        ],
      },
    ],
  },

  marvel: {
    name: "Marvel",
    video: marvelVideo,
    desktopImage: introMarvelDesktop,
    mobileImage: introMarvelMobile,
    logo: introMarvelLogo,
    sections: [
      {
        carousels: [
          {
            title: t("sections.marvel.highlights"),
            type: "simple-backdrop",
            component: BackdropCarousel,
            skeleton: BackdropSkeleton,
            fetchFn: tmdbService.fetchList,
            fetchParams: { list_id: 8568143, language: language, page: 1 },
          },
          {
            title: t("sections.marvel.infinitySaga"),
            type: "simple-backdrop",
            component: BackdropCarousel,
            skeleton: BackdropSkeleton,
            fetchFn: tmdbService.fetchList,
            fetchParams: { list_id: 8568169, language: language, page: 1 },
          },
          {
            title: t("sections.marvel.multiverseSaga"),
            type: "simple-backdrop",
            component: BackdropCarousel,
            skeleton: BackdropSkeleton,
            fetchFn: tmdbService.fetchList,
            fetchParams: { list_id: 8568168, language: language, page: 1 },
          },
        ],
      },
      {
        carousels: [
          {
            type: "hero-section",
            component: HeroSection,
            skeleton: HeroSectionSkeleton,
            fetchFn: tmdbService.fetchMediaDetails,
            fetchParams: { mediaType: "tv", mediaId: 138505, language: language },
          },
          {
            title: t("sections.marvel.adventures"),
            type: "simple-backdrop",
            component: BackdropCarousel,
            skeleton: BackdropSkeleton,
            fetchFn: tmdbService.fetchList,
            fetchParams: { list_id: 8568160, language: language, page: 1 },
          },
          {
            title: t("sections.marvel.monsters"),
            type: "grand-poster",
            component: PosterCarousel,
            skeleton: PosterCarouselSkeleton,
            card_size: "sm-card",
            fetchFn: tmdbService.fetchList,
            fetchParams: { list_id: 8568154, language: language, page: 1 },
          },
        ],
      },
      {
        carousels: [
          {
            title: t("sections.marvel.defenders"),
            type: "grand-poster",
            component: PosterCarousel,
            skeleton: PosterCarouselSkeleton,
            card_size: "ss-card",
            fetchFn: tmdbService.fetchList,
            fetchParams: { list_id: 8568155, language: language, page: 1 },
          },
          {
            title: t("sections.marvel.thunderbolts"),
            type: "grand-poster",
            component: PosterCarousel,
            skeleton: PosterCarouselSkeleton,
            card_size: "ss-card",
            fetchFn: tmdbService.fetchList,
            fetchParams: { list_id: 8568157, language: language, page: 1 },
          },
          {
            title: t("sections.marvel.wakanda"),
            type: "grand-poster",
            component: PosterCarousel,
            skeleton: PosterCarouselSkeleton,
            card_size: "ss-card",
            fetchFn: tmdbService.fetchList,
            fetchParams: { list_id: 8568159, language: language, page: 1 },
          },
        ],
      },
      {
        carousels: [
          {
            title: t("sections.marvel.samWilson"),
            type: "grand-poster",
            component: PosterCarousel,
            skeleton: PosterCarouselSkeleton,
            card_size: "ss-card",
            fetchFn: tmdbService.fetchList,
            fetchParams: { list_id: 8568166, language: language, page: 1 },
          },
          {
            title: t("sections.marvel.timeline"),
            type: "grand-poster",
            component: PosterCarousel,
            skeleton: PosterCarouselSkeleton,
            card_size: "ss-card",
            fetchFn: tmdbService.fetchList,
            fetchParams: { list_id: 8568171, language: language, page: 1 },
          },
          {
            title: t("sections.marvel.series"),
            type: "grand-poster",
            component: PosterCarousel,
            skeleton: PosterCarouselSkeleton,
            card_size: "ss-card",
            fetchFn: tmdbService.fetchList,
            fetchParams: { list_id: 8568331, language: language, page: 1 },
          },
        ],
      },
    ],
  },

  starwars: {
    name: "Star Wars",
    video: starWarsVideo,
    desktopImage: introStarWarsDesktop,
    mobileImage: introStarWarsMobile,
    logo: introStarWarsLogo,
    sections: [
      {
        carousels: [
          {
            title: t("sections.starwars.originals"),
            type: "grand-poster",
            component: PosterCarousel,
            skeleton: PosterCarouselSkeleton,
            card_size: "ss-card",
            fetchFn: tmdbService.fetchList,
            fetchParams: { list_id: 8568180, language: language, page: 1 },
          },
          {
            title: t("sections.starwars.films"),
            type: "grand-poster",
            component: PosterCarousel,
            skeleton: PosterCarouselSkeleton,
            card_size: "ss-card",
            fetchFn: tmdbService.fetchList,
            fetchParams: { list_id: 8568181, language: language, page: 1 },
          },
          {
            type: "hero-section",
            component: HeroSection,
            skeleton: HeroSectionSkeleton,
            fetchFn: tmdbService.fetchMediaDetails,
            fetchParams: { mediaType: "tv", mediaId: 114479, language: language },
          },
        ],
      },
      {
        carousels: [
          {
            title: t("sections.starwars.series"),
            type: "grand-poster",
            component: PosterCarousel,
            skeleton: PosterCarouselSkeleton,
            card_size: "ss-card",
            fetchFn: tmdbService.fetchList,
            fetchParams: { list_id: 8568187, language: language, page: 1 },
          },
          {
            title: t("sections.starwars.chronological"),
            type: "grand-poster",
            component: PosterCarousel,
            skeleton: PosterCarouselSkeleton,
            card_size: "ss-card",
            fetchFn: tmdbService.fetchList,
            fetchParams: { list_id: 8568193, language: language, page: 1 },
          },
          {
            title: t("sections.starwars.animations"),
            type: "grand-poster",
            component: PosterCarousel,
            skeleton: PosterCarouselSkeleton,
            card_size: "ss-card",
            fetchFn: tmdbService.fetchList,
            fetchParams: { list_id: 8568190, language: language, page: 1 },
          },
        ],
      },
      {
        carousels: [
          {
            title: t("sections.starwars.darthVader"),
            type: "grand-poster",
            component: PosterCarousel,
            skeleton: PosterCarouselSkeleton,
            card_size: "ss-card",
            fetchFn: tmdbService.fetchList,
            fetchParams: { list_id: 8568743, language: language, page: 1 },
          },
          {
            title: t("sections.starwars.vintage"),
            type: "grand-poster",
            component: PosterCarousel,
            skeleton: PosterCarouselSkeleton,
            card_size: "ss-card",
            fetchFn: tmdbService.fetchList,
            fetchParams: { list_id: 8568738, language: language, page: 1 },
          },
          {
            title: t("sections.starwars.documentaries"),
            type: "grand-poster",
            component: PosterCarousel,
            skeleton: PosterCarouselSkeleton,
            card_size: "ss-card",
            fetchFn: tmdbService.fetchList,
            fetchParams: { list_id: 8568742, language: language, page: 1 },
          },
        ],
      },
    ],
  },

  national: {
    name: "National Geographic",
    video: nationalVideo,
    desktopImage: introNationalDesktop,
    mobileImage: introNationalMobile,
    logo: introNationalLogo,
    sections: [
      {
        carousels: [
          {
            title: t("sections.national.highlights"),
            type: "grand-poster",
            component: PosterCarousel,
            skeleton: PosterCarouselSkeleton,
            card_size: "ss-card",
            fetchFn: tmdbService.fetchList,
            fetchParams: { list_id: 8568750, language: language, page: 1 },
          },
          {
            title: t("sections.national.originals"),
            type: "grand-poster",
            component: PosterCarousel,
            skeleton: PosterCarouselSkeleton,
            card_size: "ss-card",
            fetchFn: tmdbService.fetchList,
            fetchParams: { list_id: 8568753, language: language, page: 1 },
          },
        ],
      },
      {
        carousels: [
          {
            type: "hero-section",
            component: HeroSection,
            skeleton: HeroSectionSkeleton,
            fetchFn: tmdbService.fetchMediaDetails,
            fetchParams: { mediaType: "movie", mediaId: 1537366, language: language },
          },
          {
            title: t("sections.national.films"),
            type: "grand-poster",
            component: PosterCarousel,
            skeleton: PosterCarouselSkeleton,
            card_size: "ss-card",
            fetchFn: tmdbService.fetchList,
            fetchParams: { list_id: 8568758, language: language, page: 1 },
          },
          {
            title: t("sections.national.originals"),
            type: "grand-poster",
            component: PosterCarousel,
            skeleton: PosterCarouselSkeleton,
            card_size: "ss-card",
            fetchFn: tmdbService.fetchList,
            fetchParams: { list_id: 8568753, language: language, page: 1 },
          },
          {
            title: t("sections.national.science"),
            type: "grand-poster",
            component: PosterCarousel,
            skeleton: PosterCarouselSkeleton,
            card_size: "ss-card",
            fetchFn: tmdbService.fetchList,
            fetchParams: { list_id: 8568759, language: language, page: 1 },
          },
        ],
      },
    ],
  },
})