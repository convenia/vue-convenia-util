import { is } from '../helpers/index'

/**
 * Adiciona o dado isLoading com true, que assim que o componente e montado
 * e a action e executada ele passa a ser false.
 *
 * @param {function(Vue): Promise} action - Action a ser executada, recebe
 * o contexto do componente como parametro e deve retornar uma Promise.
 *
 */
export const Loadable = (action) => ({
  data () { return { isLoading: false } },

  async mounted () {
    const loaderFn = action || this.load
    const isLoadable = is(loaderFn, 'Function')

    if (!isLoadable) return

    this.isLoading = true
    await Promise.resolve(loaderFn.call(this))
    this.isLoading = false
  }
})

export default Loadable
