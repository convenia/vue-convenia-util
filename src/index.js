import * as format from './helpers/formatters'
import * as validate from './helpers/validators'
import * as helpers from './helpers/helpers'
import * as mixin from './mixins/index'

/**
 * Opções do plugin.
 * @typedef {Object} Options
 * @property {Boolean} formatters
 * @property {Boolean} formatFilters
 * @property {Boolean} validators
 */

/**
 * Adiciona as funções auxiliares definidas no protótipo do Vue, e
 * consequentemente aos componentes.
 * @param {Vue} Vue
 * @param {Options} options
 */
const install = (Vue, options = {}) => {
  if (options.formatters) {
    Vue.prototype.$format = format
  }

  if (options.formatFilters) {
    Object.keys(format).forEach(name => {
      const handler = format[name]
      Vue.filter(name, handler)
    })
  }

  if (options.validators) {
    Vue.prototype.$validate = validate
  }
}

export default {
  install,
  validate,
  format,
  mixin,
  helpers
}
