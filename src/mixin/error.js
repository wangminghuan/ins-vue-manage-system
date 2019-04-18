/*
 * @Author: zhangxiaoda
 * @Date: 2018-09-17 15:02:45
 * @Last Modified by: zhangxiaoda
 * @Last Modified time: 2018-12-25 10:52:43
 * @Desc 向全局组件注入异常处理
 */
import Vue from 'vue'

Vue.mixin({
  data: () => ({
    asyncPending: 0
  }),

  beforeCreate () {
    if (process && process.env && process.env.NODE_ENV === 'developmen') { // 如果是开发环境就不提示
      return
    }

    const methods = this.$options.methods
    for (const key of Object.keys(methods || {})) {
      const method = methods[key]
      if (method._busyTracked) return
      const wrappedMethod = function (...args) {
        const result = method.apply(this, args)
        const isPromise = result && typeof result.then === 'function'
        if (!isPromise) return result

        return new Promise(async (resolve, reject) => {
          this.asyncPending++
          try {
            resolve(await result)
          } catch (error) {
            if (!error._handled && Vue.config.errorHandler) {
              Vue.config.errorHandler(error)
              if (error.hasOwnProperty('_handled')) {
                error._handled = true
              }
            }
            reject(error)
          }
          this.asyncPending--
        })
      }
      this.$options.methods[key] = wrappedMethod
      wrappedMethod._busyTracked = true
    }
  }
})
