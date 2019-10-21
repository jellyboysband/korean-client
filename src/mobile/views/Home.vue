<template lang="pug">
article#home
  header.home-header
    form.search-field(@submit.prevent="onSearchSubmit")
      .search-icon-container
        VIcon.search-icon(icon="regular/search")
      input.search-input(
        v-model="searchText"
        placeholder="Поиск по товарам"
        type="search"
      )

    RouterLink.product-cart-link(
      :to="{ name: 'cart' }"
    )
      VIcon(icon="light/shopping-bag" square)
      span.product-cart-count(v-if="CartProductList.length") {{ CartProductList.length }}

  ul.promo-list
    li.promo-item(v-for="promo in promoList")
      a.promo-link
        img.promo-preview(:src="promo")

  //- ul.filter-list
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

  ul.product-list
    li.product-item(
      v-for="product in productListSearched"
      :key="product.id"
    )
      RouterLink.product-link(:to="{ name: 'product', params: { productId: product.id } }")
        section.product-card
          figure.product-preview-container
            img.product-preview(
              :alt="`Фотография продукта ${product.name}`"
              :src="product.avatarUrl"
            )
          main.product-info
            //- .product-sale -13%
            span.product-place {{ product.place }}
            h6.product-name {{ product.brand.name }} {{ product.name }}
            p.product-description {{ product.description }}
            p.product-price
              span.product-price-curr {{ product.price | number }} ₽
              //- span.product-price-prev {{ product.price | number }} ₽

</template>

<script>
import Fuse from 'fuse.js'
import { mapState } from 'vuex'

import promo1Image from '@/common/assets/images/promo/1.jpg'
import promo2Image from '@/common/assets/images/promo/2.jpg'
import promo3Image from '@/common/assets/images/promo/3.jpg'


const FILTER_TYPE_NEW = 'new'
const FILTER_TYPE_POPULAR = 'popular'
const FILTER_TYPE_SALE = 'sale'

export default {
  props: {
    typeId: {
      default: FILTER_TYPE_NEW,
      type: String,
    },
    brandId: {
      default: 0,
      type: Number,
    },
    search: {
      default: '',
      type: String,
    },
  },

  data() {
    return {
      promoList: [
        promo1Image,
        promo2Image,
        promo3Image,
      ],
      searchText: '',
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
      ].map(Object.freeze)),
    }
  },

  computed: {
    ...mapState('product', [
      'BrandList',
      'CartProductList',
      'ProductList',
    ]),

    productListFiltered() {
      return this.brandId
        ? this.ProductList.filter(it => it.brand.id === this.brandId)
        : this.ProductList
    },

    productListSearched() {
      const options = {
        shouldSort: true,
        findAllMatches: true,
        keys: [
          {
            name: 'name',
            weight: 0.4,
          },
          {
            name: 'brand.name',
            weight: 0.3,
          },
          {
            name: 'description',
            weight: 0.2,
          },
          {
            name: 'apply',
            weight: 0.1,
          },
        ],
      }
      const fuse = new Fuse(this.productListFiltered, options)

      return this.search
        ? fuse.search(this.search)
        : this.productListFiltered
    },
  },

  watch: {
    search: {
      handler(curr) {
        this.searchText = curr
      },
      immediate: true,
    },
  },

  methods: {
    onFilterClick(event) {
      event.target.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      })
    },

    onSearchSubmit() {
      this.$router.push({
        name: 'home',
        query: {
          ...(this.$route.name === 'home' && this.$route.query),
          search: this.searchText,
        },
      })
      // this.$router.replace({
      //   query: {
      //     ...this.$route.query,
      //     search: this.searchText,
      //   },
      // })
    },
  },
}
</script>

<style lang="stylus">
#home
  .home-header
    display grid
    gap $md
    grid-template-columns 1fr auto
    padding $xxl $md $md

    $field-height = 2.75rem

    .search-field
      background-color white
      border-radius $radius-md
      // box-shadow 0 0 1rem 0 #d9d9d9
      box-shadow $shadow-1
      display flex
      height $field-height
      position relative

      .search-icon-container
        align-items center
        display flex
        height $field-height
        justify-content center
        position absolute
        width $field-height

        .search-icon
          color $tc-3

      .search-input
        color #181818
        padding-left $field-height
        width 100%

    .product-cart-link
      align-items center
      background-color $secondary
      border-radius $radius-md
      box-shadow $shadow-1
      color $white
      display flex
      font-size $fs-xl
      height $field-height
      justify-content center
      position relative
      text-align center
      width $field-height

      .product-cart-count
        background-color $tertiary
        border-radius $radius-circle
        box-shadow $shadow-1
        font-size $fs-xxs
        font-weight $fw-semi-bold
        height 1rem
        position absolute
        right $xxs
        top $xxs
        width 1rem

  .promo-list
    display flex
    overflow-y auto
    padding $md
    scroll-behavior smooth
    scroll-margin $xs
    scroll-padding $xs
    scroll-padding-block $xs
    scroll-snap-stop always
    scroll-snap-type x mandatory
    scrollbar-width none

    &::-webkit-scrollbar
      display none

    &::after
      content ''
      flex none
      width $md

    .promo-item
      border-radius $radius-md
      box-shadow $shadow-1
      flex none
      overflow hidden
      scroll-snap-align center
      width 100%

      &:not(:first-child)
        margin-left $xs

      .promo-link
        display block

      .promo-preview
        display block
        height 140px
        object-fit cover
        width 100%

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

  .product-list
    display grid
    gap $md
    grid-template-columns repeat(auto-fill, minmax(200px, 1fr))
    padding $md $md $xxl
    scroll-behavior smooth

    .product-item
      .product-card
        background-color white
        border-radius $radius-md
        box-shadow $shadow-1
        overflow hidden
        position relative

        .product-preview-container
          border-radius $radius-md
          padding-top 100%
          position relative

          .product-preview
            bottom 0
            color $tc-3
            display block
            font-size $fs-xs
            height 100%
            left 0
            object-fit cover
            position absolute
            right 0
            top 0
            width 100%

        .product-info
          padding $sm
          position relative

          .product-sale
            background-color $secondary
            border-radius $radius-xs
            box-shadow $shadow-1
            color alpha($white, .87)
            font-size $fs-xs
            font-weight $fw-semi-bold
            padding $xxs $xs
            position absolute
            top $xs
            transform translateY(-100%)

          .product-place
            font-size $fs-xs
            font-weight $fw-semi-bold
            margin-bottom $xxs
            opacity .7

          .product-name
            font-size $fs-md
            font-weight $fw-semi-bold
            margin-bottom $xxs

          .product-description
            color $tc-2
            font-size $fs-xs
            line-height 1.25
            // margin-bottom $xxs

          .product-price
            margin-top $xs

            .product-price-curr
              font-size $fs-xl
              font-weight $fw-semi-bold

            .product-price-prev
              color $tc-3
              margin-left $xs
              text-decoration line-through
</style>
