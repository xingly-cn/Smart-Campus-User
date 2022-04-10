import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/iview.js'

Vue.config.productionTip = false

import './style/global.css'

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
