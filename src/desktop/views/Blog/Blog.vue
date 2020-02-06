<template lang="pug">
article#blog
  section.body
    //- .level
      .post-count Показаны {{ 1 }}–{{ 8 }} результатов

      .post-order
        select.post-order-select
          option Sort by newness
          option Sort by popularity
          option Sort by average rating
          option Sort by newness
          option Sort by price: low to high
          option Sort by price: high to low

    ul.post-list
      li.post-item(
        v-for="post in postList"
        :key="post.id"
      )
        RouterLink.post-link(
          :to="{ name: 'post', params: { postId: post.id } }"
        )
          PostCard(
            :post="post"
          )

    Pagination.post-pagination(
      :current="page"
      :total="pageTotal"
    )

  aside.aside
    section.filter-search.filter-container
      form.search-form(
        @submit.prevent="onSearchSubmit"
      )
        .search-input-container
          input.search-input(
            placeholder="Поиск"
            v-model="searchText"
          )
          VIcon.search-icon(
            icon="light/search"
          )

    section.filter-category.filter-container
      h4.filter-title Категории

      ul.category-bread-crumbs-list(
        v-if="categoryParentList.length > 1"
      )
        li.category-bread-crumbs-item(
          v-for="category in categoryParentList"
          :key="category.id"
        )
          RouterLink.category-link(
            :to="{ name: 'blog', query: { ...$route.query, categoryId: category.id } }"
          ) {{ category.name }}

      ul.category-list
        //- li.category-item(
        //-   v-if="categorySelected !== undefined"
        //-   :key="categorySelected.id"
        //- )
        //-   RouterLink.category-link.selected(
        //-     :to="{ name: 'blog', query: { ...$route.query, categoryId: categorySelected.parentId, page: undefined } }"
        //-   ) ‹ {{ categorySelected.name }}

        li.category-item(
          v-for="category in categoryList"
          :key="category.id"
        )
          RouterLink.category-link(
            :to="{ name: 'blog', query: { ...$route.query, categoryId: category.id, page: undefined } }"
            :class="{ selected: category.id === categoryId }"
          ) {{ category.name }}

</template>

<script>
import { mapState } from 'vuex'
import Fuse from 'fuse.js'

// import FilterCategory from '@/desktop/components/FilterCategory.vue'
import Pagination from '@/desktop/components/Pagination.vue'
import PostCard from '@/desktop/components/post/PostCard.vue'

const perPage = 24

export default {
  components: {
    // FilterCategory,
    PostCard,
    Pagination,
  },

  props: {
    categoryId: {
      required: true,
      type: Number,
    },

    page: {
      required: true,
      type: Number,
    },

    search: {
      required: true,
      type: String,
    },
  },

  data() {
    return {
      searchText: '',
    }
  },

  computed: {
    ...mapState('blog', [
      'CategoryList',
      'PostList',
    ]),

    categorySelected() {
      return this.CategoryList.find((category) => category.id === this.categoryId)
    },

    categoryParentList() {
      const categoryList = []
      const findCategory = (categoryId) => {
        const category = this.CategoryList.find((it) => it.id === categoryId)
        if (category) {
          categoryList.unshift(category)
          findCategory(category.parentId)
        } else {
          categoryList.unshift({ id: 0, name: 'Все категории' })
        }
      }
      findCategory(this.categoryId)
      return categoryList
    },

    categoryList() {
      const parent = this.categoryParentList.slice().pop()
      const categoryList = this.CategoryList.filter((category) => category.parentId === this.categoryId)
      const categoryListByParent = this.CategoryList.filter((category) => category.parentId === parent.parentId)

      return categoryList.length
        ? categoryList
        : categoryListByParent
    },

    postListFiltered() {
      return this.PostList
        |> ((_) => this.getPostListByCategoryId(_, this.categoryId))
        |> ((_) => this.getPostListBySearch(_, this.search))
    },

    pageTotal() {
      return Math.ceil((this.postListFiltered?.length || 1) / perPage)
    },

    postList() {
      return this.postListFiltered
        |> ((_) => this.getPostListByPage(_, this.page, perPage))
    },
  },

  watch: {
    '$route.query.search': {
      handler(curr) {
        this.searchText = curr
      },
      immediate: true,
    },
  },

  methods: {
    getPostListByCategoryId(postList, categoryId = 0) {
      return categoryId !== 0
        ? postList.filter((post) => post.categoryId === categoryId)
        : postList
    },

    getPostListByPage(postList, page = 1, count = 1) {
      return postList.slice((page - 1) * count, page * count)
    },

    getPostListBySearch(postList, searchText = '') {
      const options = {
        shouldSort: true,
        tokenize: true,
        threshold: 0.2,
        keys: ['name', 'description', 'content'],
      }

      const searchEngine = new Fuse(postList, options)

      return this.search !== ''
        ? searchEngine.search(searchText)
        : postList
    },

    onSearchSubmit() {
      this.$router.push({
        query: {
          ...this.$route.query,
          page: undefined,
          search: this.searchText,
        },
      })
    },
  },
}
</script>

<style lang="stylus" scoped>
#blog
  container()

  display flex
  padding-bottom 5rem
  padding-top 5rem

  .aside
    flex none
    margin-left 4rem
    width 18rem

  .body
    flex auto

.filter-container
  margin-bottom 3rem

  .filter-title
    serif()

    font-size $fs-xxxl
    margin-bottom .75rem

.category-bread-crumbs-list
  display flex
  flex-wrap wrap
  margin-bottom .75rem

  .category-bread-crumbs-item
    &:not(:last-child)::after
      color $tc-3
      content '›'
      margin .5rem

    .category-link
      font-weight 300
      white-space nowrap

      &:hover
        color #f5989d

.category-list
  .category-item
    &:not(:first-child)
      margin-top .5rem

    .category-link
      color $tc-2
      font-weight 300

      &.selected
        color $tc-1
        font-weight 400

      &:hover
        color $tc-1
        text-decoration underline

.level
  align-items center
  display flex

.post-order
  .post-order-select
    border 1px solid #d7d7d7
    cursor pointer
    display block
    height 3rem
    padding 0 2rem 0 1rem
    user-select none

.search-input-container
  border-bottom 1px solid #d7d7d7
  position relative

  .search-input
    font-size $fs-sm
    height 3rem
    letter-spacing .1em
    padding-right 2rem
    width 100%

    // font-weight 300
    &:placeholder
      color $tc-2

  .search-icon
    color $tc-1
    pointer-events none
    position absolute
    right .25rem
    top 50%
    transform translateY(-50%)
    user-select none

.post-list
  display grid
  gap 2rem
  grid-template-columns repeat(auto-fill, minmax(250px, 1fr))
  scroll-behavior smooth

  .post-item
    .post-link
      display block
      height 100%

.post-pagination
  margin-top 3rem
</style>
