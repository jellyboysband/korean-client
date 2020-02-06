<template lang="pug">
article#cart
  section.cart-body(
    v-if="CartProductList.length"
    key="content"
  )
    //- ul.cart-product-list
      li.cart-product-item(
        v-for="cartProduct in CartProductList"
        :key="cartProduct.productId"
      )
        CartProduct(
          :cartProduct="cartProduct"
        )

    h2.cart-title Корзина

    table.table
      thead.thead
        tr.tr
          th.th
          th.th Продукт
          th.th Цена
          th.th Количество
          th.th Итого
          th.th

      tbody.tbody
        CartProductRow(
          v-for="cartProduct in CartProductList"
          :key="cartProduct.productId"
          :cartProduct="cartProduct"
        )

      tfoot.tfoot
        tr.tr
          td.td
          td.td
          td.td
          td.td Сумма заказа:
          td.td.cart-amount-total(
            colspan="2"
          ) {{ cartAmount | number }} ₽

    form.cart-form(
      @submit.prevent="createOrder"
    )
      label.cart-user-phone-label Контактный телефон:
      input.cart-user-phone(
        v-model="phone"
        autocomplete
        inputmode="tel"
        placeholder="+7(900)000-00-00"
        type="tel"
      )
      button.cart-buy.button(
        :disabled="!CartProductList.length || !phone"
        type="submit"
      ) Оформить заказ

  section.cart-empty(
    v-else
    key="empty"
  )
    p.cart-empty-title Ваша корзина в данный момент пуста
    RouterLink.cart-empty-back.button(:to="{ name: 'shop' }") Вернуться в магазин


</template>

<script>
import {
  mapState,
  mapGetters,
  mapActions,
} from 'vuex'

import CartProductRow from '@/desktop/views/Cart/CartProductRow.vue'


export default {
  components: {
    CartProductRow,
  },

  data() {
    return {
      phone: '',
    }
  },

  computed: {
    ...mapState('shop', [
      'CartProductList',
    ]),

    ...mapGetters('shop', [
      'GetExtra',
    ]),

    cartAmount() {
      return this.CartProductList.reduce((acc, curr) => acc + curr.count * this.GetExtra(curr.extraId).price, 0)
    },
  },

  methods: {
    ...mapActions('shop', [
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

<style lang="stylus" scoped>
@import '~@/common/assets/styles/mixins.styl'

$product-preview-size = 4.5rem

#cart
  container()

  display flex
  flex auto
  flex-direction column
  padding-bottom 5rem
  padding-top 5rem

.cart-body
  flex auto
  min-width 0

.cart-empty
  align-items center
  display flex
  flex auto
  flex-direction column
  font-size $fs-lg
  height 100%
  justify-content center
  margin-bottom 5rem
  padding $xxl $md
  text-align center

  .cart-empty-title
    serif()

    font-size $fs-xxxl
    margin-bottom 2rem

.cart-title
  serif()

  font-size $fs-xxxl
  margin-bottom 2rem

.cart-amount-total
  serif()

  font-size $fs-xxl
  padding .75rem 0

.cart-form
  .cart-user-phone-label
    display block
    margin-bottom $xxs

  .cart-user-phone
    border 1px solid #d7d7d7
    display block
    height 2.75rem
    padding 0 1rem
    transition border-color .2s ease-in-out

    &:focus
      border-color grey
      color #000

  .cart-buy
    margin-top 1rem
</style>
