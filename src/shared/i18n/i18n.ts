import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import ko from './messages/ko.json'
import en from './messages/en.json'
import { routing } from './routing'

// Resources are imported eagerly (not via i18next-resources-to-backend's lazy
// per-namespace loader) so that the synchronous `getTranslations`/`t.raw`
// compat layer in `./compat.ts` never races an async resource fetch — most
// call sites read translations directly during render, not in an effect.
void i18n.use(initReactI18next).init({
  resources: {
    ko: ko as Record<string, object>,
    en: en as Record<string, object>,
  },
  lng: routing.defaultLocale,
  fallbackLng: routing.defaultLocale,
  supportedLngs: routing.locales,
  interpolation: {
    escapeValue: false,
    prefix: '{',
    suffix: '}',
  },
  returnNull: false,
})

export default i18n
