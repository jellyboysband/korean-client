/**
 * Вызывает функцию с ошибкой для обязательных параметров функции
 */
export default (...args) => throw new Error(`${args} is required!`)
