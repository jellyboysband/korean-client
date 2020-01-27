<template lang="pug">
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
        span.product-price-curr {{ priceMin | number }} ₽
        //- span.product-price-prev {{ product.price | number }} ₽
</template>

<script>
import Product from '@/common/models/Product'


export default {
  props: {
    product: {
      required: true,
      type: Product,
    },
  },

  computed: {
    priceMin() {
      return Math.min(...this.product.extraList.map((it) => it.price))
    },
  },
}
</script>

<style lang="stylus">
.product-card
  background-color white
  border-radius $radius-md
  box-shadow $shadow-1
  display flex
  flex-direction column
  height 100%
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
    display flex
    flex auto
    flex-direction column
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
