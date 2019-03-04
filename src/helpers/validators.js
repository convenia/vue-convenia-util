import dayjs from 'dayjs'
import customParseFormat from 'dayjs-ext/plugin/customParseFormat'
dayjs.extend(customParseFormat)

import { getDateFormat, getConstructor } from './index'


/**
 * Check value's constructor name.
 * @param {*} value
 * @param {string} constructor
 * @returns {boolean}
 */

export const is = (value, constructor) => {
  return Object.prototype.toString.call(value) === `[object ${constructor}]`
}


/**
 * Creates a validator function that checks is value is included in values.
 * @param {Array} values
 * @returns {function(*):boolean}
 */
const includes = (values) => (value) => values.includes(value)


/**
 * Checks if value is an alignment.
 */
const ALIGNMENTS = ['right', 'left', 'center']
export const isAlignment = includes(ALIGNMENTS)


/**
 * Checks if value is a list of objects.
 * @param {*} value
 * @returns {boolean}
 */
export const isContent = (value) => {
  const isObject = (value) => is(value, 'Object')
  const isContent = is(value, 'Array') && value.every(isObject)
  return isContent
}


/**
 *
 */
export const isCPF = (cpf) => {
  const isInvalid = (cpf, rest, pos) => rest !== parseInt(cpf.substring(pos, pos + 1))

  const sumDigit = (cpf, digit) => 11 - (cpf.substring(0, digit).split('').reduce((acc, curr, index) => {
    acc += parseInt(curr) * ((digit + 1) - index)
    return acc
  }, 0) % 11)

  const getRest = sum => sum > 9 ? 0 : sum

  if (!is(cpf, 'String')) return false

  cpf = cpf.replace(/[\D]/gi, '')

  if (!cpf.match(/^\d+$/)) return false

  if (cpf === '00000000000' || cpf.length !== 11) return false

  if (isInvalid(cpf, getRest(sumDigit(cpf, 9)), 9)) return false

  if (isInvalid(cpf, getRest(sumDigit(cpf, 10)), 10)) return false

  return true
}


/**
 * Valida se é uma data com o formato especificado ou, quando não especificado,
 * valida se é um dos formatos 'DD/MM/YYYY', 'DD-MM-YYYY' e 'YYYY-MM-DD'.
 * @example ```
 * ('3/102/2006') => false
 * ('31/02/2006') => false
 * ('21/12/2006') => true
 * ('21/12/2006', 'YYYY-MM-DD') => false
 * ```
 * @param {String} date
 * @param {String} [format]
 * @returns {Boolean}
 */
export const isDate = (date, format = null) => {
  const from = format || getDateFormat(date)
  const isValid = from ? dayjs(date, { format: from }).isValid() : false
  return isValid
}


/**
 * Valida se o valor é um CPNJ válido.
 * @param {String} value
 * @returns {Boolean}
 */
export const isCNPJ = (value) => {
  if (!is(value, 'String')) {
    return false
  }

  const digits = value.replace(/[\D]/gi, '')

  let dig1 = 0
  let dig2 = 0

  const validation = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]

  const digito = parseInt(digits.charAt(12) + digits.charAt(13))

  const getRest = dig => (((dig % 11) < 2) ? 0 : (11 - (dig % 11)))

  validation.map((v, i) => {
    dig1 += (i > 0 ? (digits.charAt(i - 1) * v) : 0)
    dig2 += digits.charAt(i) * v
  })

  dig1 = getRest(dig1)
  dig2 = getRest(dig2)

  return (((dig1 * 10) + dig2) === digito)
}


/**
 * Valida, de forma simples*, se o valor é um email válido.
 * @param {String} value
 * @returns {Boolean}
 */
export const isEmail = (value) => {
  const isValid = is(value, 'String') && /^.+@.+\..+$/.test(value)
  return isValid
}


/**
 * Checks if value is not null
 * @param {*} value
 * @returns {boolean}
 */
export const defaultValidator = (value) => !is(value, 'Null')
