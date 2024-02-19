import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";

const resources = {
  en: {
    translation: {
      Header: {
        Login: "Login",
      },
    },
  },
  ar: {
    translation: {
      Header: {
        Login: "تسجيل الدخول",
      },
    },
  },
};
export const supportedLngs = {
  en: "English",
  ar: "Arabic (العربية)",
};

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // resources,
    supportedLngs: Object.keys(supportedLngs),
    debug: true,
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });
export default i18n;
