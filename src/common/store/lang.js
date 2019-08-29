let IntlCached = new WeakMap()

const defaultCollatorOptions = {}
const defaultDateTimeOptions = {}
const defaultListFormatOptions = {}
const defaultNumberFormatOptions = {}
const defaultPluralRulesOptions = {}
const defaultRelativeTimeFormatOptions = {}

const IntlGetOrSet = (constructor, method, lang, options) => IntlCached.get(options)
    || IntlCached.set(options, new constructor(lang, options)[method]).get(options)

const store = {
  state: {
    Lang: null,
  },

  getters: {
    LocaleFormat: ({ Lang }) => (value = '', lang = Lang) => value[lang] || value,

    CollatorCompare: ({ Lang }) => (options = defaultCollatorOptions) => IntlGetOrSet(Intl.Collator, 'compare', Lang, options),
    DateTimeFormat: ({ Lang }) => (options = defaultDateTimeOptions) => IntlGetOrSet(Intl.DateTimeFormat, 'format', Lang, options),
    ListFormat: ({ Lang }) => (options = defaultListFormatOptions) => IntlGetOrSet(Intl.ListFormat, 'format', Lang, options),
    NumberFormat: ({ Lang }) => (options = defaultNumberFormatOptions) => IntlGetOrSet(Intl.NumberFormat, 'format', Lang, options),
    PluralRulesSelect: ({ Lang }) => (options = defaultPluralRulesOptions) => IntlGetOrSet(Intl.PluralRules, 'select', Lang, options),
    RelativeTimeFormat: ({ Lang }) => (options = defaultRelativeTimeFormatOptions) => IntlGetOrSet(Intl.RelativeTimeFormat, 'format', Lang, options),
  },

  mutations: {
    SetLang(state, lang) {
      IntlCached = new WeakMap()

      state.Lang = lang
      window.localStorage.lang = lang
      document?.documentElement?.setAttribute('lang', lang)
    },
  },
}

export default store
