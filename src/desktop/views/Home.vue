<template lang="pug">
article#home
  section.promo-carousel
    Swiper(:options="swiperOption")
      SwiperSlide(
        v-for="promo in promoList"
        :key="promo"
      )
        RouterLink.promo-link(
          :to="{ name: 'product', params: { productId: 1 } }"
        )
          img.promo-preview(:src="promo")
      div.swiper-pagination(slot="pagination")

  //- Carousel(
  //-   :autoplay="true"
  //-   :autoplayTimeout="3000"
  //-   :autoplayHoverPause="true"
  //-   :perPage="1"
  //-   :paginationEnabled="false"
  //- )
  //-   Slide(v-for="promo in promoList")
  //-     a.promo-link
  //-       img.promo-preview(:src="promo")
  //- ul.promo-list
    li.promo-item(v-for="promo in promoList")
      a.promo-link
        img.promo-preview(:src="promo")

  //- ul.filter-list(v-if="!search")
    li.filter-item(
      v-for="type in typeList"
      :key="type.id"
      :class="{ active: type.id === typeId }"
      @click="onFilterClick"
    )
      RouterLink.filter-link(
        :to="{ query: { ...$route.query, type: type.id } }"
        replace
      ) {{ type.name }}

  ul.product-list
    li.product-item(
      v-for="product in productListSearched"
      :key="product.id"
    )
      RouterLink.product-link(:to="{ name: 'product', params: { productId: product.id } }")
        ProductCard(
          :product="product"
        )
</template>

<script>
import Fuse from 'fuse.js'
import { mapState } from 'vuex'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

import ProductCard from '@/desktop/components/ProductCard.vue'

import promo1Image from '@/common/assets/images/promo/1.png'
import promo2Image from '@/common/assets/images/promo/2.png'
import promo3Image from '@/common/assets/images/promo/3.png'


const FILTER_TYPE_NEW = 'new'
const FILTER_TYPE_POPULAR = 'popular'
const FILTER_TYPE_SALE = 'sale'

export default {
  components: {
    ProductCard,
    Swiper: swiper,
    SwiperSlide: swiperSlide,
  },

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
      promoList: [
        promo1Image,
        promo2Image,
        promo3Image,
      ],
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
      swiperOption: {
        centeredSlides: true,
        loop: true,
        slidesPerView: 'auto',
        spaceBetween: 32,
        pagination: {
          el: '.swiper-pagination',
        },
      },
    }
  },

  computed: {
    ...mapState('product', [
      'BrandList',
      'CartProductList',
      'ProductList',
    ]),

    productListFiltered() {
      return this.brandId
        ? this.ProductList.filter((it) => it.brand.id === this.brandId)
        : this.ProductList
    },

    productListSearched() {
      const options = {
        shouldSort: true,
        findAllMatches: true,
        threshold: 0.2,
        keys: [
          {
            name: 'name',
            weight: 0.3,
          },
          {
            name: 'brand.name',
            weight: 0.3,
          },
          {
            name: 'tagList.name',
            weight: 0.4,
          },
        ],
      }
      const fuse = new Fuse(this.productListFiltered, options)

      return this.search
        ? fuse.search(this.search)
        : this.productListFiltered
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
  },
}
</script>

<style lang="stylus">
@import '~@/common/assets/styles/mixins.styl'

#home
  padding 2rem 0

  .promo-carousel
    margin-bottom 3rem

    .swiper-slide
      max-width max-content

    .swiper-pagination-bullet
      &.swiper-pagination-bullet-active
        background-color $tertiary

  // .promo-list
  // display flex
  // overflow hidden

  // .promo-item
  // box-shadow $shadow-1
  // flex none
  // overflow hidden
  // scroll-snap-align center
  // width 100%

  // &:not(:first-child)
  // margin-left $xs

  // .promo-link
  // display block

  // .promo-preview
  // display block
  // height 300px
  // object-fit cover
  // width 100%
  .filter-list
    display flex
    overflow-y auto
    padding $md
    scroll-behavior smooth
    scrollbar-width none

    &::-webkit-scrollbar
      display none

    &::after
      content ''
      flex none
      width 1.25rem

    .filter-item
      color #87888b
      cursor pointer
      flex none
      font-size $fs-md
      font-weight 500
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
        // color $tc-1
        color #333

        &::after
          opacity 1

  .product-list
    display grid
    gap 1.5rem 1rem
    grid-template-columns repeat(auto-fill, minmax(250px, 1fr))
    // container()
    margin 0 auto
    max-width $container-max-width
    padding 1rem
    scroll-behavior smooth

    .product-item
      .product-link
        display block
        height 100%
</style>
