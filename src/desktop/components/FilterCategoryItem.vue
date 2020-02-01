<template lang="pug" functional>
section.filter-category-item(
  :style=`{
    '--deep': props.node.deep
  }`
  v-bind="attrs"
  v-on="listeners"
) {{ props.category.name }}
</template>

<script>
import Category from '@/common/models/Category'


export default {
  functional: true,

  props: {
    category: {
      required: true,
      type: Category,
    },
    node: {
      required: true,
      type: Object,
    },
  },
}
</script>

<style lang="stylus">
// .filter-category-item
//   cursor pointer
//   padding .25rem .5rem
//   padding-left calc(var(--deep) * 1.25rem - .5rem)
//   user-select none
</style>
