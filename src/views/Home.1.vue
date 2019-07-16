<template lang="pug">
  article#cosmetic-list
    //- section.search-container
      form.search-field
        .search-icon-container
          VIcon.search-icon(icon="regular/search")
        input.search-input(type="search")

    //- article.about Корейская косметика даже из азиатки сделает человека

    //- ul.place-filter-list
      li.place-filter-item(@click="onPlaceClick")
        router-link.place-filter-link(
          :to="{ name: 'home' }"
          replace
        ) Все

      li.place-filter-item(
        v-for="place in placeList"
        :key="place.id"
        @click="onPlaceClick"
      )
        router-link.place-filter-link(
          :to="{ name: 'home', query: { place: place.id } }"
          replace
        ) {{ place.name }}

    ul.cosmetic-list
      li.cosmetic-item(
        v-for="cosmetic in cosmeticList"
        :key="cosmetic.id"
      )
        router-link.cosmetic-link(:to="{ name: 'cosmetic', params: { cosmeticId: cosmetic.id } }")
          section.cosmetic-card
            span.cosmetic-place {{ cosmetic.place }}
            h6.cosmetic-name {{ cosmetic.name }}
            p.cosmetic-price {{ cosmetic.price }} ₽

</template>

<script>
export default {
  data() {
    return {
      cosmeticList: [
        {
          id: 1,
          name: 'Увлажняющий крем для рук',
          place: 'Руки',
          price: 999,
        },
        {
          id: 2,
          name: 'Маска для лица',
          place: 'Лицо',
          price: 1200,
        },
        {
          id: 3,
          name: 'Крем против гемороя',
          place: 'Дырочка',
          price: 666,
        },
      ],
      placeList: [
        {
          id: 1,
          name: 'Лицо',
        },
        {
          id: 2,
          name: 'Руки',
        },
        {
          id: 3,
          name: 'Волосы',
        },
        {
          id: 4,
          name: 'Дырочка',
        },
      ],
    }
  },

  methods: {
    onPlaceClick(event) {
      event.target.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      })
    },
  },
}
</script>

<style lang="stylus">
.search-container
  padding 1.75rem 1.25rem 1rem

  $search-height = 2.75rem

  .search-field
    border-radius 1rem
    box-shadow 0 0 1rem 0 #cccccc
    display flex
    height $search-height
    position relative

    .search-icon-container
      align-items center
      display flex
      height $search-height
      justify-content center
      position absolute
      width $search-height

      .search-icon
        color #959595

    .search-input
      color #181818
      padding-left $search-height
      width 100%

.about
  padding 0 1.25rem

.place-filter-list
  display flex
  overflow-y auto
  padding 1rem 1.25rem
  scroll-behavior smooth
  scrollbar-width none

  &::-webkit-scrollbar
    display none

  &::after
    content ''
    flex none
    width 1.25rem

  .place-filter-item
    flex none

    &:not(:first-child)
      margin-left 1.25rem

    .place-filter-link
      color #a7a5a6
      font-size 1rem
      font-weight 600
      position relative

      &::after
        background-color #95c2d3
        border-radius $radius-circle
        content ''
        display block
        height .25rem
        left 50%
        opacity 0
        position absolute
        top 110%
        transform translateX(-50%)
        width .25rem

      &.router-link-exact-active
        color #181818

        &::after
          opacity 1

.cosmetic-list
  display flex
  overflow-y auto
  padding 1.25rem
  scroll-behavior smooth
  scrollbar-width none

  &::-webkit-scrollbar
    display none

  &::after
    content ''
    flex none
    width 1.25rem

  .cosmetic-item
    flex none
    height 260px
    width 160px

    &:not(:first-child)
      margin-left 1rem

    .cosmetic-card
      // background-image linear-gradient(to bottom right, #98c7da, #497383)
      background-image linear-gradient(to bottom right, #ddcfb6, #a19074)
      border-radius 1rem
      // box-shadow 0 0 1rem 0 alpha(#497383, .5)
      box-shadow 0 0 1rem 0 alpha(#a19074, .5)
      color #f6f6f6
      display flex
      flex-direction column
      font-weight 600
      height 100%
      padding 1rem

      .cosmetic-place
        font-size .75rem
        margin-bottom .25rem
        color alpha(white, .60)

      .cosmetic-name
        font-size 1rem
        font-weight inherit
        margin-bottom 1rem

      .cosmetic-price
        align-self flex-start
        background-color alpha(white, .2)
        border-radius .75rem
        font-size 1rem
        margin-top auto
        padding .25rem .75rem
</style>
