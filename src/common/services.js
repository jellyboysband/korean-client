import wretch from 'wretch'

import Brand from '@/common/models/Brand'
import Product from '@/common/models/Product'


const request = wretch('/api')


export default {
  createOrder: ({ phone, cartProductList }) => request
    .url('/order')
    .post({
      phone,
      list: cartProductList,
    })
    .json()
    .then(response => response.id),

  getBrandList: () => request
    .url('/brands')
    // .query({
    //   limit: 100,
    //   offset: 0,
    //   order: ['id'],
    // })
    .get()
    .json()
    .then(response => response.list.map(brand => new Brand(brand))),

  getProductList: ({ brandId } = {}) => request
    .url('/products')
    .query(JSON.parse(JSON.stringify({
      brandId,
      // limit: 100,
      // offset: 0,
      // order: ['id'],
    })))
    .get()
    .json()
    .then(response => response.list.map(product => new Product({
      ...product,
      extraList: product.extras,
      tagList: product.tags,
    }))),

  getProduct: ({ productId }) => request
    .url(`/products/${productId}`)
    .get()
    .json()
    .then(response => new Product(response)),
}
