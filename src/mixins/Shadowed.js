/*
  - 'Shadowed' Vue mixin is suposed to be used together with Sass 'shadowed' sass mixin.

  - Import the Vue mixin in your component and place a ref="shadowed" in the element
    that you would like to have a shadowed scroll behavior.

  - The element must have a wrapper div (father element) for the mixin to work properly.

  - Place a @include shadowed($shadow-size) in the wrapper element (style section)
*/

export const Shadowed = (refName = 'shadowed') => ({
  data () {
    return {
      upperShadow: false,
      bottomShadow: false
    }
  },

  watch: {
    upperShadow (val) {
      if (val) {
        this.shadowedElement.classList.add('-upper-shadow')
      } else {
        this.shadowedElement.classList.remove('-upper-shadow')
      }
    },
    bottomShadow (val) {
      if (val) {
        this.shadowedElement.classList.add('-bottom-shadow')
      } else {
        this.shadowedElement.classList.remove('-bottom-shadow')
      }
    }
  },

  computed: {
    shadowedElement () {
      return this.$refs[refName].hasOwnProperty('$el') ?
        this.$refs[refName].$el : this.$refs[refName]
    }
  },

  methods: {
    toggleScrollShadow () {
      const { scrollTop, scrollHeight, clientHeight } = this.shadowedElement

      this.upperShadow = scrollTop > 0
      this.bottomShadow = scrollHeight > (clientHeight + scrollTop)
    }
  },

  beforeUpdate () {
    this.$nextTick(this.toggleScrollShadow)
  },

  mounted () {
    this.$nextTick(this.toggleScrollShadow)
    window.addEventListener('resize', this.toggleScrollShadow)
    this.shadowedElement.addEventListener('scroll', this.toggleScrollShadow)
  },

  beforeDestroy () {
    window.removeEventListener('resize', this.toggleScrollShadow)
    this.shadowedElement.removeEventListener('scroll', this.toggleScrollShadow)
  }
})

export default Shadowed
