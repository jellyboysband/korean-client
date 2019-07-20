<template lang="pug">
  #app
    router-view

    footer#footer
      address.contact
        a.contact-phone(href="tel:+79260332006") +7 926 033 20 06
        a.contact-email(href="mailto:webmaster@example.com") webmaster@example.com

</template>

<style lang="stylus">
#app
  margin 0 auto
  max-width 1020px

#footer
  background-color #131313
  border-top 1px solid $bc-1
  padding $xxl $md $xl

  .contact
    color alpha(white, .87)
    display flex
    flex-direction column
    font-style normal
    font-weight $fw-bold
    text-align center

    .contact-phone
      font-size $fs-xl
      margin-bottom $xs

    .contact-email
      font-size $fs-sm
</style>
