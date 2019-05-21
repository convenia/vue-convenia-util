import dayjs from 'dayjs-ext'
import { is } from './index'


/**
 * Obtém o formato da data ou null se não for possível identificar.
 * @example ```
 * ('2000-21-12') => ['YYYY-DD-MM', 'YYYY-MM-DD HH:mm:ss']
 * ('21-12-2000') => ['DD-MM-YYYY', 'DD-MM-YYYY HH:mm:ss']
 * ('21/12/2000 23:59:18') => ['DD/MM/YYYY', 'DD/MM/YYYY HH:mm:ss']
 * ('2000/12/21') => null
 * ```
 * @param {String} date
 * @returns {String}
 */
export const getDateFormat = (date) => {
  const isValid = is(date, 'String') && date.trim().length >= 10
  const format = !isValid ? null
    : /^\d{4}-\d{2}-\d{2}$/.test(date) ? 'YYYY-MM-DD'
    : /^\d{2}-\d{2}-\d{4}$/.test(date) ? 'DD-MM-YYYY'
    : /^\d{2}\/\d{2}\/\d{4}$/.test(date) ? 'DD/MM/YYYY'
    : null

  return format
}

/**
 * Receives a date in US string format or unix timestamp and returns
 * it in brazillian format.
 *
 * @param {String|Number} value - The date to be formatted.
 * @returns {String} - the formmated date.
 *
 */
export const formatDateBR = value => {
  if (!value) return ''

  const date = typeof value === 'string'
    ? new Date(`${value}T00:00:00`)
    : new Date(value)

  return date.toLocaleDateString('pt-BR')
}


/**
 * Receives a date in BR string format and returns its US equivalent
 *
 * @param {String} value - The date to be formatted.
 * @returns {String} - the formmated date.
 *
 */
export const formatDateUS = date => {
  if (!date) return ''

  return date.substr(0, 10).split('/').reverse().join('-')
}


/**
 * Calculates a person's age given a birthday.
 *
 * @param {Date} birthday - A Date instance representing the birthday.
 * @returns {Number} - The person's age.
 *
 */
export const calculateAge = (birthday) => {
  const ageDifMs = Date.now() - birthday.getTime();
  const ageDate = new Date(ageDifMs);

  return Math.abs(ageDate.getUTCFullYear() - 1970);
}
