import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './en.json';
import ms from './ms.json';

const syncDocumentLanguage = (lng?: string) => {
  const resolvedLanguage = lng || i18n.resolvedLanguage || i18n.language || 'en';
  document.documentElement.lang = resolvedLanguage;
  document.title = i18n.t('app.documentTitle', { lng: resolvedLanguage });
};

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ms: { translation: ms }
    },
    fallbackLng: 'en',
    supportedLngs: ['en', 'ms'],
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'lhdn-language',
      caches: []
    },
    interpolation: {
      escapeValue: false
    }
  })
  .then(() => {
    syncDocumentLanguage();
  });

i18n.on('languageChanged', (lng) => {
  syncDocumentLanguage(lng);
});

export default i18n;
