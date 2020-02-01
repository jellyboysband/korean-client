import Vue from 'vue'
import Vuex from 'vuex'

import product from '@/common/store/product'
import lang from '@/common/store/lang'

Vue.use(Vuex)

const store = {
  modules: {
    product,
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
        dispatch('product/LoadBrandList'),
        dispatch('product/LoadCategoryList'),
        dispatch('product/LoadProductList'),
      ]).then(() => commit('initialize'))
    },
  },
}

export default new Vuex.Store(store)
