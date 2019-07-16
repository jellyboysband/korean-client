<template lang="pug">
  article#cosmetic(v-if="cosmetic")
    a.router-back(@click="() => $router.back()")
      VIcon(icon="light/long-arrow-left")
    img.cosmetic-preview(
      :alt="`Фотография продукта ${cosmetic.name}`"
      :src="cosmetic.avatarUrl"
    )
    main.cosmetic-body
      section.cosmetic-info
        h2.cosmetic-title
          span.cosmetic-brand {{ cosmetic.brand.name }}
          | &nbsp;
          span.cosmetic-name {{ cosmetic.name }}

        p.cosmetic-description {{ cosmetic.description }}

      section.cosmetic-apply
        h3.cosmetic-apply-title Способ применения
        p.cosmetic-apply-text {{ cosmetic.apply }}

      section.cosmetic-buy-container
        button.cosmetic-buy
          VIcon(icon="light/shopping-bag" square)
        p.cosmetic-price {{ cosmetic.price | number }} ₽

</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    cosmeticId: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
    }
  },

  computed: {
    ...mapGetters('cosmetic', ['GetCosmetic']),

    cosmetic() {
      return this.GetCosmetic(this.cosmeticId)
    },
  },
}
</script>

<style lang="stylus">
#cosmetic
  display grid
  position relative

  @media (min-width: 600px)
    grid-template-columns 2fr 3fr
    padding 1.75rem 1.25rem 1rem

  .router-back
    font-size $fs-xxxl
    left 1.25rem
    position absolute
    top 2rem

    @media (min-width: 600px)
      display none

  .cosmetic-preview
    // border-bottom-left-radius $radius-xl
    // border-bottom-left-radius $radius-lg
    box-shadow $shadow-1
    color $tc-3
    display block
    font-size $fs-xs
    height 40vh
    max-height 400px
    min-height 200px
    object-fit cover
    width 100%

  .cosmetic-body
    padding 1.5rem 1.25rem

    .cosmetic-info
      margin-bottom 1.25rem

      .cosmetic-title
        font-size $fs-lg
        font-weight $fw-semi-bold
        margin-bottom .5rem

      .cosmetic-description
        color $tc-2
        font-size $fs-sm

    .cosmetic-apply
      margin-bottom 1.25rem

      .cosmetic-apply-title
        font-size $fs-md
        font-weight $fw-semi-bold
        margin-bottom .5rem

      .cosmetic-apply-text
        color $tc-2
        font-size $fs-sm

    .cosmetic-buy-container
      align-items center
      display flex

      .cosmetic-buy
        background-color $secondary
        border-radius $radius-md
        color white
        font-size $fs-xxl
        // margin-left auto
        margin-right 1rem
        padding .75rem

      .cosmetic-price
        font-size $fs-xxl
        // margin-right auto
</style>
