<template lang="pug">
  article#home
    section.search-container
      form.search-field(@submit.prevent="onSearchSubmit")
        .search-icon-container
          VIcon.search-icon(icon="regular/search")
        input.search-input(v-model="searchText" type="search")

    ul.filter-list
      li.filter-item(
        v-for="type in typeList"
        :key="type.id"
        :class="{ active: type.id === typeId }"
        @click="onFilterClick"
      )
        router-link.filter-link(
          :to="{ query: { ...$route.query, type: type.id } }"
          replace
        ) {{ type.name }}

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

const FILTER_TYPE_NEW = 'new'
const FILTER_TYPE_POPULAR = 'popular'
const FILTER_TYPE_SALE = 'sale'

export default {
  props: {
    typeId: {
      default: FILTER_TYPE_NEW,
      type: String,
    },
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
      typeList: Object.freeze([
        {
          id: FILTER_TYPE_NEW,
          name: 'Новинки',
        },
        {
          id: FILTER_TYPE_POPULAR,
          name: 'Популярное',
        },
        {
          id: FILTER_TYPE_SALE,
          name: 'Распродажа',
        },
      ].map(Object.freeze)),
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
    onFilterClick(event) {
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
      background-color white
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
          color $tc-3

      .search-input
        color #181818
        padding-left $search-height
        width 100%

  .filter-list
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

    .filter-item
      color #a7a5a6
      flex none
      font-size $fs-md
      font-weight $fw-bold
      position relative
      transition color .2s

      &:not(:first-child)
        margin-left 1.25rem

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
        color $tc-1

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
