import Vue from 'vue'
import store from '@/common/store'
import router from '@/mobile/router'
import App from '@/mobile/App.vue'


new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
