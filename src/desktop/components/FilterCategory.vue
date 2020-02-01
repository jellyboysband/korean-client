<template lang="pug">
section.filter-category
  ul.filter-category-list
    TreeNode(
      v-for="node in nodeTree"
      :key="node.id"
      :node="node"
    )
      template(
        v-slot="{ node, node: { category } }"
      )
        .filter-category-item(
          :style=`{
            '--deep': node.deep
          }`
          @click.self="toggleOpenCategory(node.id)"
        )
          RouterLink.filter-link(
            :to="{ name: 'home', query: { categoryId: category.id } }"
          ) {{ category.name }}

          VIcon.filter-open-toggle(
            v-if="node.childrenList.length"
            :icon="`solid/caret-${categoryIdOpenList.includes(category.id) ? 'up' : 'down'}`"
          )

          //- FilterCategoryItem(
          //-   :category="categoryMap[node.id]"
          //-   :node="node"
          //-   @click="toggleOpenCategory(node.id)"
          //- )
</template>

<script>
import { mapState } from 'vuex'

import groupBy from '@/common/lib/groupBy'

// import Category from '@/common/models/Category'

import TreeNode from '@/desktop/components/TreeNode.vue'
import FilterCategoryItem from '@/desktop/components/FilterCategoryItem.vue'


export default {
  components: {
    TreeNode,
    FilterCategoryItem,
  },

  props: {
    categoryId: {
      default: 0,
      type: Number,
    },
  },

  data() {
    return {
      // categoryList: [
      //   new Category({ id: 1, name: 'Макияж' }),
      //   new Category({ id: 2, name: 'Волосы' }),
      //   new Category({ id: 3, name: 'Тело' }),
      //   new Category({ id: 4, name: 'Уход' }),

      //   new Category({ id: 5, name: 'Очищение', parentId: 4 }),
      //   new Category({ id: 6, name: 'Тонеры', parentId: 4 }),

      //   new Category({ id: 7, name: 'Шампуни', parentId: 2 }),
      //   new Category({ id: 8, name: 'Маски', parentId: 2 }),

      //   new Category({ id: 9, name: 'Кондиционер', parentId: 8 }),
      //   new Category({ id: 10, name: 'Филлер', parentId: 8 }),
      // ] |> Object.freeze,

      categoryIdOpenList: [2, 8],
    }
  },

  computed: {
    ...mapState('product', [
      'CategoryList',
    ]),

    // categoryTree() {
    //   const categoryListByParentId = groupBy(this.categoryList, 'parentId')
    //   const createCategoryTree = (categoryList) => categoryList.map((category) => ({
    //     ...category,
    //     childrenList: createCategoryTree(categoryListByParentId[category.id] ?? []),
    //   }))

    //   const categoryRootList = this.categoryList.filter((category) => category.parentId === undefined)
    //   const categoryTree = createCategoryTree(categoryRootList)

    //   return categoryTree
    // },

    // categoryNodeTree() {
    //   const { categoryIdOpenList } = this

    //   const categoryNodeTree = this.categoryTree.map((category) => ({
    //     category,
    //     node: {
    //       id: category.id,
    //       childrenList: category.childrenList,
    //       get isOpen() {
    //         return categoryIdOpenList.includes(this.id)
    //       },
    //     },
    //   }))

    //   return categoryNodeTree
    // },

    // categoryMap() {
    //   return this.CategoryList
    //     .map((category) => ([category.id, category]))
    //     |> Object.fromEntries
    //     |> Object.freeze
    // },

    nodeTree() {
      const { categoryIdOpenList } = this
      const categoryListByParentId = groupBy(this.CategoryList, 'parentId')
      const categoryRootList = this.CategoryList.filter((category) => category.parentId === null)

      const createNodeTree = (categoryList, deep = 1) => categoryList.map((category) => ({
        id: category.id,
        childrenList: createNodeTree(categoryListByParentId[category.id] ?? [], deep + 1),
        deep,
        category,

        get isOpen() {
          return categoryIdOpenList.includes(this.id)
        },
      }))

      const nodeTree = createNodeTree(categoryRootList)

      return nodeTree
    },
  },

  methods: {
    toggleOpenCategory(categoryId) {
      const index = this.categoryIdOpenList.indexOf(categoryId)
      if (~index) this.categoryIdOpenList.splice(index, 1)
      else this.categoryIdOpenList.push(categoryId)
    },
  },
}
</script>

<style lang="stylus">
.filter-category
  display block

  .filter-category-item
    align-items center
    cursor pointer
    display flex
    user-select none

    .filter-link
      font-weight $fw-semi-bold
      padding .25rem .5rem
      padding-left calc(var(--deep) * 1rem - .5rem)
      text-transform capitalize

      &.router-link-exact-active
        color $tertiary

    .filter-open-toggle
      margin-left auto
      padding .25rem .5rem
      pointer-events none
</style>
