import Vue from 'vue'
import Router from 'vue-router'

import Cart from '@/desktop/views/Cart.vue'
import Home from '@/desktop/views/Home.vue'
import OrderComplete from '@/desktop/views/OrderComplete.vue'
import Product from '@/desktop/views/Product.vue'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '*',
      redirect: { name: 'home' },
    },
    {
      path: '/',
      name: 'home',
      component: Home,
      props: (route) => ({
        categoryId: +route.query.categoryId,
        typeId: route.query.type,
        search: route.query.search,
      }),
    },
    {
      path: '/product/:productId',
      name: 'product',
      component: Product,
      props: (route) => ({
        productId: +route.params.productId,
      }),
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart,
    },
    {
      path: '/order/:orderId',
      name: 'order',
      component: OrderComplete,
      props: (route) => ({
        orderId: +route.params.orderId,
      }),
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { selector: to.hash, offset: { x: 0, y: 0 } }
    return { x: 0, y: 0 }
  },
})
