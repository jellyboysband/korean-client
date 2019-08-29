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

  actions: {
    async Init({ dispatch }) {
      return Promise.all([
        dispatch('product/LoadBrandList'),
        dispatch('product/LoadProductList'),
      ])
    },
  },
}

export default new Vuex.Store(store)
