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

    GetExtra: ({ ProductList }) => extraId => ProductList
      .map(it => it.extraList)
      .flat()
      .find(it => it.id === extraId),
  },

  mutations: {
    AddCartProduct({ CartProductList }, { productId, extraId, count }) {
      const cart = CartProductList.find(it => it.productId === productId && it.extraId === extraId)
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

    SetBrandList(state, brandList = []) {
      state.BrandList = brandList
    },

    SetProductList(state, productList = []) {
      state.ProductList = productList
    },
  },

  actions: {
    async CreateOrder({ commit, state }, { phone }) {
      const orderId = await services.createOrder({
        phone,
        cartProductList: state.CartProductList,
      })
      commit('ClearCardProductList')
      return orderId
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
