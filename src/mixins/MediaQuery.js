/**
 *
 */
export const MediaQuery = {
  data () {
    return {
      matchMedia: window.matchMedia('(max-width: 1023px)'),
      isMobile: false
    }
  },
  methods: {
    setBreakpoint () {
      this.isMobile = this.matchMedia && this.matchMedia.matches
    }
  },
  beforeDestroy () {
    this.matchMedia.removeListener(this.setBreakpoint)
  },
  mounted () {
    this.matchMedia.addListener(this.setBreakpoint)
    this.setBreakpoint()
  }
}

export default MediaQuery
