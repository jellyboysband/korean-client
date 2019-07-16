<template lang="pug">
  article#home
    section.search-container
      form.search-field(@submit.prevent="onSearchSubmit")
        .search-icon-container
          VIcon.search-icon(icon="regular/search")
        input.search-input(v-model="searchText" type="search")

    ul.brand-filter-list
      li.brand-filter-item(@click="onBrandClick")
        router-link.brand-filter-link(
          :to="{ query: { ...$route.query, brand: 0 } }"
          :class="{ active: !brandId }"
          replace
        ) Все

      li.brand-filter-item(
        v-for="brand in BrandList"
        :key="brand.id"
        @click="onBrandClick"
      )
        router-link.brand-filter-link(
          :to="{ query: { ...$route.query, brand: brand.id } }"
          :class="{ active: brand.id === brandId }"
          replace
        ) {{ brand.name }}

    ul.cosmetic-list
      li.cosmetic-item(
        v-for="cosmetic in cosmeticListSearched"
        :key="cosmetic.id"
      )
        router-link.cosmetic-link(:to="{ name: 'cosmetic', params: { cosmeticId: cosmetic.id } }")
          section.cosmetic-card
            figure.cosmetic-preview-container
              img.cosmetic-preview(
                :alt="`Фотография продукта ${cosmetic.name}`"
                :src="cosmetic.avatarUrl"
              )
            span.cosmetic-place {{ cosmetic.place }}
            h6.cosmetic-name {{ cosmetic.brand.name }} {{ cosmetic.name }}
            p.cosmetic-description {{ cosmetic.description }}
            p.cosmetic-price {{ cosmetic.price | number }} ₽

</template>

<script>
import Fuse from 'fuse.js'
import { mapState } from 'vuex'

export default {
  props: {
    brandId: {
      default: 0,
      type: Number,
    },
    search: {
      default: '',
      type: String,
    },
  },

  data() {
    return {
      searchText: '',
    }
  },

  computed: {
    ...mapState('cosmetic', ['BrandList', 'CosmeticList']),

    cosmeticListFiltered() {
      return this.brandId
        ? this.CosmeticList.filter(it => it.brand.id === this.brandId)
        : this.CosmeticList
    },

    cosmeticListSearched() {
      const options = {
        shouldSort: true,
        findAllMatches: true,
        keys: [
          {
            name: 'name',
            weight: 0.4,
          },
          {
            name: 'brand.name',
            weight: 0.4,
          },
          {
            name: 'apply',
            weight: 0.1,
          },
          {
            name: 'description',
            weight: 0.1,
          },
        ],
      }
      const fuse = new Fuse(this.cosmeticListFiltered, options)

      return this.search
        ? fuse.search(this.search)
        : this.cosmeticListFiltered
    },
  },

  watch: {
    search: {
      handler(curr) {
        this.searchText = curr
      },
      immediate: true,
    },
  },

  methods: {
    onBrandClick(event) {
      event.target.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      })
    },

    onSearchSubmit() {
      this.$router.replace({ query: { ...this.$route.query, search: this.searchText } })
    },
  },
}
</script>

<style lang="stylus">
#home
  .search-container
    padding 1.75rem 1.25rem 1rem

    $search-height = 2.75rem

    .search-field
      border-radius 1rem
      box-shadow 0 0 1rem 0 #d9d9d9
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

  .brand-filter-list
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

    .brand-filter-item
      flex none

      &:not(:first-child)
        margin-left 1.25rem

      .brand-filter-link
        color #a7a5a6
        font-size $fs-md
        font-weight $fw-semi-bold
        position relative
        transition color .2s

        &::after
          background-color $primary
          border-radius $radius-circle
          content ''
          display block
          height .25rem
          left 50%
          opacity 0
          position absolute
          top 110%
          transform translateX(-50%)
          transition opacity .2s
          width .25rem

        &.active
          color #181818

          &::after
            opacity 1

  .cosmetic-list
    display grid
    gap 2rem
    grid-template-columns repeat(auto-fill, minmax(240px, 1fr))
    padding 1.25rem
    scroll-behavior smooth

    .cosmetic-item
      .cosmetic-card
        .cosmetic-preview-container
          margin-bottom .75rem
          padding-top 80%
          position relative

          .cosmetic-preview
            bottom 0
            color $tc-3
            display block
            font-size $fs-xs
            height 100%
            left 0
            object-fit cover
            position absolute
            right 0
            top 0
            width 100%

        .cosmetic-place
          font-size $fs-xs
          font-weight $fw-semi-bold
          margin-bottom .25rem
          opacity .7

        .cosmetic-name
          font-size $fs-md
          font-weight $fw-semi-bold
          margin-bottom .25rem

        .cosmetic-description
          color $tc-2
          font-size $fs-xs
          // margin-bottom .25rem

        .cosmetic-price
          font-size $fs-xxxl
</style>
