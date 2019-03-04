import { is } from './index'


/**
 * Converts hours to milliseconds
 *
 * @param {Number} value - The time in hours.
 * @returns {}
 */
export const toMilliseconds = (value) => {
  if (Number.isInteger(value)) return value

  const parsedValue = value.replace('hs', '').split(':')
  const hours = +(parsedValue[0] || 0) * 3600000
  const minutes = (parsedValue[1] || '').length < 2
    ? +(`${parsedValue[1] || 0}0`) * 60000
    : +(parsedValue[1] || 0) * 60000

  return hours + minutes
}

/**
 * Converts milliseconds to hours
 *
 * @param {Number} ms - The time in miliseconds.
 * @returns {String} - The formmated time in `${hours}:${minutes}`.
 */
export const toHours = (ms) => {
  const hours = Math.floor(ms / 3600000)
  const minutes = Math.floor((ms % 3600000) / 3600000 * 60)

  return `${hours}:${minutes || '00'}`
}

/**
 * Formata para o formato de dias.
 * @example ```
 * (2) => '2 dias'
 * (1) => '1 dia'
 * (0) => '0 dias'
 * ```
 * @param {Number} quantity
 * @returns {String}
 */
export const toDays = (quantity) => {
  const isValid = is(quantity, 'Number') && Number.isFinite(quantity)
  const days = (quantity === 1) ? '1 dia' : `${isValid ? ~~(quantity) : 0} dias`
  return days
}

/**
 * Obtém a quantidade de anos a partir da data.
 * @example ```
 * ('21-12-2006') => 10
 * ('2000-12-21') => 16
 * ('Abacaxi') => null
 * ```
 * @param {String} date
 * @returns {Number}
 */
export const toYears = (date) => {
  const format = getDateFormat(date)
  const from = format ? dayjs(date, format) : null
  const diff = from ? dayjs().diff(from, 'years') : null
  const years = is(diff, 'Number') && !isNaN(diff) ? diff : null
  return years
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
