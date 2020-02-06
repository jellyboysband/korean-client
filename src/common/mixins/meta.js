/* eslint-disable no-underscore-dangle */
const state = {}
const nodeList = []

const getLastValueInMap = (map) => Array.from(map)[map.size - 1]?.[1]

const createMetaNode = (props) => {
  const node = document.createElement('meta')
  Object.entries(props).forEach(([key, value]) => node.setAttribute(key, value))
  return node
}

const addMetaNode = (node) => document.head.appendChild(node)

const removeMetaNode = (node) => document.head.removeChild(node)

const updateMeta = () => {
  const newNodeList = Object
    .values(state)
    .map(getLastValueInMap)
    .filter((it) => !!it)

  nodeList.forEach(removeMetaNode)
  nodeList.splice(0, nodeList.length, ...newNodeList)
  nodeList.forEach(addMetaNode)
}


export default {
  mounted() {
    const { meta } = this.$options
    if (!meta) return

    Object.entries(meta)
      .forEach(([key, props]) => {
        const node = createMetaNode(props)
        if (!(key in state)) state[key] = new Map()
        state[key].set(this._uid, node)
      })

    updateMeta()
  },

  beforeDestroy() {
    const { meta } = this.$options
    if (!meta) return

    Object.entries(meta)
      .forEach(([key]) => state[key].delete(this._uid))

    updateMeta()
  },
}
