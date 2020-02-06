<template lang="pug">
article#home
  section.promo-carousel
    Swiper(
      :options="swiperOption"
    )
      SwiperSlide(
        v-for="promo in promoList"
        :key="promo"
      )
        //- RouterLink.promo-link(
        //-   :to="{ name: 'product', query: { productId: 1 } }"
        //- )
        img.promo-preview(
          :src="promo"
        )
      //- .swiper-button-prev(
      //-   slot="button-prev"
      //- )
      //- .swiper-button-next(
      //-   slot="button-next"
      //- )
      .swiper-pagination(
        slot="pagination"
      )

  ul.product-list
    li.product-item(
      v-for="product in ProductList.slice(0, 12)"
      :key="product.id"
    )
      RouterLink.product-link(
        :to="{ name: 'product', params: { productId: product.id } }"
      )
        ProductCard(
          :product="product"
        )

  hr.separator

</template>

<script>
import { mapState } from 'vuex'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

import ProductCard from '@/desktop/components/product/ProductCard.vue'

import promo1Image from '@/common/assets/images/promo/1.png'
import promo2Image from '@/common/assets/images/promo/2.png'
import promo3Image from '@/common/assets/images/promo/3.png'


export default {
  components: {
    ProductCard,
    Swiper: swiper,
    SwiperSlide: swiperSlide,
  },

  data() {
    return {
      promoList: [
        promo1Image,
        promo2Image,
        promo3Image,
      ],
      swiperOption: {
        loop: true,
        slidesPerView: 1,
        spaceBetween: 32,

        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },

        pagination: {
          el: '.swiper-pagination',
          type: 'fraction',
        },

      //   navigation: {
      //     prevEl: '.swiper-button-prev',
      //     nextEl: '.swiper-button-next',
      //   },
      },
    }
  },

  computed: {
    ...mapState('shop', [
      'ProductList',
    ]),
  },
}
</script>

<style lang="stylus" scoped>
#home
  padding 2rem

  container()

.separator
  border-top 1px solid #ebebeb
  margin 3rem 0

.promo-carousel
  margin-bottom 2rem

  .promo-preview
    display block
    width 100%

  .swiper-pagination
    text-decoration underline

.product-list
  display grid
  gap 2rem
  grid-template-columns repeat(auto-fill, minmax(250px, 1fr))
  scroll-behavior smooth

  .product-item
    .product-link
      display block
      height 100%
</style>
