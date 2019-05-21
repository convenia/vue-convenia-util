import { format } from '../src/index'

test('toCPF: Formata um valor, ou parte dele para CPF', () => {
  expect(format.toCPF('00000000000')).toBe('000.000.000-00')
  expect(format.toCPF('00000000')).toBe('000.000.00')
  expect(format.toCPF('366.418.768-70')).toBe('366.418.768-70')
})

test('toCPF: Não formata valores inválidos', () => {
  expect(format.toCPF(undefined)).toBeNull()
  expect(format.toCPF(null)).toBeNull()
})

test('toRG: Formata um valor, ou parte dele, para RG', () => {
  expect(format.toRG('000000000')).toBe('00.000.000-0')
  expect(format.toRG('00000000a')).toBe('00.000.000-A')
  expect(format.toRG('00000000B')).toBe('00.000.000-B')
  expect(format.toRG('00000000x')).toBe('00.000.000-X')
  expect(format.toRG('000000')).toBe('00.000.0')
})

test('toRG: Não formata valores inválidos', () => {
  expect(format.toRG(undefined)).toBeNull()
  expect(format.toRG(null)).toBeNull()
})

test('toMoney: Formata um valor para moeda', () => {
  expect(format.toMoney(1200.504)).toBe('R$ 1.200,50')
  expect(format.toMoney(0)).toBe('R$ 0,00')
  expect(format.toMoney('-74.89')).toBe('R$ -74,89')
})

test('toMoney: Não formata valores inválidos', () => {
  expect(format.toMoney(null)).toBeNull()
  expect(format.toMoney(undefined)).toBeNull()
  expect(format.toMoney([])).toBeNull()
})

test('toYears: Obtém em anos a diferença de uma data', () => {
  expect(format.toYears('28/03/1996')).toBe(23)
  expect(format.toYears('1979-04-13')).toBe(40)
})

test('toYears: Não formata valores inválidos', () => {
  expect(format.toYears(null)).toBeNull()
  expect(format.toYears(undefined)).toBeNull()
  expect(format.toYears('21/15/2017')).toBeNull()
})

test('toDays: Formata um número para sua quantidade em dias', () => {
  expect(format.toDays(null)).toBe('0 dias')
  expect(format.toDays(undefined)).toBe('0 dias')
  expect(format.toDays('quatro')).toBe('0 dias')
  expect(format.toDays(0)).toBe('0 dias')
  expect(format.toDays(4.5)).toBe('4 dias')
  expect(format.toDays(1)).toBe('1 dia')
  expect(format.toDays(2)).toBe('2 dias')
})

test('toDate: Formata uma data (DD-MM-YYYY | YYYY-MM-DD) para DD/MM/YYYY', () => {
  expect(format.toDate('21/08/2002')).toBe('21/08/2002')
  expect(format.toDate('21-08-2002')).toBe('21/08/2002')
  expect(format.toDate('2002-08-21')).toBe('21/08/2002')
  expect(format.toDate('2002-08-21')).toBe('21/08/2002')
  expect(format.toDate('2002-08-21')).toBe('21/08/2002')
})

test('toDate: Usando as opções é possível definir formatos de entrada e saída', () => {
  expect(format.toDate('21/08/2002', { from: 'DD/MM/YYYY', to: 'YYYY-MM-DD' })).toBe('2002-08-21')
  expect(format.toDate('2002-08-21', { to: 'YYYY/MM/DD' })).toBe('2002/08/21')
  expect(format.toDate('2002/08/21', { from: 'YYYY/MM/DD' })).toBe('21/08/2002')
})

test('toDate: Usando as opções é possível escolher usar UTC ao invés da timezone', () => {
  expect(format.toDate(1513791107947, { to: 'DD/MM/YYYY HH:mm', UTC: true })).toBe('20/12/2017 17:31')
  expect(format.toDate(1513791107947, { to: 'DD/MM/YYYY HH:mm', UTC: false })).toBe('20/12/2017 15:31')
  expect(format.toDate(1513791107947, { to: 'DD/MM/YYYY HH:mm' })).toBe('20/12/2017 15:31')
})

test('toDate: Não formata valores inválidos', () => {
  expect(format.toDate(null)).toBeNull()
  expect(format.toDate(undefined)).toBeNull()
  expect(format.toDate('21/08/01')).toBeNull()
  expect(format.toDate('21/30/2001')).toBeNull()
})

test('toInterval: Formata o intervalo de datas', () => {
  expect(format.toInterval({ start: '21-03-2006', end: '20-04-2006' })).toBe('21/03/2006 a 20/04/2006')
  expect(format.toInterval({ start: '21-03-2006', end: '20-04-2006' }, { to: 'MMMM' })).toBe('Março a Abril')
})

test('toEmpty: Retorna um caractere vazio para um dado vazio', () => {
  expect(format.toEmpty(null)).toBe('-')
  expect(format.toEmpty(undefined, '*')).toBe('*')
  expect(format.toEmpty('')).toBe('-')
  expect(format.toEmpty(NaN)).toBe('-')
})

test('toPhone: Formata um valor para telefone', () => {
  expect(format.toPhone('11')).toBe('(11')
  expect(format.toPhone('11971626')).toBe('(11) 9716-26')
  expect(format.toPhone('1197162679')).toBe('(11) 9716-2679')
  expect(format.toPhone('11971626799')).toBe('(11) 97162-6799')
})

test('toPhone: Não formata valores inválidos', () => {
  expect(format.toPhone(null)).toBeNull()
  expect(format.toPhone(undefined)).toBeNull()
  expect(format.toPhone(198928192)).toBeNull()
})

test('toClean: Formata um texto removendo seus acentos', () => {
  expect(format.toClean('Olá, tudo bem com você?')).toBe('Ola, tudo bem com voce?')
  expect(format.toClean('São Paulo - SP')).toBe('Sao Paulo - SP')
})

test('toClean: Não formata valores inválidos', () => {
  expect(format.toClean(null)).toBeNull()
  expect(format.toClean(undefined)).toBeNull()
})

test('toSlug: Formata um texto para "kebab-case"', () => {
  expect(format.toSlug('Olá, tudo bem com você?')).toBe('ola-tudo-bem-com-voce')
  expect(format.toSlug('São Paulo - SP')).toBe('sao-paulo-sp')
})

test('toSlug: Não formata valores inválidos', () => {
  expect(format.toSlug(null)).toBeNull()
  expect(format.toSlug(undefined)).toBeNull()
})

test('toCEP: Formata um texto para CEP', () => {
  expect(format.toCEP('15998030')).toBe('15998-030')
  expect(format.toCEP('159980')).toBe('15998-0')
})

test('toCEP: Não formata valores inválidos', () => {
  expect(format.toCEP(null)).toBeNull()
  expect(format.toCEP(undefined)).toBeNull()
  expect(format.toCEP(15998030)).toBeNull()
})
