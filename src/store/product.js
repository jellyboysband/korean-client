import services from '@/services'

const store = {
  namespaced: true,

  state: {
    BrandList: [],
    ProductList: [{
      id: 1,
      brand: {
        name: 'La\'Dor',
      },
      avatarUrl: 'https://images.ua.prom.st/1380248946_w640_h640_filler-dlya-volos.jpg',
      name: 'Perfect Hair FILL-UP',
      description: 'Филлер для быстрого восстановления волос в ампуле',
      price: 9999,
    }],
  },

  getters: {
    GetBrand: ({ BrandList }) => brandId => BrandList.find(it => it.id === brandId),
    GetProduct: ({ ProductList }) => productId => ProductList.find(it => it.id === productId),
  },

  mutations: {
    SetBrandList(state, brandList = []) {
      state.BrandList = brandList
    },
    SetProductList(state, productList = []) {
      state.ProductList = productList
    },
  },

  actions: {
    async LoadBrandList({ commit }) {
      const data = await services.getBrandList()
      commit('SetBrandList', data)
    },

    async LoadProductList({ commit }) {
      const data = await services.getProductList()
      commit('SetProductList', data)
    },
  },
}

export default store
