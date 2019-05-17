import utils from '../src'

console.log('format: ', utils)

test('toCPF: Formata um valor, ou parte dele para CPF', () => {
  expect(utils.default.format.toCPF('00000000000')).toBe('000.000.000-00')
  expect(utils.format.toCPF('00000000')).toBe('000.000.00')
  expect(utils.format.toCPF('366.418.768-70')).toBe('366.418.768-70')
})

test('toCPF: Não formata valores inválidos', () => {
  expect(utils.format.toCPF(undefined)).toBeNull()
  expect(utils.format.toCPF(null)).toBeNull()
})

test('toRG: Formata um valor, ou parte dele, para RG', () => {
  expect(utils.format.toRG('000000000')).toBe('00.000.000-0')
  expect(utils.format.toRG('00000000a')).toBe('00.000.000-A')
  expect(utils.format.toRG('00000000B')).toBe('00.000.000-B')
  expect(utils.format.toRG('00000000x')).toBe('00.000.000-X')
  expect(utils.format.toRG('000000')).toBe('00.000.0')
})

test('toRG: Não formata valores inválidos', () => {
  expect(utils.format.toRG(undefined)).toBeNull()
  expect(utils.format.toRG(null)).toBeNull()
})

test('toMoney: Formata um valor para moeda', () => {
  expect(utils.format.toMoney(1200.504)).toBe('R$ 1.200,50')
  expect(utils.format.toMoney(0)).toBe('R$ 0,00')
  expect(utils.format.toMoney('-74.89')).toBe('R$ -74,89')
})

test('toMoney: Não formata valores inválidos', () => {
  expect(utils.format.toMoney(null)).toBeNull()
  expect(utils.format.toMoney(undefined)).toBeNull()
  expect(utils.format.toMoney([])).toBeNull()
})

test('toYears: Obtém em anos a diferença de uam data', () => {
  expect(utils.format.toYears('28/03/1996')).toBe(21)
  expect(utils.format.toYears('1979-04-13')).toBe(38)
})

test('toYears: Não formata valores inválidos', () => {
  expect(utils.format.toYears(null)).toBeNull()
  expect(utils.format.toYears(undefined)).toBeNull()
  expect(utils.format.toYears('21/15/2017')).toBeNull()
})

test('toDays: Formata um número para sua quantidade em dias', () => {
  expect(utils.format.toDays(null)).toBe('0 dias')
  expect(utils.format.toDays(undefined)).toBe('0 dias')
  expect(utils.format.toDays('quatro')).toBe('0 dias')
  expect(utils.format.toDays(0)).toBe('0 dias')
  expect(utils.format.toDays(4.5)).toBe('4 dias')
  expect(utils.format.toDays(1)).toBe('1 dia')
  expect(utils.format.toDays(2)).toBe('2 dias')
})

test('toDate: Formata uma data (DD-MM-YYYY | YYYY-MM-DD) para DD/MM/YYYY', () => {
  expect(utils.format.toDate('21/08/2002')).toBe('21/08/2002')
  expect(utils.format.toDate('21-08-2002')).toBe('21/08/2002')
  expect(utils.format.toDate('2002-08-21')).toBe('21/08/2002')
  expect(utils.format.toDate('2002-08-21')).toBe('21/08/2002')
  expect(utils.format.toDate('2002-08-21')).toBe('21/08/2002')
})

test('toDate: Usando as opções é possível definir formatos de entrada e saída', () => {
  expect(utils.format.toDate('21/08/2002', { from: 'DD/MM/YYYY', to: 'YYYY-MM-DD' })).toBe('2002-08-21')
  expect(utils.format.toDate('2002-08-21', { to: 'YYYY/MM/DD' })).toBe('2002/08/21')
  expect(utils.format.toDate('2002/08/21', { from: 'YYYY/MM/DD' })).toBe('21/08/2002')
})

test('toDate: Usando as opções é possível escolher usar UTC ao invés da timezone', () => {
  expect(utils.format.toDate(1513791107947, { from: 'x', to: 'DD/MM/YYYY HH:mm', UTC: true })).toBe('20/12/2017 17:31')
  expect(utils.format.toDate(1513791107947, { from: 'x', to: 'DD/MM/YYYY HH:mm', UTC: false })).toBe('20/12/2017 15:31')
  expect(utils.format.toDate(1513791107947, { from: 'x', to: 'DD/MM/YYYY HH:mm' })).toBe('20/12/2017 15:31')
})

test('toDate: Não formata valores inválidos', () => {
  expect(utils.format.toDate(null)).toBeNull()
  expect(utils.format.toDate(undefined)).toBeNull()
  expect(utils.format.toDate('21/08/01')).toBeNull()
  expect(utils.format.toDate('21/30/2001')).toBeNull()
})

test('toInterval: Formata o intervalo de datas', () => {
  expect(utils.format.toInterval({ start: '21-03-2006', end: '20-04-2006' })).toBe('21/03/2006 a 20/04/2006')
  expect(utils.format.toInterval({ start: '21-03-2006', end: '20-04-2006' }, { to: 'MMMM' })).toBe('março a abril')
})

test('toEmpty: Retorna um caractere vazio para um dado vazio', () => {
  expect(utils.format.toEmpty(null)).toBe('-')
  expect(utils.format.toEmpty(undefined, '*')).toBe('*')
  expect(utils.format.toEmpty('')).toBe('-')
  expect(utils.format.toEmpty(NaN)).toBe('-')
})

test('toPhone: Formata um valor para telefone', () => {
  expect(utils.format.toPhone('11')).toBe('(11')
  expect(utils.format.toPhone('11971626')).toBe('(11) 9716-26')
  expect(utils.format.toPhone('1197162679')).toBe('(11) 9716-2679')
  expect(utils.format.toPhone('11971626799')).toBe('(11) 97162-6799')
})

test('toPhone: Não formata valores inválidos', () => {
  expect(utils.format.toPhone(null)).toBeNull()
  expect(utils.format.toPhone(undefined)).toBeNull()
  expect(utils.format.toPhone(198928192)).toBeNull()
})

test('toClean: Formata um texto removendo seus acentos', () => {
  expect(utils.format.toClean('Olá, tudo bem com você?')).toBe('Ola, tudo bem com voce?')
  expect(utils.format.toClean('São Paulo - SP')).toBe('Sao Paulo - SP')
})

test('toClean: Não formata valores inválidos', () => {
  expect(utils.format.toClean(null)).toBeNull()
  expect(utils.format.toClean(undefined)).toBeNull()
})

test('toSlug: Formata um texto para "kebab-case"', () => {
  expect(utils.format.toSlug('Olá, tudo bem com você?')).toBe('ola-tudo-bem-com-voce')
  expect(utils.format.toSlug('São Paulo - SP')).toBe('sao-paulo-sp')
})

test('toSlug: Não formata valores inválidos', () => {
  expect(utils.format.toSlug(null)).toBeNull()
  expect(utils.format.toSlug(undefined)).toBeNull()
})

test('toCEP: Formata um texto para CEP', () => {
  expect(utils.format.toCEP('15998030')).toBe('15998-030')
  expect(utils.format.toCEP('159980')).toBe('15998-0')
})

test('toCEP: Não formata valores inválidos', () => {
  expect(utils.format.toCEP(null)).toBeNull()
  expect(utils.format.toCEP(undefined)).toBeNull()
  expect(utils.format.toCEP(15998030)).toBeNull()
})
