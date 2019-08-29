import Vue from 'vue'
import store from '@/common/store'
import router from '@/desktop/router'
import App from '@/desktop/App.vue'


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
