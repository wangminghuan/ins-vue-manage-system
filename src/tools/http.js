/*
 * @Author: zhangxiaoda
 * @Date: 2018-09-18 10:29:33
 * @Last Modified by: zhangxiaoda
 * @Last Modified time: 2019-03-01 17:56:46
 */
import axios from 'axios'
import Cookie from 'js-cookie'
import { Message } from 'element-ui'
import Global from '@/config/global'
import API from '@/config/api'
import Common from '@/tools/common'
import Handlers from './handlers'

let Http = axios.create({
  baseURL: '/api',
  timeout: 30000
})

/**
 * @desc 认证此用户是否有访问该接口的权限
 * @param {*} marker 权限标记名称
 */
Http.auth = function (marker) {
  let markers = Global.ACTION_MARKERS // 获取当前用户 marker
  if (marker === 'session' || marker === 'login') return
  let user = Cookie.get('user')
  if (user) {
    user = JSON.parse(user)
    if (user.role_id === -1) return
  }
  if (!markers.includes(marker)) {
    Message.error('用户管理权限不足')
    console.log(marker)
    throw new Error('no auth')
  }
}

/**
 * @desc 如果 ajax 请求是 get 或者 delete 可能存在替换 url 的操作
 * @param {*} url
 * @param {*} params
 */
Http.urlReplace = function (url, params) {
  if (params && Object.keys(params).length > 0) {
    for (let key in params) {
      let value = encodeURIComponent(params[key])
      url = url.replace('{' + key + '}', value)
    }
  }
  return url
}

/**
 * @desc 向 URL 中添加 query String
 * @param {*} url
 * @param {*} params
 */
Http.qsStringify = function (url, params) {
  if (params && Object.keys(params).length > 0) {
    let index = 0
    for (let key in params) {
      if (params[key] !== null && params[key] !== undefined) {
        let value = encodeURIComponent(params[key])
        url += `${index === 0 ? '?' : '&'}${key}=${value}`
        index++
      }
    }
  }

  return url
}

/**
 * @desc 统一发送 ajax 请求,
 * @param {*} marker 接口的权限标记名称
 * @param {*} params 如果是 GET 或者 DELETE 的话,就转换成 queryString, 如果是 post 或者 put 就是
 * @param {*} path  接口的 url path 路径传递参数
 */
Http.send = async function (marker, params, path) {
  let ret = null
  params = params || {}
  if (marker) {
    Http.auth(marker)
    let config = Common.clone(API[marker])
    // 处理 URL 传参
    if (path && Object.keys(path).length > 0) {
      config.url = Http.urlReplace(config.url, path)
    }

    // 如果是 get 传参数就是 query string,如果是 post 就是 body
    if (params && Object.keys(params).length > 0) {
      if (config.method === 'post' || config.method === 'put') {
        config.data = params
      } else if (config.method === 'get') {
        config.url = Http.qsStringify(config.url, params)
      }
    }

    ret = await Http(config)
  }
  return ret
}

// 服务请求的拦截处理
Http.interceptors.request.use(
  config => {
    // config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    config.headers['Accept'] = 'application/json, text/plain, */*'
    config.headers['Content-Type'] = 'application/json'
    let token = Cookie.get('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    } else {
      if (!config.url === '/login') {
        window.location.href = '/'
      }
    }

    return config
  },
  error => {
    // 关闭全局 loading 状态
    Promise.reject(error)
  }
)

// 服务响应的拦截处理
Http.interceptors.response.use(
  response => {
    if (response.headers['content-type'] === 'application/json') {
      let data = response.data
      if (data instanceof Blob) {
        response.data = {
          status_code: 0
        }
      }

      if (response.data.status_code === 0) {
        return response.data
      } else if (response.data.status_code === 402) {
        Message.error('登录超时,请重新登录')
        Cookie.remove('user')
        Cookie.remove('token')
        window.location.href = '/'
      } else {
        Message.error(response.data.message)
      }
    } else {
      return response.data
    }

    return {}
  },
  error => {
    if (error.response && error.response.status === 401) {
      Message.error('登录超时')
      window.location.href = '/'
    } else if (error.response && error.response.status >= 500) {
      Handlers.ajaxError(error)
      Message.error('数据错误')
    } else {
      Handlers.ajaxError(error)
    }
    return Promise.reject(error)
  }
)

export default Http
