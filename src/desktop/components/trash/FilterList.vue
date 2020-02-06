<template lang="pug">
ul.filter-list(v-if="!search")
  li.filter-item(
    v-for="type in typeList"
    :key="type.id"
    :class="{ active: type.id === typeId }"
    @click="onFilterClick"
  )
    RouterLink.filter-link(
      :to="{ query: { ...$route.query, type: type.id } }"
      replace
    ) {{ type.name }}
</template>

<script>
const FILTER_TYPE_NEW = 'new'
const FILTER_TYPE_POPULAR = 'popular'
const FILTER_TYPE_SALE = 'sale'

export default {
  data() {
    return {
      typeList: Object.freeze([
        {
          id: FILTER_TYPE_NEW,
          name: 'Новинки',
        },
        {
          id: FILTER_TYPE_POPULAR,
          name: 'Популярное',
        },
        {
          id: FILTER_TYPE_SALE,
          name: 'Распродажа',
        },
      ]),
    }
  },
}
</script>

<style lang="stylus">
.filter-list
  display flex
  overflow-y auto
  padding $md
  scroll-behavior smooth
  scrollbar-width none

  &::-webkit-scrollbar
    display none

  &::after
    content ''
    flex none
    width 1.25rem

  .filter-item
    color #87888b
    cursor pointer
    flex none
    font-size $fs-md
    font-weight 500
    position relative
    transition color .2s

    &:not(:first-child)
      margin-left 1.25rem

    &::after
      background-color $primary
      border-radius $radius-circle
      content ''
      display block
      height .25rem
      left 50%
      opacity 0
      position absolute
      top 110%
      transform translateX(-50%)
      transition opacity .2s
      width .25rem

    &.active
      // color $tc-1
      color #333

      &::after
        opacity 1
</style>
