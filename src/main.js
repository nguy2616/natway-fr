import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import Antd from 'ant-design-vue'
import router from './router'
import store from './store'
import i18n from './i18n'
import './assets/sass/index.sass'
import axios from 'axios'
import VueObserveVisibility from 'vue-observe-visibility'
import LyTab from 'ly-tab'
import Vue2TouchEvents from 'vue2-touch-events'

Vue.use(Vue2TouchEvents)

Vue.use(VueObserveVisibility)
Vue.prototype.$axios = axios

Vue.config.productionTip = false
Vue.use(Antd)
Vue.use(LyTab)

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
