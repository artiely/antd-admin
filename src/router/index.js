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
  if (to.meta.auth) {
    // 登录验证 有token就一定有角色
    let token = Cookies.get('token')
    if (token) {
      next({
        query: {
          redirect: to.fullPath,
        },
      })
    } else {
      // next({
      //   path: '/login',
      //   query: {
      //     redirect: to.fullPath
      //   }
      // })
      next()
    }
  } else {
    next()
  }
})
router.afterEach(() => {
  NProgress.done() // finish progress bar
})
export default router
