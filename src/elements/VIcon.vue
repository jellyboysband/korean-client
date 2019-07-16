<script>
import Vue from 'vue'

const cached = Vue.observable({})

export default {
  functional: true,

  props: {
    icon: {
      type: [String, Number],
      required: true,
    },
    baseline: Boolean,
    inline: Boolean,
    square: Boolean,
  },

  render(h, ctx) {
    const name = ctx.props.icon

    if (!(name in cached)) {
      Vue.set(cached, name, null)
      import(`@icons/${name}.svg`).then(({ default: icon }) => Vue.set(cached, name, icon))
    }
    const icon = cached[name]

    return h(icon, {
      attrs: {
        'aria-hidden': 'true',
        focusable: 'false',
        role: 'img',
      },
      class: [
        ctx.data.staticClass,
        ctx.data.class,
        'icon',
        `icon-${name.split('/').join('-')}`,
        {
          baseline: ctx.props.baseline,
          inline: ctx.props.inline,
          square: ctx.props.square,
        },
      ],
      on: ctx.listeners,
    })
  },
}
</script>

<style lang="stylus">
.icon
  display block
  fill currentColor
  flex none
  height 1em
  overflow visible

  &.baseline
    transform translateY(.14em)

  &.inline
    display inline

    &:not(:first-child)
      margin-left .5em

    &:not(:last-child)
      margin-right .5em

  &.square
    width 1em
</style>
