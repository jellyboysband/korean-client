<template lang="pug">
  article#cart
    header.cart-header
      h1.cart-title Корзина покупок

      a.cart-close(@click="() => $router.back()")
        VIcon(icon="light/times")

    main.cart-body
      ul.cart-product-list(v-if="CartProductList.length")
        li.cart-product-item(
          v-for="cartProduct in CartProductList"
          :key="cartProduct.product.id"
        )
          section.cart-product-container
            img.cart-product-preview(
              :src="cartProduct.product.avatarUrl"
            )

            header.cart-product-header
              router-link.cart-product-name(
                :to="{ name: 'product', params: { productId: cartProduct.product.id } }"
              ) {{ cartProduct.product.name }}
              button.cart-product-remove(
                @click="RemoveCartProduct(cartProduct)"
              )
                VIcon(icon="regular/trash")

            footer.cart-product-footer
              p.cart-product-price
                span.cart-product-price-curr {{ cartProduct.product.price | number }} ₽
                span.cart-product-price-prev {{ cartProduct.product.price | number }} ₽

              section.cart-product-count
                button.cart-product-count-decrement(@click="cartProduct.count = Math.max(1, cartProduct.count - 1)")
                  VIcon(icon="light/minus")
                span.cart-product-count-value {{ cartProduct.count }}
                button.cart-product-count-increment(@click="cartProduct.count++")
                  VIcon(icon="light/plus")

      p.cart-product-list-empty(v-else) Ваша корзина пуста

    hr.cart-separator

    footer.cart-footer
      p.cart-amount
        span.cart-amount-text Сумма заказа:
        span.cart-amount-value {{ cartAmount | number }} ₽
      label.cart-user-phone-label Контактный телефон:
      input.cart-user-phone(
        v-model="phone"
        autocomplete
        inputmode="tel"
        placeholder="+7 (900) 000 00-00"
        type="tel"
      )
      button.cart-buy(
        :disabled="!CartProductList.length"
      ) Оформить заказ

</template>

<script>
import { mapState, mapMutations } from 'vuex'


export default {
  data() {
    return {
      phone: '',
    }
  },

  computed: {
    ...mapState('product', [
      'CartProductList',
    ]),

    cartAmount() {
      return this.CartProductList.reduce((acc, curr) => acc + curr.count * curr.product.price, 0)
    },
  },

  methods: {
    ...mapMutations('product', [
      'AddCartProduct',
      'RemoveCartProduct',
    ]),
  },
}
</script>

<style lang="stylus">
$product-preview-size = 4.5rem
$product-padding = $md
$product-gap = $md

#cart
  position relative

  container()

  .cart-header
    align-items center
    background-color white
    box-shadow $shadow-2
    display flex
    height 3.5rem
    padding 0 $md
    position sticky
    top 0
    z-index $z-header

    .cart-title
      font-size $fs-md

    .cart-close
      font-size $fs-xl
      margin-left auto
      padding $xs

  .cart-body
    .cart-product-list-empty
      font-size $fs-lg
      padding $xxl $md
      text-align center

    .cart-product-item
      position relative

      &:not(:last-child)::before
        background-color $bc-1
        bottom 0
        content ''
        height .75px
        left $product-preview-size + $md + $md
        position absolute
        right 0

    .cart-product-container
      display grid
      gap 0 $product-gap
      grid-template-areas 'preview header' 'preview footer'
      grid-template-columns auto 1fr
      padding $product-padding

      .cart-product-preview
        border-radius $radius-xs
        grid-area preview
        height $product-preview-size
        width $product-preview-size

      .cart-product-header
        align-items center
        display flex
        grid-area header

      .cart-product-footer
        align-items center
        display flex
        grid-area footer

      .cart-product-remove
        $remove-size = 1.75rem

        align-items center
        background-color white
        border .25px solid $bc-1
        border-radius $radius-circle
        display flex
        height $remove-size
        justify-content center
        margin-left auto
        padding 0
        width $remove-size

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
        border .75px solid $bc-1
        border-radius $radius-sm
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

  .cart-separator
    border-top .75px solid $bc-1

  .cart-footer
    padding $md

    .cart-amount
      align-items baseline
      display flex
      margin-bottom $sm

      .cart-amount-text
        font-size $fs-sm
        font-weight $fw-normal

      .cart-amount-value
        font-size $fs-xl
        font-weight $fw-semi-bold
        margin-left auto

    .cart-user-phone-label
      color $tc-2
      display block
      font-size $fs-sm
      margin-bottom $xxs

    .cart-user-phone
      background-color white
      border .75px solid $bc-1
      border-radius $radius-md
      height 2.75rem
      padding 0 $sm
      width 100%

    .cart-buy
      background-color $tertiary
      border-radius $radius-md
      box-shadow $shadow-1
      color white
      display block
      font-weight $fw-medium
      height 2.75rem
      margin $md auto 0
      padding 0 $xxl
      transition background-color .2s ease-out
      user-select none
      width 100%

      &:active
        background-color darken($tertiary, 10%)

      &:disabled
        background-color lighten($tertiary, 10%)
        box-shadow none
</style>
