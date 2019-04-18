import Http from './http'
import Cookie from 'js-cookie'

export default {
  sysError (error) {
    try {
      let user = JSON.parse(Cookie.get('user'))
      let params = {
        type: 'system',
        msg: error.toString(),
        url: window.location.href,
        user: {
          uid: user.u_id,
          name: user.u_name
        }
      }
      Http.post('/errlog', {err_data: JSON.stringify(params)})
    } catch (e) {
      console.log(e)
    }
  },

  ajaxError (error) {
    let config = error.config
    let response = error.response || {}
    delete response.config
    if (config.url === '/api/errlog' && config.method === 'post') return
    try {
      let user = JSON.parse(Cookie.get('user'))
      let params = {
        type: 'ajax',
        url: config.url,
        method: config.method,
        heanders: config.headers,
        data: config.data,
        href: window.location.href,
        uid: user.u_id,
        name: user.u_name,
        response: JSON.stringify(response)
      }
      Http.post('/errlog', {err_data: JSON.stringify(params)})
    } catch (error) {
      console.log('ajax error, i will try agein')
    }
  }
}
