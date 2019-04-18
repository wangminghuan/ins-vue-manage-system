/*
 * @Author: zhangxiaoda
 * @Date: 2018-09-17 15:02:45
 * @Last Modified by: zhangxiaoda
 * @Last Modified time: 2019-02-12 15:57:46
 * @Desc 向全局组件注入数据
 */
import Vue from 'vue'
import Rule from '@/config/rule'
import Dict from '@/config/dict'

Vue.mixin({
  data () {
    return {
      Rule: Rule,
      Dict: Dict,
      disablePickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        }
      }
    }
  },

  /**
   * 为了满足修改后跳转到管理页面,我们做了一下处理,如果是二级菜单跳转二级菜单我们清楚缓存,否则使用默认缓存,现在缓存最大值为2
   * @param {*} to
   * @param {*} from
   * @param {*} next
   */
  beforeRouteLeave (to, from, next) {
    let toId = `${to.meta.id}`
    let fromId = `${from.meta.id}`
    if (toId.length === 4 && fromId.length === 4) {
      if (this.$vnode && this.$vnode.data.keepAlive) {
        if (this.$vnode.parent && this.$vnode.parent.componentInstance && this.$vnode.parent.componentInstance.cache) {
          this.$vnode.parent.componentInstance.cache = []
          this.$vnode.parent.componentInstance.keys = []
        }
      }
    }

    next()
  }
})
