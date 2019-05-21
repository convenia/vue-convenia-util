import sinon from 'sinon'
import install, { format, validate } from '../src/index'

const getVue = () => {
  const Vue = class {
    static use (plugin) {
      const install = (plugin && typeof plugin === 'object') ? plugin.install : plugin
      install.call(Vue)
    }

    static filter (name, handler) {}
  }

  return Vue
}

test('A exportação padrão é uma função', () => {
  expect(typeof install).toBe('function')
})

test('Exporta o namespace "format"', () => {
  expect(!!format).toBeTruthy()
  expect(typeof format).toBe('object')
})

test('Exporta o namespace "validate"', () => {
  expect(!!validate).toBeTruthy()
  expect(typeof validate).toBe('object')
})

test('Implanta os plugins selecionados', () => {
  const Vue = getVue()
  const spy = sinon.spy(Vue, 'filter')
  const vm = new Vue()

  install(Vue, {
    formatters: true,
    formatFilters: true,
    validators: true
  })

  expect(spy.called).toBeTruthy()
  expect(!!vm.$format).toBeTruthy()
  expect(!!vm.$validate).toBeTruthy()
})

test('Implanta apenas os plugins selecionados', () => {
  const Vue = getVue()
  const spy = sinon.spy(Vue, 'filter')
  const vm = new Vue()

  install(Vue, {
    formatters: false,
    formatFilters: false,
    validators: false
  })

  expect(spy.called).toBeFalsy()
  expect(!!vm.$format).toBeFalsy()
  expect(!!vm.$validate).toBeFalsy()
})
