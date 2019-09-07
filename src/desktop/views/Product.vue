<template lang="pug">
  article#product(v-if="product")
    figure.product-preview-container
      img.product-preview(
        :alt="`Фотография продукта ${product.name}`"
        :src="product.avatarUrl"
      )

    main.product-body
      section.product-section
        h2.product-title
          span.product-brand {{ product.brand.name }}
          | &nbsp;
          span.product-name {{ product.name }}
        p.product-description {{ product.description }}

      section.product-section
        .product-description
          p Филлер для восстановления структуры волос Lador Perfect Hair Filler, содержащий в своём составе керамиды, LPP-кератин, PPT-коллаген, шелковые аминокислоты. Филлер за одну процедуру мгновенно преобразит ваши волосы, сделает их невероятно сильным, здоровыми, шелковистыми и блестящими! Филлер нормализует PH балланс кожи головы, лечит волосы ослабленные химией или окрашиванием, улучшает общее состояние волос. Волосы становятся эластичными, увлажненными (пропадает эффект сухих концов), гладкими. Филлер проникает внутрь волоса, сглаживает чешуйки, дефекты и повреждения структуры, делает каждый отдельный волос более гладким.
          p Восстанавливающий филлер для волос даёт ощутимый результат уже после первого применения. Применять филлеры можно в виде курса процедур (оптимально 2 раза в неделю) или по мере необходимости, когда вам нужно особенно хорошо выглядеть.

      section.product-section
        .level
          section.product-count
            button.product-count-decrement(@click="count = Math.max(1, count - 1)")
              VIcon(icon="light/minus")
            input.product-count-value(
              v-model.number="count"
              inputmode="numeric"
              min="1"
              pattern="[1-9]*"
              type="number"
            )
            button.product-count-increment(@click="count++")
              VIcon(icon="light/plus")

          p.product-price
            span.product-price-curr {{ product.price | number }} ₽
            span.product-price-prev {{ product.price | number }} ₽

        button.add-to-cart(
          @click="addToCart"
        ) Добавить в корзину

</template>

<script>
import {
  mapGetters,
  mapState,
  mapMutations,
} from 'vuex'


export default {
  props: {
    productId: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      count: 1,
    }
  },

  computed: {
    ...mapState('product', [
      'CartProductList',
    ]),
    ...mapGetters('product', [
      'GetProduct',
    ]),

    product() {
      return this.GetProduct(this.productId)
    },
  },

  methods: {
    ...mapMutations('product', [
      'AddCartProduct',
    ]),

    addToCart() {
      const { product, count } = this
      this.AddCartProduct({ product, count })
      this.count = 1
    },
  },
}
</script>

<style lang="stylus">
@import '~@/common/assets/styles/mixins.styl'

#product
  container()

  align-items flex-start
  display flex
  padding-bottom $xxl
  padding-top $xxl
  position relative

  .product-preview-container
    border-radius $radius-md
    flex none
    margin-right $xxl
    width 40%

    .product-preview
      color $tc-3
      display block
      font-size $fs-xs
      height 100%
      object-fit cover
      width 100%

  .product-body
    // padding $xl $md
    flex auto

    .product-title
      font-size $fs-xl
      font-weight $fw-semi-bold
      // margin-bottom $sm

    .product-description
      color $tc-2
      font-size $fs-sm

      > p:not(:first-child)
        margin-top $sm

  .product-section
    padding $md

    .description-title
      align-items center
      display flex
      font-size $fs-md
      font-weight $fw-semi-bold

      .description-trigger-icon
        margin-left auto

  .level
    align-items center
    display flex

  .product-price
    line-height 1.25
    margin-left $md

    .product-price-curr
      display block
      font-size $fs-xl
      font-weight $fw-semi-bold

    .product-price-prev
      color $tc-3
      display block
      text-decoration line-through

  .product-count
    $count-item-size = 2.75rem

    background-color $white
    border .05rem solid $bc-1
    border-radius $radius-md
    display flex
    overflow hidden
    width $count-item-size * 3

    .product-count-value
    .product-count-increment
    .product-count-decrement
      align-items center
      display flex
      height $count-item-size
      justify-content center
      text-align center
      transition all .2s
      width $count-item-size

    .product-count-value
      font-size $fs-lg

    .product-count-increment
    .product-count-decrement
      color $tc-2
      font-size $fs-md

      &:active
        background-color alpha($primary, .2)

  .add-to-cart
    background-color $tertiary
    border-radius $radius-md
    box-shadow $shadow-1
    color white
    display block
    height 2.75rem
    margin-top $md
    padding 0 $xxl
    transition background-color .2s ease-out
    user-select none

    &:active
      background-color darken($tertiary, 10%)

.product-footer
  margin-top $lg
</style>
