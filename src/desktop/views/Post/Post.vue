<template lang="pug">
article#post(v-if="post")
  main.post-content
    p.post-subtitle {{ post.datetime | datetime }} / {{ category.name }}
    h1.post-name {{ post.name }}

    figure.post-preview-container
      img.post-preview(
        :src="post.previewUrl"
      )

    p.post-description(
      v-html="post.content"
    )
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    postId: {
      required: true,
      type: Number,
    },
  },

  computed: {
    ...mapGetters('blog', [
      'GetCategory',
      'GetPost',
    ]),

    category() {
      return this.GetCategory(this.post.categoryId)
    },

    post() {
      return this.GetPost(this.postId)
    },
  },
}
</script>

<style lang="stylus" scoped>
#post
  container()

  padding-bottom 5rem
  padding-top 5rem

.post-content
  margin 0 auto
  max-width 80ch

.post-subtitle
  serif()

  color #f5989d
  font-size $fs-lg
  font-style italic

.post-name
  serif()

  font-size 2rem
  margin-bottom 2rem
  transition color .25s ease-in-out

.post-preview-container
  margin-bottom 2rem

.post-description
  font-size $fs-lg
  line-height 1.5
</style>
