<template lang="pug">
section.post-card
  figure.post-preview-container
    img.post-preview(
      :alt="post.name"
      :src="post.previewUrl"
      loading="lazy"
    )

  .post-info
    p.post-subtitle
      span.post-datetime {{ post.datetime | datetime }}
      |
      | /
      |
      span.post-category-name {{ category.name }}
    p.post-name {{ post.name }}
    p.post-description {{ post.description }}
</template>

<script>
import { mapGetters } from 'vuex'

import Post from '@/common/blog/models/Post'


export default {
  props: {
    post: {
      required: true,
      type: Post,
    },
  },

  computed: {
    ...mapGetters('blog', [
      'GetCategory',
    ]),

    category() {
      return this.GetCategory(this.post.categoryId)
    },
  },
}
</script>

<style lang="stylus" scoped>
.post-card
  display flex
  flex-direction column
  height 100%

.post-preview-container
  padding-top 100%
  position relative
  user-select none

  .post-preview
    bottom 0
    color $tc-3
    display block
    font-size $fs-xs
    height 100%
    left 0
    object-fit cover
    pointer-events none
    position absolute
    right 0
    top 0
    width 100%

.post-info
  display flex
  flex auto
  flex-direction column
  padding 1rem 0 .5rem
  position relative

  .post-subtitle
    serif()

    color #f5989d
    font-size $fs-sm
    font-style italic

  .post-name
    serif()

    font-size $fs-lg
    margin-bottom .75rem
    transition color .25s ease-in-out

    &:hover
      color #f5989d

  .post-description
    color $tc-2
    font-size $fs-sm
    font-weight 300
</style>
