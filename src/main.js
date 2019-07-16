import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import filters from './filters'
import './registerServiceWorker'
import '@styles/index.styl'

import VIcon from '@/elements/VIcon.vue'

store.commit('SetLang', 'ru' || window.localStorage.lang || navigator.language || navigator.userLanguage)
store.dispatch('Init')
Object.entries(filters(store.getters)).forEach(([key, value]) => Vue.filter(key, value))

Vue.component('VIcon', VIcon)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
