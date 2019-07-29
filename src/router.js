import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Product from './views/Product.vue'

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
      props: route => ({
        typeId: route.query.type,
        search: route.query.search,
      }),
    },
    {
      path: '/product/:productId',
      name: 'product',
      component: Product,
      props: route => ({
        productId: +route.params.productId,
      }),
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { selector: to.hash, offset: { x: 0, y: 0 } }
    return { x: 0, y: 0 }
  },
})
