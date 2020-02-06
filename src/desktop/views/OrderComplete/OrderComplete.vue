<template lang="pug">
article#order-complete
  h1.order-complete-title Спасибо, ваш заказ оформлен
  p.order-complete-text
    | Номер вашего заказа
    |
    span.order-id {{ orderId }}
    | . Ожидайте звонка от нашего оператора в ближайшее время.
  RouterLink.button(
    :to="{ name: 'shop' }"
  ) Продолжить покупки

</template>

<script>
export default {
  props: {
    orderId: {
      required: true,
      type: Number,
    },
  },
}
</script>

<style lang="stylus" scoped>
#order-complete
  align-items center
  display flex
  flex auto
  flex-direction column
  justify-content center
  margin-bottom 4rem
  padding $md
  text-align center

  .order-complete-title
    serif()

    font-size $fs-xxxl
    margin-bottom 1rem

  .order-complete-text
    color $tc-2
    margin-bottom 2rem

  .order-id
    serif()

    color #f5989d
    font-style italic
</style>
