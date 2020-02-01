<template lang="pug">
#app
  Header

  template(v-if="initialized")
    Navigation

    RouterView

  Footer

  Notifications

</template>

<script>
import { mapState } from 'vuex'

import Header from '@/desktop/components/Header.vue'
import Navigation from '@/desktop/components/Navigation.vue'
import Footer from '@/desktop/components/Footer.vue'


export default {
  components: {
    Header,
    Navigation,
    Footer,
  },

  computed: {
    ...mapState([
      'initialized',
    ]),
  },
}
</script>

<style lang="stylus">
html
  // background-color alpha($primary, .05)
  background-color hsla(210, 25%, 97%, 1)
  font-size 18px
  // overflow-x hidden
  // width 100%

#app
  display flex
  flex-direction column
  min-height 100vh
  position relative
  // width 100%
</style>
