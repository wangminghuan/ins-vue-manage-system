import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routerConfig = {
  routes: [
    {
      path: '/login',
      name: '登录',
      component: resolve => require(['@/pages/comm/PageLogin.vue'], resolve)
    },
    {
      path: '/',
      redirect: '/login'
    }
  ]
}

export default new Router(routerConfig)
