<template lang="pug">
article#shop
  section.body
    //- .level
      .product-count Показаны {{ 1 }}–{{ 8 }} результатов

      .product-order
        select.product-order-select
          option Sort by newness
          option Sort by popularity
          option Sort by average rating
          option Sort by newness
          option Sort by price: low to high
          option Sort by price: high to low

    ul.product-list
      li.product-item(
        v-for="product in productList"
        :key="product.id"
      )
        RouterLink.product-link(
          :to="{ name: 'product', params: { productId: product.id } }"
        )
          ProductCard(
            :product="product"
          )

    Pagination.product-pagination(
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

    //- section.filter-price
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
            :to="{ name: 'shop', query: { ...$route.query, categoryId: category.id } }"
          ) {{ category.name }}

      //- FilterCategory

      ul.category-list
        //- li.category-item(
        //-   v-if="categorySelected !== undefined"
        //-   :key="categorySelected.id"
        //- )
        //-   RouterLink.category-link.selected(
        //-     :to="{ name: 'shop', query: { ...$route.query, categoryId: categorySelected.parentId, page: undefined } }"
        //-   ) ‹ {{ categorySelected.name }}

        li.category-item(
          v-for="category in categoryList"
          :key="category.id"
        )
          RouterLink.category-link(
            :to="{ name: 'shop', query: { ...$route.query, categoryId: category.id, page: undefined } }"
            :class="{ selected: category.id === categoryId }"
          ) {{ category.name }}

</template>

<script>
import { mapState } from 'vuex'
import Fuse from 'fuse.js'

// import FilterCategory from '@/desktop/components/FilterCategory.vue'
import Pagination from '@/desktop/components/Pagination.vue'
import ProductCard from '@/desktop/components/product/ProductCard.vue'

const perPage = 24

export default {
  components: {
    // FilterCategory,
    ProductCard,
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
    ...mapState('shop', [
      'BrandList',
      'CategoryList',
      'ProductList',
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

    productListFiltered() {
      return this.ProductList
        |> ((_) => this.getProductListByCategoryId(_, this.categoryId))
        |> ((_) => this.getProductListBySearch(_, this.BrandList, this.search))
    },

    pageTotal() {
      return Math.ceil((this.productListFiltered?.length || 1) / perPage)
    },

    productList() {
      return this.productListFiltered
        |> ((_) => this.getProductListByPage(_, this.page, perPage))
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
    getProductListByCategoryId(productList, categoryId = 0) {
      return categoryId !== 0
        ? productList.filter((product) => product.categoryIdList.includes(categoryId))
        : productList
    },

    getProductListByPage(productList, page = 1, count = 1) {
      return productList.slice((page - 1) * count, page * count)
    },

    getProductListBySearch(productList, brandList, searchText = '') {
      const options = {
        shouldSort: true,
        tokenize: true,
        threshold: 0.2,
        keys: ['name', 'brand.name'],
      }

      const productListWithBrand = productList.map((product) => ({
        ...product,
        brand: brandList.find((brand) => brand.id === product.brandId),
      }))

      const searchEngine = new Fuse(productListWithBrand, options)

      return this.search !== ''
        ? searchEngine.search(searchText)
        : productList
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
#shop
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

.product-order
  .product-order-select
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

.product-list
  display grid
  gap 2rem
  grid-template-columns repeat(auto-fill, minmax(250px, 1fr))
  scroll-behavior smooth

  .product-item
    .product-link
      display block
      height 100%

.product-pagination
  margin-top 3rem
</style>
