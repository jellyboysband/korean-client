<template lang="pug">
  #app
    router-view

    footer#footer
      address.contact
        a.contact-phone(href="tel:+79533737385") +7 (953) 373-73-85
        a.contact-email(href="mailto:tandem.beauty178@gmail.com") tandem.beauty178@gmail.com

</template>

<style lang="stylus">
#app
  margin 0 auto
  max-width 1020px

#footer
  // background-color #131313
  // background-color #e1eded
  background-color alpha($primary, .2)
  // border-top .25px solid $bc-1
  padding $xxl $md $xl

  .contact
    // color alpha(white, .87)
    // color alpha(black, .87)
    display flex
    flex-direction column
    font-style normal

    .contact-phone
      // font-size $fs-xl
      font-size $fs-lg
      margin-bottom $xs
      text-decoration underline

    .contact-email
      font-size $fs-sm
      text-decoration underline
</style>
