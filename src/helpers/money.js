
/**
 * Formata um valor para a formatação de moeda.
 * @example ```
 * ('1200') => 'R$ 1.200,00'
 * (15.50) => 'R$ 15,50'
 * ('Abacaxi') => null
 * ```
 * @param {String} number
 * @returns {String}
 */
export const toMoney = (number) => {
  const isValid = is(number, 'Number') || (is(number, 'String') && !isNaN(number))
  const formatted = !isValid ? null : 'R$ ' + replace((+number).toFixed(2), [
    ['.', ','],
    [/(\d)(?=(\d{3})+(?!\d))/g, '$1.']
  ])
  return formatted
}
