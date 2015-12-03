

/**
 * Simple random integer generation.
 *
 * @link http://stackoverflow.com/questions/1527803/generating-random-numbers-in-javascript-in-a-specific-range
 */
export function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * @link https://gist.github.com/svlasov-gists/2383751
 */
export function merge(target, source) {
  if (typeof target !== 'object') {
    target = {}
  }

  for (let property in source) {
    if (source.hasOwnProperty(property)) {
      let sourceProperty = source[property]

      if (typeof sourceProperty === 'object') {
        target[property] = merge(target[property], sourceProperty)
        continue
      }

      target[property] = sourceProperty
    }
  }

  for (let a = 2, l = arguments.length; a < l; a++) {
    merge(target, arguments[a])
  }

  return target
}
