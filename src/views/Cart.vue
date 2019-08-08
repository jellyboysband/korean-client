<template lang="pug">
  article#cart
    section.cart-body
      ul.cart-product-list
        li.cart-product-item(
          v-for="cartProduct in CartProductList"
          :key="cartProduct.product.id"
        )
          section.cart-product-container
            img.cart-product-preview(
              :src="cartProduct.product.avatarUrl"
            )
            p.cart-product-name {{ cartProduct.product.name }}
            button.cart-product-remove
              VIcon(icon="regular/trash")
            p.cart-product-price
              span.cart-product-price-curr {{ cartProduct.product.price | number }} ₽
              span.cart-product-price-prev {{ cartProduct.product.price | number }} ₽
            section.cart-product-count
              button.cart-product-count-decrement(@click="count = Math.max(1, count - 1)")
                VIcon(icon="light/minus")
              span.cart-product-count-value {{ cartProduct.count }}
              button.cart-product-count-increment(@click="count++")
                VIcon(icon="light/plus")

    footer.cart-footer

</template>

<script>
import { mapState } from 'vuex'


export default {
  computed: {
    ...mapState('product', [
      'CartProductList',
    ]),
  },
}
</script>

<style lang="stylus">
#cart
  .cart-product-container
    display grid
    grid-template-areas 'preview name remove' 'preview price count'

    .cart-product-preview
      grid-area preview

    .cart-product-name
      grid-area name

    .cart-product-remove
      grid-area remove
      margin-left auto

    .cart-product-price
      grid-area price

    .cart-product-count
      grid-area count
</style>
