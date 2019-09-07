<template lang="pug">
  article#order-complete
    h1.order-complete-title Спасибо, ваш заказ оформлен
    p.order-complete-text Номер вашего заказа {{ orderId }}
    RouterLink.order-complete-back(
      :to="{ name: 'home' }"
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

<style lang="stylus">
#order-complete
  align-items center
  display flex
  flex-direction column
  justify-content center
  min-height 100vh
  padding $md
  padding-bottom 20vh
  text-align center

  .order-complete-title
    font-size $fs-xl
    font-weight $fw-medium
    margin-bottom $md

  .order-complete-text
    color $tc-2
    margin-bottom $md

  .order-complete-back
    text-decoration underline
</style>
