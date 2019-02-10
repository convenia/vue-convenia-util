/**
 * Resolve o problema das propriedades não inicializadas que não poderiam ser
 * observadas.
 * @param {{}} template
 */
export const ObservableFix = (template = {}) => ({
  props: {
    data: {
      type: Object,
      default: () => Object.assign({}, template)
    }
  },
  data () {
    return {
      selected: Object.assign({}, template)
    }
  },
  watch: {
    data () {
      this.cloneData()
    }
  },
  methods: {
    cloneData () {
      this.selected = Object.assign({}, template, this.data)
    }
  },
  mounted () {
    this.cloneData()
  }
})

export default ObservableFix
