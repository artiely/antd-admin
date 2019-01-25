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
console.log('123', store)
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (to.meta.auth) {
    let token = Cookies.get('token')
    let isLock = store.state.sys.isLock
    if (token) {
      if (isLock) {
        next({ path: '/lock' })
      } else {
        next()
      }
    } else {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath,
        },
      })
    }
  } else {
    next()
  }
})
router.afterEach(() => {
  NProgress.done() // finish progress bar
})
export default router
