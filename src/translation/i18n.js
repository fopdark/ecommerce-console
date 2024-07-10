import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

import translationEN from '../locales/en/translation';
import translationKO from '../locales/ko/translation';
import translationJA from '../locales/ja/translation';
import translationVI from '../locales/vi/translation';

// the translations
const resources = {
    en: {
        translation: translationEN
    },
    ko: {
        translation: translationKO
    },
    ja: {
        translation: translationJA
    },
    vi: {
        translation: translationVI
    }
};

i18n
    .use(Backend)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'ko',
        debug: true,
        interpolation: {
            escapeValue: false // not needed for react as it escapes by default
        }
    });

export default i18n;

