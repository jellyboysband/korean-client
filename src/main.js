import Vue from 'vue'
import store from '@/common/store'
import filters from '@/common/filters'
import '@/registerServiceWorker'

import VCollapse from '@/common/elements/VCollapse.vue'
import VIcon from '@/common/elements/VIcon.vue'

import '@/common/assets/styles/index.styl'


Vue.config.productionTip = false

Vue.component('VCollapse', VCollapse)
Vue.component('VIcon', VIcon)

store.commit('SetLang', 'ru' || window.localStorage.lang || navigator.language || navigator.userLanguage)
store.dispatch('Init')
Object.entries(filters(store.getters)).forEach(([key, value]) => Vue.filter(key, value))

const loadMobile = () => import('@/mobile')
const loadDesktop = () => import('@/desktop')

if (window.screen.width < 600) loadMobile()
else loadDesktop()
