import { getProperty, isAlignment } from '../helpers'

/**
 * @param {Object} -
 */
export const Alignable = ({ cols = 'cols' } = {}) => ({
  props: {
    align: {
      type: String,
      default: 'left',
      validator: isAlignment
    }
  },

  methods: {
    /**
     * Get column's alignment.
     * @param {number} index
     * @returns {('right'|'left'|'center')}
     */
    $getAlignment (index) {
      const col = this[cols][index]
      const alignment = getProperty('align', [col, this._props], isAlignment)
      return alignment
    }
  }
})

export default Alignable
