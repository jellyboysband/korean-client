import Vue from 'vue'
import Vuex from 'vuex'

import blog from '@/common/blog/store'
import shop from '@/common/shop/store'
import lang from '@/common/store/lang'

Vue.use(Vuex)

const store = {
  modules: {
    blog,
    shop,
    lang,
  },

  state: {
    initialized: false,
  },

  mutations: {
    initialize(state) {
      state.initialized = true
    },
  },

  actions: {
    async Init({ commit, dispatch }) {
      return Promise.all([
        dispatch('shop/LoadBrandList'),
        dispatch('shop/LoadCategoryList'),
        dispatch('shop/LoadProductList'),
        dispatch('blog/LoadCategoryList'),
        dispatch('blog/LoadPostList'),
      ])
        // .then(() => commit('shop/AddCartProduct', { productId: 15, extraId: 15, count: 3 }))
        .then(() => commit('initialize'))
    },
  },
}

export default new Vuex.Store(store)
