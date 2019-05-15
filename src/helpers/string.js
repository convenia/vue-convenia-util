import { get } from './index'


/**
 * @param {String} value -
 * @returns {String} -
 */
export const normalizeString = (value) => {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}


/**
 * Faz em forma de corrente o replace do texto usando os argumentos
 * especificados.
 *
 * @param {String} text
 * @param {Array.<*>} args
 * @returns {String}
 */
export const replace = (text, args) => args
  .reduce((text, [ matcher, replaceBy ]) => text.replace(matcher, replaceBy), text)


/**
 * @param {Object} entyty -
 * @param {Array<string>} props -
 * @returns {String} -
 */
export const getEntityQuery = (entity, props) => {
  const entityObj = entity || {}
  return props.map((prop) => {
    const value = normalizeString(get(entityObj, prop) || '').toLowerCase()
    return value
  }).join(' ')
}


/**
 * @param {String} word -
 * @param {Array<string>} words -
 * @returns {Booloean} -
 */
export const matches = (word, words) =>
  (word ? words.split(word).length - 1 : 0)


/**
 * @param {Array} list -
 * @param {String} strings -
 * @param {Arrat} keys -
 * @returns {Boolean} -
 */
export const findBy = (list = [], strings = '', keys = []) => {
  const terms = strings.toLowerCase().split(' ')

  return list.filter(el =>
    keys.some((key) => {
      const text = el[key].toLowerCase()

      return terms.some(term => text.includes(term))
    })
  )
}
