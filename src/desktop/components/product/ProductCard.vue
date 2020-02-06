<template lang="pug">
section.product-card
  figure.product-preview-container
    img.product-preview(
      :alt="`Фотография продукта ${product.name}`"
      :src="avatarUrl"
      loading="lazy"
    )

    //- ul.product-action-list
      li.product-action-item
        button.product-action
          VIcon(
            icon="light/eye"
          )
      li.product-action-item
        button.product-action(
          @click.prevent.stop
        )
          VIcon(
            icon="light/heart"
          )
      li.product-action-item
        button.product-action(
          @click.prevent.stop
        )
          VIcon(
            icon="light/shopping-bag"
          )

  .product-info
    p.product-brand-name {{ brand.name }}
    p.product-name {{ product.name }}

    hr.separator

    .product-additional
      p.product-categories {{ categoryList.map(it => it.name.trim()).join(', ').toLowerCase() }}
      p.product-price
        span.product-price-curr {{ priceMin | number }}&nbsp;₽
</template>

<script>
import { mapGetters } from 'vuex'

import Product from '@/common/shop/models/Product'


export default {
  props: {
    product: {
      required: true,
      type: Product,
    },
  },

  computed: {
    ...mapGetters('shop', [
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

<style lang="stylus" scoped>
// 3.375
.product-card
  display flex
  flex-direction column
  height 100%

  &:hover
    .product-action-list
      opacity 1

.product-preview-container
  padding-top 100%
  position relative
  user-select none

  .product-preview
    bottom 0
    color $tc-3
    display block
    filter contrast(.91) saturate(1.1)
    font-size $fs-xs
    height 100%
    left 0
    object-fit cover
    pointer-events none
    position absolute
    right 0
    top 0
    width 100%

  .product-action-list
    align-items center
    bottom 0
    display flex
    justify-content center
    left 0
    opacity 0
    position absolute
    right 0
    top 0

    .product-action-item:not(:first-child)
      margin-left .2rem

    .product-action
      align-items center
      background-color white
      box-shadow $shadow-1
      display flex
      font-size $fs-xxl
      height 3.375rem
      justify-content center
      padding 0
      width 3.375rem

      &:hover
        background-color #f5989d
        color white

.separator
  border-top 1px solid #d7d7d7
  margin .5rem 0

.product-info
  display flex
  flex auto
  flex-direction column
  padding 1rem 0 .5rem
  position relative

  .product-brand-name
    serif()

    color #f5989d
    font-size $fs-sm
    font-style italic

  .product-name
    serif()

    font-size $fs-lg
    margin-bottom auto
    transition color .25s ease-in-out

    &:hover
      color #f5989d

.product-additional
  align-items baseline
  display flex

  .product-price
    color $tc-2
    font-size $fs-sm
    margin-left auto
    white-space nowrap

  .product-categories
    color $tc-2
    font-size $fs-sm
    margin-right 1rem
</style>
