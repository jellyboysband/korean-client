import wretch from 'wretch'

import Brand from '@/common/models/Brand'
import Category from '@/common/models/Category'
import Product from '@/common/models/Product'
import ProductExtra from '@/common/models/ProductExtra'


const request = wretch('/api')


export default {
  createOrder: ({ phone, cartProductList }) => request
    .url('/order')
    .post({
      phone,
      list: cartProductList,
    })
    .json()
    .then((response) => response.id),

  getBrandList: () => request
    .url('/brands')
    // .query({
    //   limit: 100,
    //   offset: 0,
    //   order: ['id'],
    // })
    .get()
    .json()
    .then((response) => response.list.map((brand) => new Brand(brand))),

  getCategoryList: () => request
    .url('/categories')
    .get()
    .json()
    .then((response) => response.list.map((category) => new Category(category))),

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
    .then((response) => response.list.map((product) => new Product({
      ...product,
      brandId: product.brand.id,
      categoryIdList: product.categories.map((category) => category.id),
      extraList: product.extras.map((extra) => new ProductExtra(extra)),
    }))),

  getProduct: ({ productId }) => request
    .url(`/products/${productId}`)
    .get()
    .json()
    .then((response) => new Product(response)),
}
