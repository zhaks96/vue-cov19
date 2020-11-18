import Vue from 'vue'
import App from './App.vue'
import store from './store/index'

import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import 'material-design-icons-iconfont'
import './assets/styles/style.scss'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store
}).$mount('#app')
