import Vue from 'vue'
import ElementUI from 'element-ui'
import App from './App'
import router from './router'
import filters from '@/filters'
import '@/assets/css/common.scss'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/element.scss'
import './directives'
import './mixin/source'
import './mixin/error'
import Handlers from './tools/handlers'
import 'babel-polyfill'
import Http from '@/tools/http'
import VueAreaLinkage from 'vue-area-linkage'
import 'vue-area-linkage/dist/index.css'
import moment from 'moment'

// 动态设置publicPath,模板中 window.resourceBaseUrl为最终结果
__webpack_public_path__ = window.resourceBaseUrl  // eslint-disable-line
Vue.use(VueAreaLinkage)
Vue.config.productionTip = false
Vue.use(ElementUI, { size: 'medium' })
Vue.prototype.$axios = Http
Vue.prototype.$moment = moment

Vue.config.errorHandler = Handlers.sysError

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

router.beforeEach((to, from, next) => {
  if (to.name) {
    document.title = `${to.name} - 保中宝`
  }
  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
