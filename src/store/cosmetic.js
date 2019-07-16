import services from '@/services'

const store = {
  namespaced: true,

  state: {
    BrandList: [],
    CosmeticList: [],
  },

  getters: {
    GetBrand: ({ BrandList }) => brandId => BrandList.find(it => it.id === brandId),
    GetCosmetic: ({ CosmeticList }) => cosmeticId => CosmeticList.find(it => it.id === cosmeticId),
  },

  mutations: {
    SetBrandList(state, brandList = []) {
      state.BrandList = brandList
    },
    SetCosmeticList(state, cosmeticList = []) {
      state.CosmeticList = cosmeticList
    },
  },

  actions: {
    async LoadBrandList({ commit }) {
      const data = await services.getBrandList()
      commit('SetBrandList', data)
    },

    async LoadCosmeticList({ commit }) {
      const data = await services.getCosmeticList()
      commit('SetCosmeticList', data)
    },
  },
}

export default store
