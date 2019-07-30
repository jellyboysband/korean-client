<template lang="pug">
  #app
    router-view

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

<style lang="stylus">
#app
  margin 0 auto
  max-width 1020px

#footer
  background-color white
  color #363636
  border-top .75px solid $bc-1
  padding $xxl

  .footer-title
    font-weight $fw-semi-bold
    margin-bottom $sm
    font-size $fs-sm

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
