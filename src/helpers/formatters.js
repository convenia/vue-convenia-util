import dayjs from 'dayjs-ext'
import customParseFormat from 'dayjs-ext/plugin/customParseFormat'
dayjs.extend(customParseFormat)

import normalize, { normalizeDiacritics } from 'normalize-text'

import { getDateFormat, replace, is, isDate } from './index'

/**
 * Transforma um valor para a formatação de CPF.
 * @example ```
 * ('00000000000') => '000.000.000-00'
 * ('12345678') => '123.456.78'
 * ('Abacaxi') => null
 * ```
 * @param {String} cpf
 * @returns {String}
 */
export const toCPF = (cpf) => {
  const isValid = is(cpf, 'String')
  const formatted = !isValid ? null : replace(cpf, [
    [/\D/g, ''],
    [/(\d{3})(\d)/, '$1.$2'],
    [/(\d{3})(\d)/, '$1.$2'],
    [/(\d{3})(\d{1,2})$/, '$1-$2']
  ])
  return formatted
}

/**
 * Transforma um valor para a formatação de RG.
 * @example ```
 * ('000000000') => '00.000.000-0'
 * ('12345678') => '123.456.78'
 * ('Abacaxi') => null
 * ```
 * @param {String} rg
 * @returns {String}
 */
export const toRG = (rg) => {
  const isValid = is(rg, 'String')
  const formatted = !isValid ? null : replace(rg.toUpperCase(), [
    [/[^\d|A|B|X]/g, ''],
    [/(\d{2})(\d)/, '$1.$2'],
    [/(\d{3})(\d)/, '$1.$2'],
    [/(\d{3})([\d|A|B|X]{1})$/, '$1-$2']
  ])
  return formatted
}

/**
 * Formata uma data 'YYYY-MM-DD' ou 'DD-MM-YYYY' em 'DD/MM/YYYY'. Transforma
 * a data em 'YYYY-MM-DD' caso o segundo parâmetro seja "true".
 * @example ```
 * ('21-12-2006') => '21/12/2006'
 * ('2006-12-21') => '21/12/2006'
 * ('21/12/2006') => '21/12/2006'
 * ('21/12/2006', true) => '2006-12-21'
 * ('2006-12-21', true) => '2006-12-21'
 * ('2006/12/21') => null
 * ```
 * @param {String} date
 * @param {{ from: String, to: String, UTC: Boolean }} [options]
 * @returns {String}
 */
export const toDate = (date, { to = 'DD/MM/YYYY', from = getDateFormat(date), UTC: isUTC = false } = {}) => {
  const isValid = from && isDate(date, from)
  if (!isValid) return null

  const formatted = dayjs(date,{ format: from, utc: isUTC })

  return formatted.format(to)
}

/**
 * Usa a formatação de datas para retornar um intervalo.
 * @example ```
 * ({ start: '21-12-2006', end: '31-12-2006' }) => '21/12/2006 a 31/12/2006'
 * ```
 * @param {{ start: String, end: String }} dates
 * @param {{ from: String, to: String }} [options]
 * @returns {String}
 */
export const toInterval = (dates, options = {}) => {
  const { start, end } = dates
  const interval = `${toDate(start, options)} a ${toDate(end, options)}`
  return interval
}

/**
 * Faz uma verificação simples e coloca o caractere para vazio caso o valor seja
 * vazio (null, undefined, '').
 * @param {*} value
 * @param {String} char
 * @returns {String}
 */
export const toEmpty = (value, char = '-') => value || char

/**
 * Formata um valor para o formato de telefone.
 * @param {String} value
 * @returns {String}
 */
export const toPhone = (value) => {
  const isValid = is(value, 'String')
  const formatted = !isValid ? null : replace(value, [
    [/\D/g, ''],
    [/(\d{1,2})/, '($1'],
    [/(\(\d{2})(\d{1,4})/, '$1) $2'],
    [/( \d{4})(\d{1,4})/, '$1-$2'],
    [/( \d{4})(?:-)(\d{1})(\d{4})/, '$1$2-$3']
  ])
  return formatted
}

/**
 * Formata o texto removendo seus acentos.
 * @example ```
 * ('Vítor') => 'Vitor'
 * ('Olá, tudo bem com você?') => 'Ola, tudo bem com voce?'
 * ```
 * @param {String} value
 * @returns {String}
 */
export const toClean = (value) => {
  const isValid = is(value, 'String')
  const formatted = !isValid ? null : normalizeDiacritics(value)
  return formatted
}

/**
 * Formata um texto o transformando em _kebab-case_.
 * @param {String} value
 * @returns {String}
 */
export const toSlug = (value) => {
  if (!is(value, 'String')) { // Short-circuit to handle all non-string values
    return null               // and return null.
  }
  const formatted = replace(normalize(value), [
    [/&/g, '-e-'],
    [/\W/g, '-'],
    [/--+/g, '-'],
    [/(^-+)|(-+$)/, '']
  ])
  return formatted
}

/**
 * Formata um valor para CEP.
 * @param {String} value
 * @returns {Boolean}
 */
export const toCEP = (value) => {
  const isValid = is(value, 'String')
  const formatted = !isValid ? null : replace(value, [
    [/\D/g, ''],
    [/(\d{5})(\d{1,3})/, '$1-$2']
  ])
  return formatted
}
