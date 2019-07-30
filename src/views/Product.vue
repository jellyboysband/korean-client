<template lang="pug">
  article#product(v-if="product")
    figure.product-preview-container
      img.product-preview(
        :alt="`Фотография продукта ${product.name}`"
        :src="product.avatarUrl"
      )

    a.router-back(@click="() => $router.back()")
      VIcon(icon="light/long-arrow-left")

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
              VIcon.description-icon(icon="regular/align-left" inline)
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
            button.product-count-increment(@click="count++")
              VIcon(icon="light/plus")
            input.product-count-value(
              v-model.number="count"
              inputmode="numeric"
              min="1"
              pattern="[1-9]*"
              type="number"
            )
            button.product-count-decrement(@click="count = Math.max(1, count - 1)")
              VIcon(icon="light/minus")

        button.add-to-cart Добавить в корзину

    footer.product-footer


</template>

<script>
import { mapGetters } from 'vuex'

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
    ...mapGetters('product', ['GetProduct']),

    product() {
      return this.GetProduct(this.productId)
    },
  },
}
</script>

<style lang="stylus">
#product
  display grid
  position relative

  .product-body
    background-color white

  @media (min-width: 600px)
    grid-template-columns 2fr 3fr
    padding 1.75rem 1.25rem 1rem

  .router-back
    color $white
    font-size 2rem
    left 1.25rem
    position absolute
    // filter drop-shadow(0 1px 2px black)
    top 2rem
    z-index $z-header

    @media (min-width: 600px)
      display none

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

      .description-icon
        color $tc-3

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
        margin-top $xs

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
    width 100%

.product-footer
  margin-top $lg
</style>
