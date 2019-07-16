<template lang="pug">
    ul.cosmetic-list
      li.cosmetic-item(
        v-for="cosmetic in cosmeticList"
        :key="cosmetic.id"
      )
        section.cosmetic-card
          span.cosmetic-place {{ cosmetic.place }}
          h6.cosmetic-name {{ cosmetic.name }}
          p.cosmetic-description {{ cosmetic.description }}
          p.cosmetic-price {{ cosmetic.price | number }} ₽

</template>

<script>
export default {
  data() {
    return {
      cosmeticList: [
        {
          id: 1,
          name: 'Увлажняющий крем для рук',
          description: 'Premium Silhouette Обертывание. Цитрусовая паста для обе­ртывания Fat Burner - Сжигает подкожный жир, предотвра­щает возникновение застоя жидкости в тканях. Устраняет эффе­кт «апельсиновой корки».',
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
.cosmetic-list
  padding 1.25rem
  scroll-behavior smooth

  .cosmetic-item
    &:not(:first-child)
      margin-top 1rem

    &:not(:last-child)
      border-bottom 1px solid $bc-1
      padding-bottom 1rem

    .cosmetic-card
      font-weight 600

      .cosmetic-place
        font-size .75rem
        margin-bottom .25rem
        opacity .7

      .cosmetic-name
        font-size 1rem
        font-weight inherit
        margin-bottom .75rem

      .cosmetic-description
        color $tc-2
        font-size .75rem
        font-weight 400
        margin-bottom .75rem

      .cosmetic-price
        font-size 1.5rem
        font-weight 400
</style>
