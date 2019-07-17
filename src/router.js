import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Cosmetic from './views/Cosmetic.vue'

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
        brandId: +route.query.brand,
        search: route.query.search,
      }),
    },
    {
      path: '/cosmetic/:cosmeticId',
      name: 'cosmetic',
      component: Cosmetic,
      props: route => ({
        cosmeticId: +route.params.cosmeticId,
      }),
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { selector: to.hash, offset: { x: 0, y: 0 } }
    return { x: 0, y: 0 }
  },
})
