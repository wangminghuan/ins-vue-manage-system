/*
 * @Author: zhangxiaoda
 * @Date: 2018-09-17 11:25:34
 * @Last Modified by: zhangxiaoda
 * @Last Modified time: 2018-10-26 11:20:54
 * @Desc 根据路由中的 mete 信息, 和按钮绑定的权限标记进行对比,判断是否显示
 */
import Vue from 'vue'
import Global from '@/config/global'

Vue.directive('has', {
  bind: (el, binding, vnode) => {
    // 获取当前按钮绑定的权限标记
    let marker = binding.value
    if (marker) {
      // 获取当前节点的上下文执行环境中的路由数据
      if (!Global.ACTION_MARKERS.includes(marker)) {
        if (el.parentNode) {
          el.parentNode.removeChild(el)
        }
      }
    } else {
      // 如果权限标记为空,则抛出异常,以确保所有需要权限控制的按钮拥有权限标记
      throw new Error('v-has must have a permission maker')
    }
  }
})
