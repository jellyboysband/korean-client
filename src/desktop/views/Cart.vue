<template lang="pug">
article#cart
  main.cart-body
    ul.cart-product-list(v-if="CartProductList.length")
      li.cart-product-item(
        v-for="cartProduct in CartProductList"
        :key="cartProduct.productId"
      )
        CartProduct(
          :cartProduct="cartProduct"
        )

    .cart-product-list-empty(v-else)
      p Ваша корзина пуста
      RouterLink.cart-product-list-empty-back(:to="{ name: 'home' }") Вернуться к покупкам

  hr.cart-separator

  footer.cart-footer
    form.cart-form(
      @submit.prevent="createOrder"
    )
      p.cart-amount
        span.cart-amount-text Сумма заказа:
        span.cart-amount-value {{ cartAmount | number }} ₽
      label.cart-user-phone-label Контактный телефон:
      input.cart-user-phone(
        v-model="phone"
        autocomplete
        inputmode="tel"
        placeholder="+7(900)000-00-00"
        type="tel"
      )
      button.cart-buy(
        :disabled="!CartProductList.length || !phone"
        type="submit"
      ) Оформить заказ

</template>

<script>
import {
  mapState,
  mapGetters,
  mapActions,
} from 'vuex'

import CartProduct from '@/desktop/components/CartProduct.vue'


export default {
  components: {
    CartProduct,
  },

  data() {
    return {
      phone: '',
    }
  },

  computed: {
    ...mapState('product', [
      'CartProductList',
    ]),

    ...mapGetters('product', [
      'GetExtra',
    ]),

    cartAmount() {
      return this.CartProductList.reduce((acc, curr) => acc + curr.count * this.GetExtra(curr.extraId).price, 0)
    },
  },

  methods: {
    ...mapActions('product', [
      'CreateOrder',
    ]),

    createOrder() {
      this.CreateOrder({ phone: this.phone })
        .then((orderId) => this.$router.push({
          name: 'order',
          params: {
            orderId,
          },
        }))
        .catch(() => this.$notify({
          title: 'Не удалось сформировать заказ',
          text: 'Пожалуйста, попробуйте позднее или обратитесь в службу поддержки',
          type: 'error',
        }))
    },
  },
}
</script>

<style lang="stylus">
@import '~@/common/assets/styles/mixins.styl'

$product-preview-size = 4.5rem

#cart
  container()

  align-items flex-start
  display flex
  flex auto
  padding-bottom $xxl
  padding-top $xxl
  position relative

  .cart-body
    flex auto
    min-width 0

    .cart-product-list-empty
      font-size $fs-lg
      padding $xxl $md
      text-align center

      .cart-product-list-empty-back
        color $tertiary
        font-size $fs-md
        text-decoration underline

    .cart-product-item
      // position relative
      margin-bottom 1rem

      // &:not(:last-child)::before
      //   background-color $bc-1
      //   bottom 0
      //   content ''
      //   height .05rem
      //   left $product-preview-size + $md + $md
      //   position absolute
      //   right 0

  .cart-separator
    align-self stretch
    border-left 1px solid $bc-1
    margin 0 $md

  .cart-footer
    flex none
    padding $md
    width 35%

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
      border .05rem solid $bc-1
      height 2.75rem
      padding 0 $sm
      width 100%

    .cart-buy
      background-color $tertiary
      box-shadow $shadow-1
      color white
      display block
      font-weight $fw-medium
      height 2.75rem
      margin-top $md
      padding 0 $xxl
      transition background-color .2s ease-out
      user-select none
      width 100%

      &:active
        background-color darken($tertiary, 10%)

      &:disabled
        background-color lighten($tertiary, 30%)
        box-shadow none
</style>
