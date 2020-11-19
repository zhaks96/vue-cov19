import Vue from 'vue'
import App from './App.vue'
import store from './store/index'
import SequentialEntrance from "vue-sequential-entrance";
import "vue-sequential-entrance/vue-sequential-entrance.css";

import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import 'material-design-icons-iconfont'
import './assets/styles/style.scss'

Vue.config.productionTip = false

Vue.use(SequentialEntrance)

new Vue({
  render: h => h(App),
  store
}).$mount('#app')
