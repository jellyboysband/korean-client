<template lang="pug">
footer#footer
  .footer-content
    section.footer-section
      h6.footer-title Контакты
      address.contact
        a.contact-phone(href="tel:+79995219996") +7 (999) 521-99-96
        a.contact-email(href="mailto:tandem.beauty178@gmail.com") tandem.beauty178@gmail.com

    section.footer-section
      h6.footer-title Мы в соц. сетях
      .social
        a.social-link(
          href="https://www.facebook.com/100035944958141"
          ref="noopener noreferrer"
          target="_blank"
        )
          VIcon.social-icon(icon="social/facebook-square")
        a.social-link(
          href="https://www.instagram.com/_beautytandem/?igshid=1elvijt8jm4w9"
          ref="noopener noreferrer"
          target="_blank"
        )
          VIcon.social-icon(icon="social/instagram")
        a.social-link(
          href="https://vk.com/tmbeauty"
          ref="noopener noreferrer"
          target="_blank"
        )
          VIcon.social-icon(icon="social/vk")
</template>

<style lang="stylus" scoped>
#footer
  background-color #e1eded
  height 16rem
  margin-top auto

  .footer-content
    display flex
    margin 0 auto
    max-width $container-max-width
    padding 2rem

  .footer-section:not(:first-child)
    margin-left 4rem

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
    .contact-email
      transition color .2s ease-in-out

      &:hover
        color #f5989d

    .contact-phone
      margin-bottom $xxs

  .social
    display flex

    .social-icon
      font-size 1.5rem
      margin-right .75rem
      transition color .2s ease-in-out

      &:hover
        color #f5989d
</style>
