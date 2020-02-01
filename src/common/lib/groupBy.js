export default (arr, criteria) => arr.reduce((acc, curr) => {
  const key = typeof criteria === 'function'
    ? criteria(curr)
    : curr[criteria]

  if (key === undefined) {
    return acc
  }

  // eslint-disable-next-line no-prototype-builtins
  if (!acc.hasOwnProperty(key)) {
    // eslint-disable-next-line no-param-reassign
    acc[key] = []
  }

  acc[key].push(curr)
  return acc
}, {})
