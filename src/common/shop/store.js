import setState from '@/common/lib/setState'
import api from '@/common/shop/api'


const store = {
  namespaced: true,

  state: {
    BrandList: [],
    CategoryList: [],
    ProductList: [],
    CartProductList: [],
  },

  getters: {
    GetBrand: ({ BrandList }) => (brandId) => BrandList.find((it) => it.id === brandId),

    GetCategory: ({ CategoryList }) => (categoryId) => CategoryList.find((it) => it.id === categoryId),

    GetProduct: ({ ProductList }) => (productId) => ProductList.find((it) => it.id === productId),

    GetExtra: (...[, { ExtraList }]) => (extraId) => ExtraList.find((it) => it.id === extraId),

    ExtraList: ({ ProductList }) => ProductList.map((it) => it.extraList).flat(),
  },

  mutations: {
    AddCartProduct({ CartProductList }, { productId, extraId, count }) {
      const cart = CartProductList.find((it) => it.productId === productId && it.extraId === extraId)
      if (cart) cart.count += count
      else CartProductList.push({ count, productId, extraId })
    },

    ClearCardProductList(state) {
      state.CartProductList = []
    },

    RemoveCartProduct({ CartProductList }, cardProduct) {
      const index = CartProductList.indexOf(cardProduct)
      if (~index) CartProductList.splice(index, 1)
    },

    SetBrandList: setState('BrandList'),
    SetCategoryList: setState('CategoryList'),
    SetProductList: setState('ProductList'),
  },

  actions: {
    async CreateOrder({ commit, state }, { phone }) {
      const orderId = await api.createOrder({
        phone,
        cartProductList: state.CartProductList,
      })
      commit('ClearCardProductList')
      return orderId
    },

    async LoadBrandList({ commit }) {
      const data = await api.getBrandList()
      commit('SetBrandList', Object.freeze(data))
    },

    async LoadCategoryList({ commit }) {
      const data = await api.getCategoryList()
      commit('SetCategoryList', Object.freeze(data))
    },

    async LoadProductList({ commit }) {
      const data = await api.getProductList()
      commit('SetProductList', Object.freeze(data))
    },
  },
}

export default store
