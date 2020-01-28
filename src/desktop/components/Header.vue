<template lang="pug">
header#header
  nav.navigation
    RouterLink.navigation-item(
      :to="{ name: 'contact' }"
    ) Контакты
    RouterLink.navigation-item(
      :to="{ name: 'delivery' }"
    ) Доставка

  RouterLink.logo-link(
    :to="{ name: 'home' }"
  )
    img.logo(
      src="@/common/assets/images/logotype-small.svg"
    )

  form.search-field(@submit.prevent="onSearchSubmit")
    .search-icon-container
      VIcon.search-icon(icon="regular/search")
    input.search-input(
      v-model="searchText"
      placeholder="Поиск по товарам"
      type="search"
    )

  RouterLink.product-cart-link(
    :to="{ name: 'cart' }"
  )
    VIcon(icon="light/shopping-bag" square)
    span.product-cart-count(v-if="CartProductList.length") {{ CartProductList.length }}
</template>

<script>
import { mapState } from 'vuex'


export default {
  data() {
    return {
      searchText: '',
    }
  },

  computed: {
    ...mapState('product', [
      'CartProductList',
    ]),
  },

  watch: {
    '$route.query.search': {
      handler(curr) {
        this.searchText = curr
      },
      immediate: true,
    },
  },

  methods: {
    onSearchSubmit() {
      this.$router.push({
        name: 'home',
        query: {
          ...(this.$route.name === 'home' && this.$route.query),
          search: this.searchText,
        },
      })
      // if (this.$route.name === 'home') {
      //   this.$router.replace({
      //     query: {
      //       ...this.$route.query,
      //       search: this.searchText,
      //     },
      //   })
      // } else {
      //   this.$router.push({
      //     name: 'home',
      //     query: {
      //       search: this.searchText,
      //     },
      //   })
      // }
    },
  },
}
</script>

<style lang="stylus">
@import '~@/common/assets/styles/mixins.styl'

#header
  $field-height = 2.75rem
  container()

  align-items center
  background-color white
  // border-bottom .05rem solid $bc-1
  display grid
  grid-template-areas 'logo . navigation' 'logo search cart'
  grid-template-columns 1fr 1fr 1fr
  padding-bottom .25rem
  padding-top .25rem
  position sticky
  top 0
  z-index 500

  .navigation
    align-items center
    display flex
    grid-area navigation
    margin-left auto

    .navigation-item
      font-size $fs-sm
      font-weight 600

      &:not(:first-child)
        margin-left 1rem

  .logo-link
    grid-area logo
    height 100px
    margin-right auto

    .logo
      height 100%
      object-fit contain

  .search-field
    background-color white
    border .05rem solid $bc-1
    border-radius $radius-circle
    display flex
    grid-area search
    height $field-height
    position relative

    .search-icon-container
      align-items center
      display flex
      height $field-height
      justify-content center
      position absolute
      width $field-height

      .search-icon
        color $tc-3

    .search-input
      color #181818
      padding-left $field-height
      width 100%

  .product-cart-link
    align-items center
    background-color $secondary
    border-radius $radius-md
    box-shadow $shadow-1
    color $white
    display flex
    font-size $fs-xl
    grid-area cart
    height $field-height
    justify-content center
    margin-left auto
    position relative
    text-align center
    width $field-height

    .product-cart-count
      background-color $tertiary
      border-radius $radius-circle
      box-shadow $shadow-1
      font-size $fs-xxs
      font-weight $fw-semi-bold
      height 1rem
      position absolute
      right $xxs
      top $xxs
      width 1rem
</style>
