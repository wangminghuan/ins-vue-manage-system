import Dict from '@/config/dict'

const dateFormat = function (value) {
  if (value) {
    return new Date(value).toLocaleDateString()
  }
  return ''
}

/**
 * @desc 业务字典过滤器
 * @param {*} value 类别中的结果,对应字典中的 Value
 * @param {*} dictKey  业务字典的 key
 */
const dict = function (value, dictKey) {
  if (!value && value !== 0) return ''
  if (Dict.hasOwnProperty(dictKey)) {
    let arr = Dict[dictKey]
    try {
      value = parseInt(value)
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].value === value) {
          return arr[i].label
        }
      }
    } catch (e) {
      console.log(e)
    }
  }

  return value
}

export default {
  dateFormat,
  dict
}
