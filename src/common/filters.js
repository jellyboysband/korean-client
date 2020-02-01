import { format } from '@/common/lib/string'


const floatOptions = Object.freeze({
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})
const integerOptions = Object.freeze({
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
})
const timeOptions = Object.freeze({
  hour: 'numeric',
  minute: 'numeric',
})

const currencyMap = Object.freeze({
  EUR: '€',
  RUB: '₽',
  USD: '$',
})

export default ({ LocaleFormat, DateTimeFormat, NumberFormat }) => ({
  age: (value) => Math.trunc((Date.now() - value) / 31557600000),

  currency: (value) => currencyMap[value],

  datetime: (value, options) => DateTimeFormat(options)(value),

  float: (value) => NumberFormat(floatOptions)(+value),

  format: (value, ...args) => format(value, ...args.map(LocaleFormat)),

  integer: (value) => NumberFormat(integerOptions)(+value),

  locale: (value, lang) => LocaleFormat(value, lang),

  number: (value = 0, options) => NumberFormat(options)(+value),

  time: (value) => DateTimeFormat(timeOptions)(value),

  trunc: (value) => NumberFormat(integerOptions)(Math.trunc(+value)),
})
