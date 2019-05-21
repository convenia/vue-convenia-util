import { validate } from '../src/index'

test('is: Verdadeiro para a comparação de um valor com seu construtor', () => {
  expect(validate.is(null, 'Null')).toBeTruthy()
  expect(validate.is(undefined, 'Undefined')).toBeTruthy()
  expect(validate.is(1200, 'String')).toBeFalsy()
  expect(validate.is('R$ 120,20', 'String')).toBeTruthy()
  expect(validate.is([0, 1, 2, 3], 'Object')).toBeFalsy()
  expect(validate.is({ name: 'Convenia' }, 'Object')).toBeTruthy()
})

test('isCPF: Verdadeiro para um CPF válido', () => {
  expect(validate.isCPF('366.418.768-70')).toBeTruthy()
  expect(validate.isCPF('36641876870')).toBeTruthy()
  expect(validate.isCPF('213.198.013-20')).toBeFalsy()
  expect(validate.isCPF('2131201872781')).toBeFalsy()
  expect(validate.isCPF('11111111111')).toBeTruthy()
  expect(validate.isCPF('00000000000')).toBeFalsy()
  expect(validate.isCPF('111.111.111-11')).toBeTruthy()
  expect(validate.isCPF('UHASHUISIH910')).toBeFalsy()
})

test('isCPF: Falso para dados que não sejam "string"', () => {
  // Teste que valida a correção do issue #5
  // Link: https://github.com/convenia/vue-convenia-util/issues/5
  expect(validate.isCPF(undefined)).toBeFalsy()
  expect(validate.isCPF(null)).toBeFalsy()
  expect(validate.isCPF(36641876870)).toBeFalsy()
})

test('isDate: Verdadeiro para uma data válida (DD/MM/YYYY | DD-MM-YYYY & YYYY-MM-DD)', () => {
  expect(validate.isDate('28/03/2017')).toBeTruthy()
  expect(validate.isDate('28-03-2017')).toBeTruthy()
  expect(validate.isDate('2017-03-28')).toBeTruthy()
  expect(validate.isDate('31/02/2017')).toBeFalsy()
})

test('isDate: Falso para uma data inválida ou fora da formatação padrão', () => {
  expect(validate.isDate('03/28/2017')).toBeFalsy()
  expect(validate.isDate('28-13-9017')).toBeFalsy()
  expect(validate.isDate('0000-00-00')).toBeFalsy()
  expect(validate.isDate('29/12')).toBeFalsy()
})

test('isDate: Valida usando o formato especificado ao invés de um dinâmico', () => {
  expect(validate.isDate('31/13/17', 'DD/MM/YY')).toBeFalsy()
})

test('isDate: Falso para dados que não sejam "string" (com excecao de timestamps)', () => {
  expect(validate.isDate(undefined)).toBeFalsy()
  expect(validate.isDate(null)).toBeFalsy()
  expect(validate.isDate(36641876870)).toBeTruthy()
})

test('isCNPJ: Verdadeiro para um CNPJ válido', () => {
  expect(validate.isCNPJ('41142260000189')).toBeTruthy()
  expect(validate.isCNPJ('45.723.174/0001-10')).toBeTruthy()
  expect(validate.isCNPJ('41142260007182')).toBeFalsy()
  expect(validate.isCNPJ('19.981.127/0001-10')).toBeFalsy()
})

test('isCNPJ: Falso para dados que não sejam "string"', () => {
  expect(validate.isCNPJ(undefined)).toBeFalsy()
  expect(validate.isCNPJ(null)).toBeFalsy()
  expect(validate.isCNPJ(41142260000189)).toBeFalsy()
})

test('isEmail: Verdadeiro para um possível email', () => {
  expect(validate.isEmail('example@example.com')).toBeTruthy()
  expect(validate.isEmail('@example.com')).toBeFalsy()
  expect(validate.isEmail('example.com.br')).toBeFalsy()
})

test('isEmail: Falso para dados que não sejam "string"', () => {
  expect(validate.isEmail(undefined)).toBeFalsy()
  expect(validate.isEmail(null)).toBeFalsy()
  expect(validate.isEmail(41142260000189)).toBeFalsy()
})
