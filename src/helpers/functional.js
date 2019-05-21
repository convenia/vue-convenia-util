/**
 * Obtém o construtor do valor.
 * @param {*} value
 * @returns {String}
 */
export const getConstructor = (value) => {
  const string = Object.prototype.toString.call(value)
  const [ , constructor ] = /\[object (.*?)\]/.exec(string)
  return constructor
}

/**
 * Usando um valor inicial, encadeia uma função e retorna seu resultado.
 * @param {A} initial
 * @param {function(A):function} callback
 * @param {Array.<*>} params
 * @returns {B}
 * @template A, B
 */
export const chain = (initial, callback, params) => {
  const value = params.reduce((value, args) => {
    return callback(value).apply(value, [...args])
  }, initial)

  return value
}
