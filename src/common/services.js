import wretch from 'wretch'

const request = wretch('/api')

export default {
  getBrandList: () => request.url('/brand').get().json(),
  getProductList: () => request.url('/products').get().json(),
}