<template lang="pug">
  //- transiton for v-show give colapse animation
  //- colapse animation ended -> slot destoroed
  section.collapse(v-on="$listeners")
    .collapse-trigger(@click="toggle")
      slot(name="trigger" :opened="isOpened")

    transition(
      @beforeLeave="animateFrom"
      @beforeEnter="animateFrom"
      @leave="animateTo"
      @enter="animateTo"
      @afterLeave="clearStyles"
      @afterEnter="clearStyles"
    )
      .collapse-content(v-if="isOpened")
        slot

</template>

<script>
/* eslint-disable no-param-reassign */
/* eslint-disable no-mixed-operators */
export default {
  props: {
    opened: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      isOpened: this.opened,
      saveElement: null,
    }
  },

  watch: {
    opened(value) {
      this.isOpened = value
    },
  },

  methods: {
    animateFrom(element) {
      const { scrollHeight } = element
      const height = this.saveElement && window.getComputedStyle(this.saveElement).height || 0

      element.style.height = this.isOpened ? height : `${scrollHeight}px`
      this.saveElement = element
    },

    animateTo(element) {
      const { scrollHeight } = element

      element.style.height = this.isOpened ? `${scrollHeight}px` : 0
    },

    clearStyles(element) {
      // remove added styles
      this.saveElement = null
      element.style.removeProperty('height')
      this.$emit('transitionEnd')
    },

    toggle() {
      this.isOpened = !this.isOpened
      this.$emit('update:opened', this.isOpened)
      this.$emit('toggle', this.isOpened)
      this.$emit(this.isOpened ? 'open' : 'close')
    },
  },
}
</script>

<style lang="stylus">
.collapse-content
  height auto
  overflow hidden
  transition height .3s ease-out
</style>
