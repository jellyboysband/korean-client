/**
 * Вызывает функцию с ошибкой для обязательных параметров функции
 */
const require = (...args) => {
  throw new Error(`${args} is required!`)
}
export default require
