<template lang="pug">
section.cart-product
  img.cart-product-preview(
    :src="product.avatarUrl"
  )

  header.cart-product-header
    RouterLink.cart-product-title(
      :to="{ name: 'product', params: { productId: cartProduct.productId } }"
    )
      span.cart-product-brand-name {{ product.brand.name }}
      |
      | —
      |
      span.cart-product-name {{ product.name }}
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
    ...mapGetters('shop', [
      'GetProduct',
    ]),

    product() {
      return this.GetProduct(this.cartProduct.productId)
    },

    extra() {
      return this.product?.extraList.find((it) => it.id === this.cartProduct.extraId)
    },
  },

  methods: {
    ...mapMutations('shop', [
      'RemoveCartProduct',
    ]),
  },
}
</script>

<style lang="stylus">
$product-preview-size = 4.5rem
$product-padding = $md
$product-gap = $md

.cart-product
  display grid
  gap 0 $product-gap
  grid-template-areas 'preview header' 'preview footer'
  grid-template-columns auto 1fr
  padding $product-padding

  .cart-product-preview

    grid-area preview
    height $product-preview-size
    width $product-preview-size

  .cart-product-header
    display flex
    grid-area header

  .cart-product-footer
    align-items center
    display flex
    grid-area footer

  .cart-product-title
    .cart-product-brand-name
      font-weight $fw-semi-bold

  .cart-product-remove
    $remove-size = 1.75rem

    align-items center
    // background-color white
    // border .25px solid $bc-1
    border-radius $radius-circle
    display flex
    height $remove-size
    justify-content center
    margin-left auto
    padding 0
    width $remove-size

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

    background-color white
    border 1px solid $bc-1

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
