<template lang="pug">
nav#navigation
  ul.navigation-list(
    v-for="navigation in navigationList"
  )
    li.navigation-item
      RouterLink.navigation-link.active(
        :to="navigation.route"
      ) {{ navigation.text }}
</template>

<script>
export default {
  data() {
    return {
      navigationList: [
        {
          route: { name: 'home' },
          text: 'test',
        },
      ],
    }
  },
}
</script>

<style lang="stylus">
@import '~@/common/assets/styles/mixins.styl'

#navigation
  container()

  background-color $primary

  .navigation-list
    display flex

    .navigation-item
      .navigation-link
        color white
        display block
        padding .75rem 1.5rem

        &.active:not(:hover)
          background-color white
          color $tc-1

        &:hover
          background-color darken($primary, 10%)
</style>
