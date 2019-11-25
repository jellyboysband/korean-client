<template lang="pug">
article#home
  //- ul.promo-list
    li.promo-item(v-for="promo in promoList")
      a.promo-link
        img.promo-preview(:src="promo")

  //- ul.filter-list(v-if="!search")
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
            h6.product-title
              span.product-brand-name {{ product.brand.name }}
              |
              | —
              |
              span.product-name {{ product.name }}
            p.product-tags {{ product.tagList.map(it => it.name.trim()).join(', ').toLowerCase() }}
            p.product-price
              span.product-price-curr {{ Math.min(product.extraList.map(it => it.price)) | number }} ₽
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
            weight: 0.3,
          },
          {
            name: 'brand.name',
            weight: 0.3,
          },
          {
            name: 'tagList.name',
            weight: 0.2,
          },
          {
            name: 'description',
            weight: 0.1,
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

  methods: {
    onFilterClick(event) {
      event.target.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      })
    },
  },
}
</script>

<style lang="stylus">
@import '~@/common/assets/styles/mixins.styl'

#home
  container()

  padding-bottom $xxl
  padding-top $xxl

  .promo-list
    display flex
    overflow hidden

    .promo-item
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
        height 300px
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
    grid-template-columns repeat(auto-fill, minmax(250px, 1fr))
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

          .product-title
            font-size $fs-md
            margin-bottom $xxs

            .product-brand-name
              font-weight $fw-semi-bold

          .product-tags
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
