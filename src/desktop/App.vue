<template lang="pug">
  #app
    header#header
      RouterLink.header-home-link(
        :to="{ name: 'home' }"
      )
        img.header-logo

      form.search-field(@submit.prevent="onSearchSubmit")
        .search-icon-container
          VIcon.search-icon(icon="regular/search")
        input.search-input(v-model="searchText" type="search")

      RouterLink.product-cart-link(
        :to="{ name: 'cart' }"
      )
        VIcon(icon="light/shopping-bag" square)
        span.product-cart-count(v-if="CartProductList.length") {{ CartProductList.length }}

    RouterView

    footer#footer
      h6.footer-title Контакты
      address.contact
        a.contact-phone(href="tel:+79533737385") +7 (953) 373-73-85
        a.contact-email(href="mailto:tandem.beauty178@gmail.com") tandem.beauty178@gmail.com

      h6.footer-title Мы в соц. сетях
      section.social
        VIcon.social-icon(icon="social/facebook-square")
        VIcon.social-icon(icon="social/instagram")

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
    ...mapState([
      'CartProductList',
    ]),
  },
}
</script>

<style lang="stylus">
html
  background-color alpha($primary, .05)

#app
  display flex
  flex-direction column

#header
  background-color white
  border-bottom 1px solid $bc-1
  padding 0 calc(50% - 300px)

#footer
  background-color white
  border-top .75px solid $bc-1
  color #363636
  margin-top auto
  padding $xxl

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
