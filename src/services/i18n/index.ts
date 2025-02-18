import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";
import enTranslation from "./locales/en.json";
import viTranslation from "./locales/vi.json";
i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
      vi: { translation: viTranslation },
    },
    lng: "vi", // default
    fallbackLng: "en", // fallback lang
    interpolation: {
      escapeValue: false,
    },
  })
  .then(() => {
    console.log("i18n initialized");
  });

export default i18n;
