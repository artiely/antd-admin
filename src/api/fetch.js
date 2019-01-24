// import router from '@/router'
import { notification } from 'ant-design-vue'
import axios from 'axios'
import Cookies from 'js-cookie'
import NProgress from 'nprogress'
import qs from 'qs'
import 'nprogress/nprogress.css'
import BASE_URL from './config'
import router from '../router'
NProgress.configure({
  showSpinner: false,
})

const CancelToken = axios.CancelToken
let requestMap = new Map()
let prevTime = new Date().getTime()

export default function fetch(options) {
  // 100ms以内的重复请求都会被清空
  let nowTime = new Date().getTime()
  if (nowTime - prevTime >= 100) {
    requestMap = new Map()
  }
  // 赋值下一次请求的时间
  prevTime = nowTime

  return new Promise((resolve, reject) => {
    const instance = axios.create({
      baseURL: BASE_URL,
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      validateStatus: function(status) {
        // return status >= 200 && status <= 500 // default 国外标准restful需要
        return status === 200
      },
      responseType: 'json',
      responseEncoding: 'utf8', // default
      // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
      transformResponse: [
        data => {
          // 此处可以拦截某些状态做相应处理
          if (data) {
            return data
          } else {
            return {
              status: 4,
            }
          }
        },
      ],
      // `timeout` specifies the number of milliseconds before the request times out.
      // If the request takes longer than `timeout`, the request will be aborted.
      timeout: 6000, // default is `0` (no timeout)

      // `withCredentials` indicates whether or not cross-site Access-Control requests
      // should be made using credentials
      withCredentials: false, // default
    })
    instance.interceptors.request.use(
      config => {
        // 防重复提交(100ms以内我们防止相同的请求提交)
        const keyString = qs.stringify(
          Object.assign({}, { url: config.url, data: config.data })
        )
        if (requestMap.get(keyString)) {
          // 取消当前请求
          config.cancelToken = new CancelToken(cancel => {
            console.log('关闭的请求', keyString)
            cancel('Please slow down a little')
          })
        }
        requestMap.set(keyString, true)
        Object.assign(config, { _keyString: keyString })

        NProgress.start()
        // 这里将token设置到headers中，header的key是Authorization，这个key值根据你的需要进行修改即可
        const token = Cookies.get('token')
        if (token) {
          config.headers.token = `${token}`
        }
        // 参数进行序列化 按照自己项目需求
        // config.data = qs.stringify(config.data, {
        //   arrayFormat: 'indices',
        //   allowDots: true,
        // })

        return config
      },
      error => {
        return Promise.reject(error)
      }
    )

    instance.interceptors.response.use(
      response => {
        return response
      },
      error => {
        return Promise.reject(error)
      }
    )

    // 请求处理
    instance(options)
      .then(res => {
        NProgress.done()
        // 此处可以处理一些全局state
        // if (res.data.code === 401) {
        //   notification['error']({
        //     message: '登录已过期',
        //     placement: 'bottomRight',
        //     description: res.data.msg,
        //   })
        //   Cookies.remove('token')
        //   router.replace({
        //     name: 'Login',
        //   })
        // } else if (res.data.code === 500) {
        //   notification['error']({
        //     message: '出错了',
        //     placement: 'bottomRight',
        //     description: res.data.msg,
        //   })
        // }
        if (res.status === 200) {
          if (res.data.code && res.data.code !== 0) {
            notification['error']({
              message: res.data.code || `错误`,
              placement: 'topRight',
              description: res.data.msg || '未知错误',
            })
          }
          if (res.data.code === 401) {
            router.replace({ name: 'login' })
          }
          resolve(res.data)
        } else {
          resolve(res.data)
        }

        return false
      })
      .catch(error => {
        NProgress.done()
        console.error(`来自响应结果的错误:${error}`)
        reject(error)
      })
  })
}
