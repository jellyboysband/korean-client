<template lang="pug" functional>
li.tree-node-item
  slot(
    :node="props.node"
  )
  ul.tree-node-children-list(
    v-if="props.node.isOpen"
  )
    TreeNode(
      v-for="node in props.node.childrenList"
      :key="node.id"
      :node="node"
      v-on="listeners"
    )
      template(
        v-slot="scope"
      )
        slot(
          v-bind="scope"
        )
</template>

<script>
import Vue from 'vue'

// const TreeNodeClass = class {
//   constructor({ id, isOpen, children }) {
//     this.id = id
//     this.isOpen = isOpen
//     this.childrenList = childrenList
//   }
// }

const TreeNode = {
  functional: true,

  props: {
    node: {
      required: true,
      type: Object,
      validator: ({ childrenList, isOpen }) => Array.isArray(childrenList) && typeof isOpen === 'boolean',
    },
  },
}

Vue.component('TreeNode', TreeNode)

// export { TreeNodeClass, TreeNode }
export default TreeNode
</script>
