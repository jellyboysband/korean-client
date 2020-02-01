/**
  * Заменяет все вхождения подстроки в строке
  */
export const replace = (string, from, to) => string.split(from).join(to)

/**
  * Заменяет в шаблоне переменные на переданные значения
  */
export const format = (template, ...args) => args.reduce((prev, curr, i) => replace(prev, `{${i}}`, curr), template)
