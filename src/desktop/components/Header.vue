<template lang="pug">
header#header
  RouterLink.logo-link(
    :to="{ name: 'home' }"
  )
    img.logo(
      src="@/common/assets/images/logotype-small.svg"
    )

  nav.navigation
    ul.navigation-list
      li.navigation-item
        RouterLink.navigation-link(
          :to="{ name: 'home' }"
        ) Главная
      li.navigation-item
        RouterLink.navigation-link(
          :to="{ name: 'shop' }"
        ) Магазин
      li.navigation-item
        RouterLink.navigation-link(
          :to="{ name: 'cosmetology' }"
        ) Косметология
      li.navigation-item
        RouterLink.navigation-link(
          :to="{ name: 'blog' }"
        ) Блог
      li.navigation-item
        RouterLink.navigation-link(
          :to="{ name: 'contact' }"
        ) Контакты
      li.navigation-item
        RouterLink.navigation-link(
          :to="{ name: 'delivery' }"
        ) Доставка

  RouterLink.product-cart-link(
    :to="{ name: 'cart' }"
  )
    VIcon(icon="light/shopping-bag" square)
    span.product-cart-count {{ CartProductList.length }}
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
    ...mapState('shop', [
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

<style lang="stylus" scoped>
@import '~@/common/assets/styles/mixins.styl'

#header
  container()

  display flex
  height 4rem
  user-select none

.logo-link
  display block
  height 4rem
  margin-right 1.5rem
  width 4rem

  .logo
    height 100%
    object-fit contain
    transform scale(1.4)

.navigation
  .navigation-list
    display flex
    height 100%

    .navigation-item
      .navigation-link
        align-items center
        display flex
        font-size $fs-sm
        font-weight 600
        height 100%
        letter-spacing .05em
        padding 0 1.5rem
        text-align center
        text-transform uppercase

        &:hover
          text-decoration underline

.product-cart-link
  align-items center
  display flex
  font-size $fs-xxl
  justify-content center
  margin-left auto
  padding 0 .5rem
  position relative
  text-align center

  .product-cart-count
    background-color #2f6d6c
    border-radius $radius-circle
    color white
    font-size .625rem
    height .875rem
    pointer-events none
    position absolute
    transform translate(70%, -70%)
    width .875rem
</style>
