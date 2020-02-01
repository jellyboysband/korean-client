<template lang="pug">
article#home
  section.promo-carousel
    Swiper(:options="swiperOption")
      SwiperSlide(
        v-for="promo in promoList"
        :key="promo"
      )
        RouterLink.promo-link(
          :to="{ name: 'product', query: { productId: 1 } }"
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

  main.home-body
    section.filter-container
      h3.filter-title Категории
      FilterCategory.filter-category(
        :categoryId="categoryId"
      )

    hr.home-separator

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
import FilterCategory from '@/desktop/components/FilterCategory.vue'

import promo1Image from '@/common/assets/images/promo/1.png'
import promo2Image from '@/common/assets/images/promo/2.png'
import promo3Image from '@/common/assets/images/promo/3.png'


export default {
  components: {
    FilterCategory,
    ProductCard,
    Swiper: swiper,
    SwiperSlide: swiperSlide,
  },

  props: {
    categoryId: {
      default: 0,
      type: Number,
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
      'CartProductList',
      'ProductList',
    ]),

    productListFiltered() {
      return this.categoryId
        ? this.ProductList.filter((product) => product.categoryIdList.includes(this.categoryId))
        : this.ProductList
      // return this.brandId
      //   ? this.ProductList.filter((it) => it.brand.id === this.brandId)
      //   : this.ProductList
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
#home
  display grid
  grid-template-areas 'carousel carousel' 'navigation carousel'
  padding 2rem 0

  .home-body
    container()

    align-items flex-start
    display flex
    flex auto

    .filter-container
      flex none
      padding $md
      width 18rem

      .filter-title
        font-size $fs-lg
        font-weight $fw-semi-bold
        margin-bottom .5rem
        padding .5rem

    .home-separator
      align-self stretch
      border-left 1px solid $bc-1
      margin 0 $md

    .product-list
      flex auto
      min-width 0

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
  .product-list
    display grid
    gap 1rem
    grid-template-columns repeat(auto-fill, minmax(250px, 1fr))
    scroll-behavior smooth

    .product-item
      .product-link
        display block
        height 100%
</style>
