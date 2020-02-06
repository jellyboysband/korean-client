import Vue from 'vue'
import Router from 'vue-router'

import Blog from '@/desktop/views/Blog/Blog.vue'
import Cart from '@/desktop/views/Cart/Cart.vue'
import Home from '@/desktop/views/Home/Home.vue'
import OrderComplete from '@/desktop/views/OrderComplete/OrderComplete.vue'
import Post from '@/desktop/views/Post/Post.vue'
import Product from '@/desktop/views/Product/Product.vue'
import Shop from '@/desktop/views/Shop/Shop.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      name: 'default',
      path: '*',
      redirect: { name: 'home' },
    },
    {
      name: 'home',
      path: '/',
      component: Home,
    },
    {
      name: 'shop',
      path: '/shop',
      component: Shop,
      props: (route) => ({
        categoryId: Number(route.query.categoryId ?? 0),
        page: Number(route.query.page ?? 1),
        search: route.query.search ?? '',
      }),
    },
    {
      name: 'product',
      path: '/product/:productId',
      component: Product,
      props: (route) => ({
        productId: +route.params.productId,
      }),
    },
    {
      name: 'cart',
      path: '/cart',
      component: Cart,
    },
    {
      name: 'blog',
      path: '/blog',
      component: Blog,
      props: (route) => ({
        categoryId: Number(route.query.categoryId ?? 0),
        page: Number(route.query.page ?? 1),
        search: route.query.search ?? '',
      }),
    },
    {
      name: 'post',
      path: '/post/:postId',
      component: Post,
      props: (route) => ({
        postId: +route.params.postId,
      }),
    },
    {
      name: 'order',
      path: '/order/:orderId',
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
