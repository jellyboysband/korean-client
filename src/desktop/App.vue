<template lang="pug">
#app
  header#header
    //- RouterLink.header-logo-link(
    //-   :to="{ name: 'home' }"
    //- )
    //-   img.header-logo

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

  RouterView

  footer#footer
    section.footer-section
      h6.footer-title Контакты
      address.contact
        a.contact-phone(href="tel:+79533737385") +7 (953) 373-73-85
        a.contact-email(href="mailto:tandem.beauty178@gmail.com") tandem.beauty178@gmail.com

    section.footer-section
      h6.footer-title Мы в соц. сетях
      .social
        //- a.social-link
          VIcon.social-icon(icon="social/facebook-square")
        a.social-link(
          href="https://www.instagram.com/_beautytandem/?igshid=1elvijt8jm4w9"
          ref="noopener noreferrer"
          target="_blank"
        )
          VIcon.social-icon(icon="social/instagram")

  Notifications

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

  methods: {
    onSearchSubmit() {
      this.$router.push({
        name: 'home',
        query: {
          search: this.searchText,
        },
      })
    },
  },
}
</script>

<style lang="stylus">
@import '~@/common/assets/styles/mixins.styl'

html
  background-color alpha($primary, .05)
  font-size 18px

#app
  display flex
  flex-direction column
  min-height 100vh
  position relative

#header
  $field-height = 2.75rem
  container()

  align-items center
  background-color white
  border-bottom 1px solid $bc-1
  display flex
  height 4rem
  position sticky
  top 0
  z-index 500

  .header-logo-link
    margin-right $xxl

  .search-field
    background-color white
    border-radius $radius-circle
    border .05rem solid $bc-1
    display flex
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

#footer
  container()

  background-color white
  border-top .05rem solid $bc-1
  color #363636
  display flex
  margin-top auto
  padding-bottom $xxl
  padding-top $xxl

  .footer-section:not(:first-child)
    margin-left $xxl

  .footer-title
    font-size $fs-sm
    font-weight $fw-semi-bold
    margin-bottom $sm

  .contact
    display flex
    flex-direction column
    font-style normal
    margin-bottom $xl
    text-decoration underline

    .contact-phone
      margin-bottom $xxs

  .social
    display flex

    .social-icon
      color $primary
      font-size 2rem
      margin-right $md
</style>
