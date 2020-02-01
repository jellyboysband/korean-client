<template lang="pug">
footer#footer
  section.footer-section
    h6.footer-title Контакты
    address.contact
      a.contact-phone(href="tel:+79995219996") +7 (999) 521-99-96
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
</template>

<style lang="stylus">
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
