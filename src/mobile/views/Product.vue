<template lang="pug">
  article#product(v-if="product")
    header.product-header
      a.router-back(@click="() => $router.back()")
        VIcon(icon="light/long-arrow-left")

      RouterLink.product-cart-link(
        :to="{ name: 'cart' }"
      )
        VIcon(icon="light/shopping-bag" square)
        span.product-cart-count {{ CartProductList.length }}

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
        VCollapse
          template(#trigger="{ opened }")
            h3.description-title
              span Описание
              VIcon.description-trigger-icon(:icon="`regular/chevron-${opened ? 'up' : 'down'}`")

          .product-description
            p Филлер для восстановления структуры волос Lador Perfect Hair Filler, содержащий в своём составе керамиды, LPP-кератин, PPT-коллаген, шелковые аминокислоты. Филлер за одну процедуру мгновенно преобразит ваши волосы, сделает их невероятно сильным, здоровыми, шелковистыми и блестящими! Филлер нормализует PH балланс кожи головы, лечит волосы ослабленные химией или окрашиванием, улучшает общее состояние волос. Волосы становятся эластичными, увлажненными (пропадает эффект сухих концов), гладкими. Филлер проникает внутрь волоса, сглаживает чешуйки, дефекты и повреждения структуры, делает каждый отдельный волос более гладким.
            p Восстанавливающий филлер для волос даёт ощутимый результат уже после первого применения. Применять филлеры можно в виде курса процедур (оптимально 2 раза в неделю) или по мере необходимости, когда вам нужно особенно хорошо выглядеть.

      section.product-section
        .level
          p.product-price
            span.product-price-curr {{ product.price | number }} ₽
            span.product-price-prev {{ product.price | number }} ₽

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

        button.add-to-cart(
          @click="addToCart"
        ) Добавить в корзину

    footer.product-footer


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
#product
  display grid
  position relative

  .product-header
    align-items center
    background-color white
    box-shadow $shadow-2
    display flex
    height 3.5rem
    padding 0 $md
    position sticky
    top 0
    z-index $z-header

    .router-back
      font-size $fs-xl
      padding $xs

    .product-cart-link
      font-size $fs-xl
      margin-left auto
      padding $xs
      position relative

      .product-cart-count
        align-items center
        background-color $tertiary
        border-radius $radius-circle
        box-shadow $shadow-1
        display flex
        font-size $fs-xxs
        font-weight $fw-semi-bold
        height 1rem
        justify-content center
        position absolute
        right 0
        text-align center
        top $xxs
        width 1rem

  .product-body
    background-color white

  .product-preview-container
    border-radius $radius-md
    padding-top 100%
    position relative

    .product-preview
      bottom 0
      color $tc-3
      display block
      font-size $fs-xs
      height 100%
      left 0
      object-fit cover
      position absolute
      right 0
      top 0
      width 100%

  .product-section
    border-bottom .75px solid $bc-1
    padding $md

    .description-title
      align-items center
      display flex
      font-size $fs-md
      font-weight $fw-semi-bold

      .description-trigger-icon
        margin-left auto

  .product-body
    // padding $xl $md
    .product-title
      font-size $fs-xl
      font-weight $fw-semi-bold
      // margin-bottom $sm

    .product-description
      color $tc-2
      font-size $fs-sm

      > p
        margin-top $sm

  .level
    align-items center
    display flex
    justify-content space-between

  .product-price
    line-height 1.25

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
    border .75px solid $bc-1
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
    margin $md auto 0
    padding 0 $xxl
    transition background-color .2s ease-out
    user-select none
    width 100%

    &:active
      background-color darken($tertiary, 10%)

.product-footer
  margin-top $lg
</style>
