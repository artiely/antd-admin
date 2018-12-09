import axios from 'axios'
import router from '@/router'
import Cookies from 'js-cookie'
import NProgress from 'nprogress'
import { notification } from 'ant-design-vue'
import 'nprogress/nprogress.css'
// import isJSON from 'is-json'
var isProduction = process.env.NODE_ENV === 'production'
const baseURL = isProduction ? 'http://182.61.137.53:9003/ucar' : '/ucar'
// const baseURL = 'https://charger.91231.net'

export default function fetch(options) {
  return new Promise((resolve, reject) => {
    const instance = axios.create({
      baseURL: baseURL,
      headers: {
        // 'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      validateStatus: function(status) {
        console.log('status', status)
        // return status >= 200 && status < 500 // default
        return status === 200
      },
      transformResponse: [
        //   (data) => {
        //   var flag = isJSON(data)
        //   /* 后台的逻辑, 返回的是报错页面和登录页面就直接跳转登录 */
        //   if (!flag) {
        //     console.log('跑到登录逻辑了')
        //     Cookies.remove('__userInfo')
        //     router.replace({
        //       name: 'Login'
        //     })
        //     return {
        //       code: 1000,
        //       msg: '请登录'
        //     }
        //   } else {
        //     return JSON.parse(data)
        //   }
        // }
      ]
    })
    instance.interceptors.request.use(
      config => {
        NProgress.start()
        const token = Cookies.get('token')
        // console.log('----', token)
        // 这里将token设置到headers中，header的key是Authorization，这个key值根据你的需要进行修改即可
        if (token) {
          config.headers.token = `${token}`
        }
        return config
      },
      error => {
        // console.error(`来自请求的错误:${error}`)
        return Promise.reject(error)
      }
    )

    instance.interceptors.response.use(
      response => {
        // console.log('响应结果', response)
        return response
      },
      error => {
        // console.error(`来自响应的的错误:${error}`)
        return Promise.reject(error)
      }
    )

    // 请求处理
    instance(options)
      .then(res => {
        NProgress.done()
        if (res.data.code === 401) {
          notification['error']({
            message: '登录已过期',
            placement: 'bottomRight',
            description: res.data.msg
          })
          Cookies.remove('token')
          router.replace({
            name: 'Login'
          })
        } else if (res.data.code === 500) {
          notification['error']({
            message: '出错了',
            placement: 'bottomRight',
            description: res.data.msg
          })
        }
        resolve(res.data)
        return false
      })
      .catch(error => {
        NProgress.done()
        console.error(`来自响应结果的错误:${error}`)
        reject(error)
      })
  })
}
