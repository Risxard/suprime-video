import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import translationEN from './locales/en/translation.json';
import translationPT from './locales/pt/translation.json';
import translationES from './locales/es/translation.json';

const currentProfile = JSON.parse(localStorage.getItem("@AuthSV:currentProfile"));
const selectedLang = currentProfile?.userInfoData?.language;

if (selectedLang) {
  localStorage.setItem('i18nextLng', selectedLang);
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en-US',
    returnObjects: true,
    resources: {
      pt: { translation: translationPT },
      en: { translation: translationEN },
      es: { translation: translationES },
    },
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'querystring', 'cookie', 'navigator', 'htmlTag'],
      caches: ['localStorage', 'cookie'],
    },
  });

export default i18n;
