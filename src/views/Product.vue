<template lang="pug">
  article#product(v-if="product")
    figure.product-preview-container
      img.product-preview(
        :alt="`Фотография продукта ${product.name}`"
        :src="product.avatarUrl"
      )

    a.router-back(@click="() => $router.back()")
      VIcon(icon="light/long-arrow-left")

    main.product-body
      section.product-info
        h2.product-title
          span.product-brand {{ product.brand.name }}
          | &nbsp;
          span.product-name {{ product.name }}

        p.product-description {{ product.description }}

      section.product-apply
        h3.product-apply-title Способ применения
        p.product-apply-text {{ product.apply }}

      section.product-buy-container
        button.product-buy
          VIcon(icon="light/shopping-bag" square)
        p.product-price {{ product.price | number }} ₽

</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    productId: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
    }
  },

  computed: {
    ...mapGetters('product', ['GetProduct']),

    product() {
      return this.GetProduct(this.productId)
    },
  },
}
</script>

<style lang="stylus">
#product
  background-color $white
  display grid
  position relative

  @media (min-width: 600px)
    grid-template-columns 2fr 3fr
    padding 1.75rem 1.25rem 1rem

  .router-back
    color $white
    font-size 2rem
    left 1.25rem
    position absolute
    // filter drop-shadow(0 1px 2px black)
    top 2rem
    z-index $z-header

    @media (min-width: 600px)
      display none

  .product-preview-container
    border-radius $radius-md
    padding-top 100%
    position relative

    .product-preview
      color $tc-3
      display block
      font-size $fs-xs
      object-fit cover
      position absolute

    .product-preview
      bottom 0
      color $tc-3
      display block
      font-size $fs-xs
      height 100%
      left 0
      object-fit cover
      right 0
      top 0
      width 100%

  .product-body
    padding $md

    .product-info
      margin-bottom 1.25rem

      .product-title
        font-size $fs-lg
        font-weight $fw-semi-bold
        margin-bottom .5rem

      .product-description
        color $tc-2
        font-size $fs-sm

    .product-apply
      margin-bottom 1.25rem

      .product-apply-title
        font-size $fs-md
        font-weight $fw-semi-bold
        margin-bottom .5rem

      .product-apply-text
        color $tc-2
        font-size $fs-sm

    .product-buy-container
      align-items center
      display flex

      .product-buy
        background-color $secondary
        border-radius $radius-md
        color white
        font-size $fs-xxl
        // margin-left auto
        margin-right 1rem
        padding .75rem

      .product-price
        font-size $fs-xxl
        // margin-right auto
</style>
