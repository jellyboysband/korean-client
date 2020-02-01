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
        span.product-brand-name {{ product.brand.name }}
        |
        | —
        |
        span.product-name {{ product.name }}

      p.product-tags {{ product.tagList.map(it => it.name.trim()).join(', ').toLowerCase() }}

    section.product-section
      VCollapse
        template(#trigger="{ opened }")
          h3.description-title
            span Описание
            VIcon.description-trigger-icon(:icon="`regular/chevron-${opened ? 'up' : 'down'}`")

        .product-description {{ product.description }}
        .product-apply {{ product.apply }}

    section.product-section
      ul.product-extra-list
        li.product-extra-item(
          v-for="extra in product.extraList"
          :key="extra.id"
        )
          label.product-extra(
            :class="{ active: extra.id === extraIdSelected }"
          )
            p(v-if="extra.volume") Объем: {{ extra.volume | number }} ml
            p(v-if="extra.weight") Вес: {{ extra.weight | number }} g
            p Цена: {{ extra.price | number }} ₽
            input(
              v-model="extraIdSelected"
              :value="extra.id"
              name="extra"
              type="radio"
            )

    section.product-section
      .level
        p.product-price
          span.product-price-curr {{ extraSelected.price * count | number }} ₽
          //- span.product-price-prev {{ product.price | number }} ₽

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
      extraIdSelected: 0,
    }
  },

  computed: {
    ...mapState('product', [
      'CartProductList',
    ]),

    ...mapGetters('product', [
      'GetProduct',
    ]),

    extraSelected() {
      return this.product?.extraList.find((it) => it.id === this.extraIdSelected)
    },

    product() {
      return this.GetProduct(this.productId)
    },
    // priceMin() {
    //   return Math.min(this.product.extraList(it => it.price))
    // },
    // priceMax() {
    //   return Math.max(this.product.extraList(it => it.price))
    // },
  },
  watch: {
    product: {
      handler(curr) {
        this.extraIdSelected = curr?.extraList[0]?.id
      },
      immediate: true,
    },
  },
  mounted() {
  },

  methods: {
    ...mapMutations('product', [
      'AddCartProduct',
    ]),

    addToCart() {
      const { product, extraIdSelected, count } = this
      this.AddCartProduct({
        productId: product.id,
        extraId: extraIdSelected,
        count,
      })

      this.$notify({
        title: 'Товар добавлен в корзину',
      })
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

  .product-preview-container

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

  .product-body
    background-color white

    // padding $xl $md
    .product-title
      font-size $fs-xl
      margin-bottom $xs

      .product-brand-name
        font-weight $fw-semi-bold

    .product-tags
      color $tc-2
      font-size $fs-sm

    .product-description
    .product-apply
      // color $tc-2
      font-size $fs-sm

      &:not(:first-child)
        margin-top $md

      > p:not(:first-child)
        margin-top $sm

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

  .level
    align-items center
    display flex
    justify-content space-between

  .product-extra-list
    display flex

    .product-extra-item
      margin-right .75rem

      .product-extra
        border .05rem solid $bc-1

        // color $tc-1
        cursor pointer
        display flex
        flex-direction column
        font-size $fs-sm
        justify-content center
        padding .75rem
        transition all .2s

        &.active
          border-color $tertiary
          box-shadow 0 0 0 .05rem $tertiary

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
