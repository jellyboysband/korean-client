<template lang="pug">
article#product(v-if="product")
  figure.product-preview-container
    img.product-preview(
      :alt="`Фотография продукта ${product.name}`"
      :src="avatarUrl"
    )

  main.product-body
    section.product-section
      h2.product-title
        span.product-brand-name {{ brand.name }}
        |
        | —
        |
        span.product-name {{ product.name }}
      p.product-categories {{ categoryList.map(it => it.name.trim()).join(', ').toLowerCase() }}

    section.product-section
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
          span.product-price-curr {{ extraSelected.price * count | number }} ₽
          //- span.product-price-prev {{ product.price | number }} ₽

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

      extraIdSelected: 0,
    }
  },

  computed: {
    ...mapState('product', [
      'CartProductList',
    ]),

    ...mapGetters('product', [
      'GetBrand',
      'GetCategory',
      'GetProduct',
    ]),

    avatarUrl() {
      return this.extraSelected.avatarUrl
    },

    brand() {
      return this.GetBrand(this.product.brandId)
    },

    categoryList() {
      return this.product.categoryIdList.map(this.GetCategory)
    },

    extraSelected() {
      return this.product.extraList.find((it) => it.id === this.extraIdSelected)
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
        this.extraIdSelected = curr?.extraList[0].id
      },
      immediate: true,
    },
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
      margin-bottom $xs

      .product-brand-name
        font-weight $fw-semi-bold

    .product-categories
      color $tc-2
      font-size $fs-sm

    .product-description
    .product-apply
      // color $tc-2
      font-size $fs-sm
      white-space pre-line

      &:not(:first-child)
        margin-top $md

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

  .product-extra-list
    display flex

    .product-extra-item
      margin-right .75rem

      .product-extra
        border 1px solid $bc-1

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
          box-shadow 0 0 0 1px $tertiary

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
    border 1px solid $bc-1

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
    margin-top $md
    padding 0 $xxl
    transition background-color .2s ease-out
    user-select none

    &:active
      background-color darken($tertiary, 10%)

.product-footer
  margin-top $lg
</style>
