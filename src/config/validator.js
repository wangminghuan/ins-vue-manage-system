/*
 * @Author: zhangxiaoda
 * @Date: 2018-09-17 14:17:14
 * @Last Modified by: zhangxiaoda
 * @Last Modified time: 2018-10-24 17:19:54
 * @Desc 是所有的自定义校验器都放这里
 */
import Common from '@/tools/common'

export default {

  idCard (rule, value, callback) {
    if (!Common.validateIdCardNum(value)) {
      callback(new Error())
    } else {
      callback()
    }
  },

  phone (rule, value, callback) {
    if (!Common.validatePhoneNum(value)) {
      callback(new Error())
    } else {
      callback()
    }
  },

  async isFloat (rule, value, callback) {
    let reg = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/
    if (reg.test(value)) {
      callback()
    } else {
      callback(new Error())
    }
  }

}
