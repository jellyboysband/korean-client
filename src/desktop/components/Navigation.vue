<template lang="pug">
nav#navigation
  ul.navigation-list(
    v-for="navigation in navigationList"
  )
    li.navigation-item
      RouterLink.navigation-link(
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

  background-color blue

  .navigation-list
    display flex

    .navigation-item
      .navigation-link
        background-color green
        display block
        padding .75rem 1.5rem
</style>
