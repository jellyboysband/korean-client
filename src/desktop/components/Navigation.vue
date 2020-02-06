<template lang="pug">
nav#navigation
  ul.navigation-list
    li.navigation-item(
      v-for="navigation in navigationList"
    )
      RouterLink.navigation-link(
        :to="navigation.route"
      ) {{ navigation.text }}
</template>

<script>
import { mapState } from 'vuex'


export default {
  computed: {
    ...mapState('shop', [
      'CategoryList',
    ]),

    navigationList() {
      return this.CategoryList
        .filter((category) => category.parentId === null)
        .map((category) => ({
          route: { name: 'home', query: { categoryId: category.id } },
          text: category.name,
        }))
        .slice(0, 5)
    },
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
        font-weight $fw-semi-bold

        &.active:not(:hover)
          background-color white
          color $tc-1

        &:hover
          background-color darken($primary, 10%)
</style>
