import Vue from 'vue'
import Router from 'vue-router'
import Cookies from 'js-cookie'
import store from '@/store'
import NProgress from 'nprogress'
import { asyncRouterMap } from './asyncRouterMap'
import { constRouterMap } from './constRouterMap'

Vue.use(Router)

store.commit('sys/setMenu', asyncRouterMap)
const router = new Router({
  // mode: 'history',
  scrollBehavior: () => ({
    y: 0,
  }),
  routes: [...constRouterMap],
})

// 处理登录
router.beforeEach((to, from, next) => {
  NProgress.start()
  let token = Cookies.get('token')
  if (to.meta.auth) {
    console.log(`需要鉴权`)
    let isLock = store.state.sys.isLock
    if (token) {
      console.log(`需要鉴权：已登录`)
      if (isLock) {
        console.log(`需要鉴权：已登录：并锁屏`)
        next(false)
        NProgress.done()
      } else {
        console.log(`需要鉴权：已登录：未锁屏`)
        next()
      }
    } else {
      console.log(`需要鉴权：未登陆 转登录页`)
      next({
        path: '/login',
        query: {
          redirect: to.fullPath,
        },
      })
      NProgress.done()
    }
  } else {
    console.log(`不需要鉴权`)
    if (token) {
      next()
      console.log(`不需要鉴权：登陆过有token`)
    } else {
      console.log(`不需要鉴权：没登陆过`)
      if (
        to.path === '/login' ||
        to.path === '/register' ||
        to.path === '/product' ||
        to.path === '/about'
      ) {
        console.log(`不需要鉴权：没登陆过：去登录页`)
        next()
      } else {
        console.log(`不需要鉴权：没登陆过：去其他未知页 转登录页`)
        next({
          path: '/login',
        })
        NProgress.done()
      }
    }
  }
})
router.afterEach(() => {
  NProgress.done() // finish progress bar
})
export default router
