import Menu from '@/config/menu'
import API from '@/config/api'

export default {
  /**
   * @desc 校验身份证号是否合法
   * @param {String} idCardNum 18 位身份证号
   * @return {Boolean}
   */
  validateIdCardNum (idCardNum) {
    // 非法字符串
    if (typeof idCardNum !== 'string') return false
    // 所有身份证前两位代表的是地区
    let city = {11: '北京', 12: '天津', 13: '河北', 14: '山西', 15: '内蒙古', 21: '辽宁', 22: '吉林', 23: '黑龙江 ', 31: '上海', 32: '江苏', 33: '浙江', 34: '安徽', 35: '福建', 36: '江西', 37: '山东', 41: '河南', 42: '湖北 ', 43: '湖南', 44: '广东', 45: '广西', 46: '海南', 50: '重庆', 51: '四川', 52: '贵州', 53: '云南', 54: '西藏 ', 61: '陕西', 62: '甘肃', 63: '青海', 64: '宁夏', 65: '新疆', 71: '台湾', 81: '香港', 82: '澳门', 91: '国外'}
    let birthday = idCardNum.substr(6, 4) + '/' + Number(idCardNum.substr(10, 2)) + '/' + Number(idCardNum.substr(12, 2))
    let d = new Date(birthday)
    let newBirthday = d.getFullYear() + '/' + Number(d.getMonth() + 1) + '/' + Number(d.getDate())
    let currentTime = new Date().getTime()
    let time = d.getTime()
    // 身份证系数列表
    let arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
    // 设定身份证通过相加运算得到值对应的身份证最后一位的列表
    let arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']
    let sum = 0
    // 非法身份证
    if (!/^\d{17}(\d|x)$/i.test(idCardNum)) return false
    // 非法地区 非法地区
    if (city[idCardNum.substr(0, 2)] === undefined) return false
    // 非法生日
    if (time >= currentTime || birthday !== newBirthday) return false

    // 计算当前身份证最后一位的值
    for (let i = 0; i < 17; i++) {
      sum += idCardNum.substr(i, 1) * arrInt[i]
    }

    let residue = arrCh[sum % 11]
    // 非法身份证哦
    if (residue !== idCardNum.substr(17, 1)) return false

    return true
  },

  /**
   * @desc 校验手机号是否合法
   * @param {String} phoneNum 手机号
   * @return {Boolean}
   */
  validatePhoneNum (phoneNum) {
    let reg = /^1[3|4|5|7|8][0-9]{9}$/
    return reg.test(phoneNum)
  },

  /**
   * @desc 根据身份证号码获取个人信息,目前仅限于性别, 出生日期
   * @param {String} idCardNum 身份证号码
   * @return {Object}
   */
  getPersonByIdCardNum (idCardNum) {
    if (this.validateIdCardNum(idCardNum)) {
      let birthday = idCardNum.substr(6, 4) + '-' + idCardNum.substr(10, 2) + '-' + idCardNum.substr(12, 2)
      let sex = Number(idCardNum.substr(16, 1))
      return {
        birthday: birthday,
        sex: sex % 2 === 0 ? 2 : 1
      }
    }
  },

  /**
   * 深拷贝
   * @param {*} obj
   */
  clone (obj) {
    let objClone = Array.isArray(obj) ? [] : {}
    if (obj && typeof obj === 'object') {
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          if (obj[key] && typeof obj[key] === 'object') {
            objClone[key] = this.clone(obj[key])
          } else {
            objClone[key] = obj[key]
          }
        }
      }
    }

    return objClone
  },

  /**
   * 获取前端所有权限标记
   */
  getSuperMarker () {
    let markers = []
    for (let i = 0; i < Menu.length; i++) {
      let marker = Menu[i].marker
      if (marker && !markers.includes(marker)) {
        markers.push(marker)
      }
    }

    for (let key in API) {
      if (!markers.includes(key)) {
        markers.push(key)
      }
    }

    return markers
  },

  getRoleAllMarker () {
    let markers = []
    for (let i = 0; i < Menu.length; i++) {
      if (Menu[i].isSuper) continue // 如果是只有超级用户才有的权限就跳过
      let marker = Menu[i].marker
      if (marker && !markers.includes(marker)) {
        markers.push(marker)
      }
    }

    for (let key in API) {
      if (!markers.includes(key)) {
        markers.push(key)
      }
    }

    return markers
  },

  /**
   * 下载文件
   */
  downloadFile (data, fileName) {
    if (navigator.msSaveBlob) { // 如果是 IE 浏览器, IE 不支持 a 标签的 download 属性
      return navigator.msSaveBlob(data, fileName)
    }
    var alink = document.createElement('a')
    let blob = new Blob([data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'})
    var href = window.URL.createObjectURL(blob) // 创建下载的链接
    alink.setAttribute('download', fileName)
    alink.setAttribute('href', href)
    document.body.appendChild(alink)
    alink.click()
    window.URL.revokeObjectURL(href) // 释放掉 blob 对象
    document.body.removeChild(alink)
  },

  /**
   * 深拷贝
   * @param {*} obj
   */
  clear (obj) {
    let objClone = Array.isArray(obj) ? [] : {}
    if (obj && typeof obj === 'object') {
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          if (obj[key] && typeof obj[key] === 'object') {
            objClone[key] = this.clear(obj[key])
          } else {
            objClone[key] = null
          }
        }
      }
    }

    return objClone
  },

  /**
   * 获取昨天开始-结束日期
  */
  getStartDate (vm) {
    let time = vm.$moment().subtract(1, 'days').format('YYYY-MM-DD')
    return time
  },

  /**
   * 获取上周开始-结束日期
  */
  getStartWeek (vm) {
    let weekOfday = parseInt(vm.$moment().format('d'))
    if (weekOfday === 0) { weekOfday = 7 }
    let start = vm.$moment().subtract(weekOfday + 6, 'days').format('YYYY-MM-DD')
    let end = vm.$moment().subtract(weekOfday, 'days').format('YYYY-MM-DD')
    return [start, end]
  },

  /**
   *
   * 获取上月开始-结束日期
   */
  getStartMonth () {
    let myDate = new Date()
    let years = myDate.getFullYear()
    let month = myDate.getMonth()
    let nowdays = new Date(years, month, 0)
    let lastDay = nowdays.getDate()
    return [years, month, 1, lastDay]
  },

  /**
   * 季度开始-结束日期
  */
  getStartSeason () {
    let myDate = new Date()
    let years = myDate.getFullYear()
    let month = myDate.getMonth() - 1
    let nowdays = new Date(years, month, 0)
    let lastDay = nowdays.getDate()
    return [years, month, 1, lastDay]
  },

  /**
    * 年报表开始-结束日期
  */
  getStartYears () {
    let myDate = new Date()
    let years = myDate.getFullYear()
    let month = myDate.getMonth()
    let nowdays = new Date(years, month, 0)
    let lastDay = nowdays.getDate()
    return [years - 1, month, 1, lastDay]
  }
}
