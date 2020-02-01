<template lang="pug">
section.product-card
  figure.product-preview-container
    img.product-preview(
      :alt="`Фотография продукта ${product.name}`"
      :src="avatarUrl"
    )
  main.product-info
    //- .product-sale -13%
    span.product-place {{ product.place }}
    h6.product-title
      span.product-brand-name {{ brand.name }}
      |
      | —
      |
      span.product-name {{ product.name }}
    p.product-categories {{ categoryList.map(it => it.name.trim()).join(', ').toLowerCase() }}
    p.product-price
      span.product-price-curr {{ priceMin | number }} ₽
</template>

<script>
import { mapGetters } from 'vuex'

import Product from '@/common/models/Product'


export default {
  props: {
    product: {
      required: true,
      type: Product,
    },
  },

  computed: {
    ...mapGetters('product', [
      'GetBrand',
      'GetCategory',
    ]),

    avatarUrl() {
      return this.product.extraList[0].avatarUrl
    },

    brand() {
      return this.GetBrand(this.product.brandId)
    },

    categoryList() {
      return this.product.categoryIdList.map(this.GetCategory)
    },

    priceMin() {
      return Math.min(...this.product.extraList.map((it) => it.price))
    },
  },
}
</script>

<style lang="stylus">
.product-card
  background-color white
  box-shadow $shadow-1
  display flex
  flex-direction column
  height 100%
  overflow hidden
  position relative

  .product-preview-container
    padding-top 100%
    pointer-events none
    position relative
    user-select none

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
    display flex
    flex auto
    flex-direction column
    padding $sm
    position relative

    .product-sale
      background-color $secondary
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

    .product-categories
      color $tc-2
      font-size $fs-xs
      line-height 1.25
      margin-bottom $xs

    .product-price
      margin-top auto

      .product-price-curr
        font-size $fs-xl
        font-weight $fw-semi-bold

      .product-price-prev
        color $tc-3
        margin-left $xs
        text-decoration line-through
</style>
