import { is } from './index'


/**
 * @param {Number} ms - The time in miliseconds.
 * @returns {String} -
 */
export const toHours = (ms) => {
  const hours = Math.floor(ms / 3600000)
  const minutes = Math.floor((ms % 3600000) / 3600000 * 60)

  return `${hours}:${minutes || '00'}`
}


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
    : /^\d{4}-\d{2}-\d{2}/.test(date) ? ['YYYY-MM-DD', 'YYYY-MM-DD HH:mm:ss']
    : /^\d{2}-\d{2}-\d{4}/.test(date) ? ['DD-MM-YYYY', 'DD-MM-YYYY HH:mm:ss']
    : /^\d{2}\/\d{2}\/\d{4}/.test(date) ? ['DD/MM/YYYY', 'DD/MM/YYYY HH:mm:ss']
    : null

  return format
}

export const formatDateBR = value => {
  if (!value) return ''

  const date = typeof value === 'string'
    ? new Date(`${value}T00:00:00`)
    : new Date(value)

  return date.toLocaleDateString('pt-BR')
}

export const formatDateUS = date => {
  if (!date) return ''

  return date.substr(0, 10).split('/').reverse().join('-')
}

export const calculateAge = (birthday) => {
  const ageDifMs = Date.now() - birthday.getTime();
  const ageDate = new Date(ageDifMs);

  return Math.abs(ageDate.getUTCFullYear() - 1970);
}
