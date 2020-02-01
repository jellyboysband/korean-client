<template lang="pug">
section.cart-product
  img.cart-product-preview(
    :src="avatarUrl"
  )

  header.cart-product-header
    RouterLink.cart-product-title(
      :to="{ name: 'product', params: { productId: cartProduct.productId } }"
      :title="`${brand.name} — ${product.name}`"
    )
      p.cart-product-brand-name {{ brand.name }}
      p.cart-product-name {{ product.name }}
    button.cart-product-remove(
      @click="RemoveCartProduct(cartProduct)"
    )
      VIcon(icon="regular/trash")

  footer.cart-product-footer
    p.cart-product-volume(v-if="extra.volume") {{ extra.volume | number }} ml
    p.cart-product-weight(v-if="extra.weight") {{ extra.weight | number }} g
    p.cart-product-price {{ extra.price | number }} ₽
      //- span.cart-product-price-curr {{ extra.price | number }} ₽
      //- span.cart-product-price-prev {{ product.price | number }} ₽

    section.cart-product-count
      button.cart-product-count-decrement(@click="cartProduct.count = Math.max(1, cartProduct.count - 1)")
        VIcon(icon="light/minus")
      span.cart-product-count-value {{ cartProduct.count }}
      button.cart-product-count-increment(@click="cartProduct.count++")
        VIcon(icon="light/plus")
</template>

<script>
import {
  mapGetters,
  mapMutations,
} from 'vuex'


export default {
  props: {
    cartProduct: {
      required: true,
      type: Object,
    },
  },

  computed: {
    ...mapGetters('product', [
      'GetBrand',
      'GetProduct',
    ]),

    avatarUrl() {
      return this.extra.avatarUrl
    },

    brand() {
      return this.GetBrand(this.product.brandId)
    },

    extra() {
      return this.product?.extraList.find((it) => it.id === this.cartProduct.extraId)
    },

    product() {
      return this.GetProduct(this.cartProduct.productId)
    },
  },

  methods: {
    ...mapMutations('product', [
      'RemoveCartProduct',
    ]),
  },
}
</script>

<style lang="stylus">
$product-preview-size = 6.5rem
$product-padding = 1rem
$product-gap = 1rem

.cart-product
  background-color white
  box-shadow $shadow-1
  display grid
  // gap 0 $product-gap
  grid-template-areas 'preview header' 'preview footer'
  grid-template-columns max-content 1fr

  // grid-template-rows 1fr 1fr
  // padding $product-padding
  .cart-product-preview
    grid-area preview
    height $product-preview-size
    width $product-preview-size

  .cart-product-header
    align-items flex-start
    display flex
    grid-area header
    min-width 0
    padding $product-padding
    padding-bottom 0

  .cart-product-footer
    align-items flex-end
    display flex
    grid-area footer
    padding $product-padding
    padding-top 0

  .cart-product-title
    margin-right 1rem
    overflow hidden

    .cart-product-brand-name
      font-size $fs-xs
      font-weight $fw-semi-bold

    .cart-product-name
      overflow hidden
      text-overflow ellipsis
      white-space nowrap

  .cart-product-remove
    $remove-size = 1.75rem

    align-items center
    // background-color white
    // border .25px solid $bc-1
    border-radius $radius-circle
    display flex
    flex none
    // height $remove-size
    justify-content center
    margin-left auto
    // width $remove-size
    padding 0

  .cart-product-volume
  .cart-product-weight
  .cart-product-price
    font-size $fs-sm
    font-weight $fw-semi-bold
    margin-right .5rem

  .cart-product-price
    .cart-product-price-curr
      font-size $fs-sm
      font-weight $fw-semi-bold

    .cart-product-price-prev
      color $tc-3
      font-size $fs-xs
      margin-left $xs
      text-decoration line-through

  .cart-product-count
    $count-item-size = 1.75rem

    background-color $white
    border .05rem solid $bc-1
    display flex
    grid-area count
    margin-left auto
    overflow hidden
    width $count-item-size * 3

    .cart-product-count-value
    .cart-product-count-increment
    .cart-product-count-decrement
      align-items center
      display flex
      height $count-item-size
      justify-content center
      text-align center
      transition all .2s
      width $count-item-size

    .cart-product-count-value
      font-size $fs-md

    .cart-product-count-increment
    .cart-product-count-decrement
      color $tc-2
      font-size $fs-xs

      &:active
        background-color alpha($primary, .2)
</style>
