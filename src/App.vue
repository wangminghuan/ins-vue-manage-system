<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
import Cookie from 'js-cookie'
import defaultMenu from '@/config/menu'
import router from '@/router'
import pages from '@/pages'
import BaseLayout from '@/components/base/BaseLayout'
import Global from '@/config/global'
import Common from '@/tools/common'

export default {
  created () {
    this.init()
  },

  methods: {
    async init () {
      let token = Cookie.get('token')
      if (token) {
        await this.getSession()
      } else {
        this.$router.push({name: '登录'})
      }
    },

    async getSession () {
      let user = JSON.parse(Cookie.get('user'))
      let ret = await this.$axios.send('session', '', {id: user.u_id})
      if (ret && ret.status_code === 0) {
        let permission = []
        if (ret.result.role_id === -1) {
          permission = Common.getSuperMarker()
        } else {
          permission = ret.result.r_permission ? JSON.parse(ret.result.r_permission) : []
        }
        Global.ACTION_MARKERS = permission
        let permissionRouterConfig = [
          {
            path: '/app',
            name: 'Layout',
            component: BaseLayout,
            children: [
              {
                path: '/app/default',
                name: 'Default',
                component: pages.PageDefault
              }
            ]
          }
        ]

        // 服务初始化的时候批量注把页面入到路由器中
        for (let i = 0; i < defaultMenu.length; i++) {
          let item = defaultMenu[i]
          item.meta.id = item.id
          if (permission.includes(item.marker) && item.component) {
            item.component = pages[item.component]
            permissionRouterConfig[0].children.push(item)
          }
        }

        router.addRoutes(permissionRouterConfig)
      }
    }
  }
}
</script>

<style>
  body {
    padding: 0;
    margin: 0;
  }
</style>
