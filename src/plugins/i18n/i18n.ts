import {createI18n} from "vue-i18n";

/**
 * import locale messages resource from json for global scope
 */
 import es from "@/plugins/i18n/locales/es.json";
import en from "@/plugins/i18n/locales/en.json";
 import { DEFAULT_LANGUAGE } from "@/constants";

// TODO
// function loadLocaleMessages(): LocaleMessages<VueMessageType> {
//   const locales = require.context('./locales', true, /[A-Za-z0-9-_,\s]+\.json$/i)
//   const messages: LocaleMessages<VueMessageType> = {}
//   locales.keys().forEach(key => {
//     const matched = key.match(/([A-Za-z0-9-_]+)\./i)
//     if (matched && matched.length > 1) {
//       const locale = matched[1]
//       messages[locale] = locales(key).default
//     }
//   })
//   return messages
// }

const i18n = createI18n({
  legacy: false,
  locale: DEFAULT_LANGUAGE || 'en',
  fallbackLocale: ["es", "en"],
  messages: {
    es: es,
    en: en
  },
  globalInjection: true,
})

export default i18n;