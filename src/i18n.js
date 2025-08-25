import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import uk from './locales/uk.json';

const savedLang = localStorage.getItem('language') || 'en';

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: en },
            uk: { translation: uk },
        },
        lng: savedLang || 'en',
        fallbackLng: 'uk',
        debug: true, // вмикає логування
        interpolation: { escapeValue: false },
    });

export default i18n;