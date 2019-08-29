import services from '@/common/services'

const store = {
  namespaced: true,

  state: {
    BrandList: [],
    ProductList: [
      {
        id: 1,
        brand: {
          name: 'La\'Dor',
        },
        avatarUrl: 'https://images.ua.prom.st/1380248946_w640_h640_filler-dlya-volos.jpg',
        name: 'Perfect Hair FILL-UP',
        description: 'Филлер для быстрого восстановления волос в ампуле',
        price: 9999,
      },
      {
        id: 2,
        brand: {
          name: 'La\'Dor',
        },
        avatarUrl: 'https://images.ua.prom.st/1380248946_w640_h640_filler-dlya-volos.jpg',
        name: 'Perfect Hair FILL-UP',
        description: 'Филлер для быстрого восстановления волос в ампуле',
        price: 9999,
      },
    ],
    CartProductList: [],
  },

  getters: {
    GetBrand: ({ BrandList }) => brandId => BrandList.find(it => it.id === brandId),
    GetProduct: ({ ProductList }) => productId => ProductList.find(it => it.id === productId),
  },

  mutations: {
    AddCartProduct({ CartProductList }, { product, count }) {
      const cart = CartProductList.find(it => it.product === product)
      if (cart) cart.count += count
      else CartProductList.push({ count, product })
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
