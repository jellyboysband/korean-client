<template lang="pug">
nav.pagination
  ul.pagination-list
    li.pagination-item.prev
      RouterLink.pagination-link(
        :class="{ disabled: current <= 1 }"
        :to="{ query: { ...$route.query, page: current - 1 } }"
      )
        VIcon(
          icon="light/chevron-left"
        )

    li.pagination-item(
      v-for="page in total"
    )
      RouterLink.pagination-link(
        :class="{ active: page === current }"
        :to="{ query: { ...$route.query, page } }"
      ) {{ page }}

    li.pagination-item.next
      RouterLink.pagination-link(
        :class="{ disabled: current >= total }"
        :to="{ query: { ...$route.query, page: current + 1 } }"
      )
        VIcon(
          icon="light/chevron-right"
        )
</template>

<script>
export default {
  props: {
    current: {
      required: true,
      type: Number,
    },

    total: {
      required: true,
      type: Number,
    },
  },
}
</script>

<style lang="stylus" scoped>
.pagination-list
  align-items center
  display flex
  justify-content center

.pagination-item
  margin 0 .25rem

  &.prev
    margin-right auto

  &.next
    margin-left auto

.pagination-link
  color $tc-2
  display block
  padding 0 .25rem

  &.active
    color $tc-1
    text-decoration underline

  &.disabled
    color $tc-3
    opacity 0
    pointer-events none
</style>
