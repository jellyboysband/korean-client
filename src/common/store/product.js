import services from '@/common/services'


const store = {
  namespaced: true,

  state: {
    BrandList: [],
    ProductList: [],
    CartProductList: [],
  },

  getters: {
    GetBrand: ({ BrandList }) => brandId => BrandList.find(it => it.id === brandId),
    GetProduct: ({ ProductList }) => productId => ProductList.find(it => it.id === productId),
  },

  mutations: {
    AddCartProduct({ CartProductList }, { productId, count }) {
      const cart = CartProductList.find(it => it.productId === productId)
      if (cart) cart.count += count
      else CartProductList.push({ count, productId })
    },
    ClearCardProductList() {
      this.CartProductList = []
    },
    RemoveCartProduct({ CartProductList }, cardProduct) {
      const index = CartProductList.indexOf(cardProduct)
      if (~index) CartProductList.splice(index, 1)
    },
    SetBrandList(state, brandList = []) {
      state.BrandList = brandList
    },
    SetProductList(state, productList = []) {
      state.ProductList = productList
    },
  },

  actions: {
    async CreateOrder({ commit, state }, { phone }) {
      const data = await services.createOrder({
        phone,
        list: state.CartProductList,
      })
      commit('ClearCardProductList')
      return data.orderId
    },

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
