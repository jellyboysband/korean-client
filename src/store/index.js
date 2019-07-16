import Vue from 'vue'
import Vuex from 'vuex'

import cosmetic from '@/store/cosmetic'
import lang from '@/store/lang'

Vue.use(Vuex)

const store = {
  modules: {
    cosmetic,
    lang,
  },

  actions: {
    async Init({ dispatch }) {
      return Promise.all([
        dispatch('cosmetic/LoadBrandList'),
        dispatch('cosmetic/LoadCosmeticList'),
      ])
    },
  },
}

export default new Vuex.Store(store)
