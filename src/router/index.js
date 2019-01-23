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

let hasAdd = false
// 处理登录
router.beforeEach((to, from, next) => {
  NProgress.start()
  console.log(
    '去的地址',
    to,
    from,
    '权限',
    to.meta.auth,
    'store.state.role.roleMenu',
    store.state.role.roleMenu
  )
  // store.commit('role/addRoutesMenu',asyncRouterMap)
  // 先判断有没有 token-》 是否添加路由-》是否需要验证
  // 先判断是否添加过路由
  if (hasAdd) {
    if (to.meta.auth) {
      // 登录验证 有token就一定有角色
      let token = Cookies.get('token')
      if (token && to.meta.auth) {
        // 有返回角色菜单 匹配菜单 动态添加菜单
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
      console.log('无需验证')
    }
  } else {
    // 添加路由
    if (store.state.role.roleMenu.length) {
      hasAdd = true
      router.addRoutes(
        [
          // 此处没做权限处理默认全部配置
          ...asyncRouterMap,
        ].concat([
          {
            path: '/*',
            name: '404',
            component: () => import('@/views/exception/404'),
            meta: {
              auth: true,
              title: '404',
              icon: 'laptop',
            },
          },
        ])
      )
      next({
        query: {
          redirect: to.fullPath,
        },
      })
    } else {
      // 没有菜单 重新请求菜单
      console.log(1)
      if (to.path !== '/login') {
        next({
          path: 'login',
        })
      } else {
        next()
      }
      next({
        path: 'login',
      })
    }
  }
})
router.afterEach(() => {
  NProgress.done() // finish progress bar
})
export default router
