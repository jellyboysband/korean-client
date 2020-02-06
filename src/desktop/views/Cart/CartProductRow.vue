<template lang="pug">
tr.tr.cart-product-row
  td.td.cart-product-preview-column
    img.cart-product-preview(
      :src="avatarUrl"
    )

  td.td
    RouterLink.cart-product-title(
      :to="{ name: 'product', params: { productId: cartProduct.productId } }"
    )
      p.cart-product-brand-name {{ brand.name }}
      p.cart-product-name {{ product.name }}
      p.cart-product-volume(v-if="extra.volume") {{ extra.volume | number }} ml
      p.cart-product-weight(v-if="extra.weight") {{ extra.weight | number }} g

  td.td
    p.cart-product-price {{ extra.price | number }} ₽

  td.td
    section.cart-product-count
      button.cart-product-count-decrement(@click="cartProduct.count = Math.max(1, cartProduct.count - 1)")
        VIcon(icon="light/minus")
      span.cart-product-count-value {{ cartProduct.count }}
      button.cart-product-count-increment(@click="cartProduct.count++")
        VIcon(icon="light/plus")

  td.td
    p.cart-product-price {{ extra.price * cartProduct.count | number }} ₽

  td.td
    button.cart-product-remove(
      @click="RemoveCartProduct(cartProduct)"
    )
      VIcon(icon="light/times")
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
      'GetBrand',
      'GetExtra',
      'GetProduct',
    ]),

    avatarUrl() {
      return this.extra.avatarUrl
    },

    brand() {
      return this.GetBrand(this.product.brandId)
    },

    extra() {
      return this.GetExtra(this.cartProduct.extraId)
    },

    product() {
      return this.GetProduct(this.cartProduct.productId)
    },
  },

  methods: {
    ...mapMutations('shop', [
      'RemoveCartProduct',
    ]),
  },
}
</script>

<style lang="stylus" scoped>
$product-preview-size = 9rem
$product-padding = 1rem
$product-gap = 1rem

.cart-product-preview-column
  height $product-preview-size
  padding .5rem 1rem
  width $product-preview-size

.cart-product-title
  display block
  margin-right 1rem
  overflow hidden

  .cart-product-brand-name
    serif()

    color #f5989d
    font-size $fs-sm
    font-style italic

.cart-product-remove
  $remove-size = 1.75rem

  align-items center
  // background-color white
  // border .25px solid $bc-1
  border-radius $radius-circle
  color $tc-2
  display flex
  flex none
  // height $remove-size
  justify-content center
  margin-left auto
  // width $remove-size
  padding 0

  &:hover
    color $tc-1

.cart-product-volume
.cart-product-weight
.cart-product-price
  color $tc-2
  font-size $fs-sm

.cart-product-price
  .cart-product-price-curr
    font-size $fs-sm
    // font-weight $fw-semi-bold

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
  overflow hidden
  width $count-item-size * 3

  .cart-product-count-value
  .cart-product-count-increment
  .cart-product-count-decrement
    align-items center
    color $tc-2
    display flex
    height $count-item-size
    justify-content center
    transition all .2s
    width $count-item-size

  .cart-product-count-value
    font-size $fs-sm

  .cart-product-count-increment
  .cart-product-count-decrement
    font-size $fs-xs

    &:active
      background-color alpha($primary, .2)
</style>
