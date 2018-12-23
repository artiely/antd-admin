import Vue from 'vue'
import Router from 'vue-router'
import Cookies from 'js-cookie'
import Login from '@/views/auth/Login'
import E404 from '@/views/auth/E404'
import Home from '@/views/layout/default'
import RouterView from '@/views/layout/routerView'
import store from '@/store'
import NProgress from 'nprogress'
import i18n from '@/i18n/index'
// import {notification} from 'ant-design-vue'

Vue.use(Router)

function lazyLoading(path) {
  return () => {
    // clearTimeout(timer)
    // let toast = Toast.loading({
    //   duration: 0, // 持续展示 toast
    //   forbidClick: true, // 禁用背景点击
    //   message: '跳转中...'
    // })
    // timer = setTimeout(() => {
    //   if (toast) {
    //     toast = notification.warning({
    //       message: '网络不太稳定...'
    //     })
    //   }
    // }, 10000)
    return import(`@/${path}`)
      .then(component => {
        return component
      })
      .catch(() => {
        console.error('获取页面失败')
        window.location.reload()
      })
      .finally(() => {
        // notification.close(toast)
        // toast = null
      })
  }
}
export const asyncRouterMap = [
  {
    path: '/dashboard',
    name: 'dashboard',
    component: RouterView,
    meta: {
      auth: true,
      title: i18n.tc('message.dashboard'),
      icon: 'ant-design',
      // visible: true,
      hidden: false,
    },
    children: [
      {
        path: '/dashboard/workplace',
        name: 'workplace',
        component: lazyLoading('views/dashboard/workplace'),
        meta: {
          auth: true,
          title: i18n.tc('message.workplace'),
          icon: 'laptop',
        },
      },
      {
        path: '/dashboard/analysis',
        name: 'analysis',
        component: lazyLoading('views/dashboard/analysis'),
        meta: {
          auth: true,
          title: i18n.tc('message.analysis'),
          icon: 'line-chart',
        },
      },
      {
        path: '/dashboard/table',
        name: 'table',
        component: lazyLoading('views/table/index'),
        meta: {
          auth: true,
          title: '表格',
          icon: 'line-chart',
        },
      },
    ],
  },
  {
    path: '/user',
    name: 'user',
    component: RouterView,
    meta: {
      auth: true,
      title: '用户中心',
      icon: 'ant-design',
      hidden: true,
      // visible: false,
    },
    children: [
      {
        path: '/user/userinfo',
        name: 'userinfo',
        component: lazyLoading('views/user/user'),
        meta: {
          auth: true,
          title: 'userinfo',
          icon: 'line-chart',
        },
      },
      {
        path: '/user/todo',
        name: 'todo',
        component: lazyLoading('views/user/todo'),
        meta: {
          auth: true,
          title: 'todo',
          icon: 'line-chart',
        },
      },
      {
        path: '/user/calendar',
        name: 'calendar',
        component: lazyLoading('views/user/calendar'),
        meta: {
          auth: true,
          title: 'calendar',
          icon: 'line-chart',
        },
      },
    ],
  },
  {
    path: '/editor',
    name: 'editor',
    component: RouterView,
    meta: {
      auth: true,
      title: '编辑器',
      icon: 'ant-design',
      visible: true,
    },
    children: [
      {
        path: '/editor/mavon',
        name: 'markdown',
        component: lazyLoading('views/editor/mavon'),
        meta: {
          auth: true,
          title: 'markdown',
          icon: 'line-chart',
        },
      },
      {
        path: '/editor/skeleton',
        name: 'skeleton',
        component: lazyLoading('skeleton/Skeleton'),
        meta: {
          auth: true,
          title: 'skeleton',
          icon: 'line-chart',
        },
      },
      // {
      //   path: '/editor/richtext',
      //   name: 'editor',
      //   component: lazyLoading('views/editor/richtext'),
      //   meta: {
      //     auth: true,
      //     title: 'editor',
      //     icon: 'line-chart'
      //   }
      // },
      // {
      //   path: '/editor/tinymce',
      //   name: 'tinymce',
      //   component: lazyLoading('views/editor/tinymce'),
      //   meta: {
      //     auth: true,
      //     title: 'tinymce',
      //     icon: 'line-chart'
      //   }
      // },
      // {
      //   path: '/editor/tinymce-vue',
      //   name: 'tinymce-vue',
      //   component: lazyLoading('views/editor/tinymce-vue'),
      //   meta: {
      //     auth: true,
      //     title: 'tinymce-vue',
      //     icon: 'line-chart'
      //   }
      // },
      {
        path: '/editor/wangeditor',
        name: 'wangeditor',
        component: lazyLoading('views/editor/wangeditor'),
        meta: {
          auth: true,
          title: 'wangeditor',
          icon: 'line-chart',
        },
      },
      {
        path: '/editor/ckeditor',
        name: 'ckeditor',
        component: lazyLoading('views/editor/ckeditor'),
        meta: {
          auth: true,
          title: 'ckeditor',
          icon: 'line-chart',
        },
      },
    ],
  },
  {
    path: '/sys',
    name: 'sys',
    component: RouterView,
    meta: {
      auth: true,
      title: '系统管理',
      icon: 'ant-design',
      visible: true,
    },
    children: [
      {
        path: '/sys/sysmenu',
        name: 'workplace',
        component: lazyLoading('views/sys/sysMenu'),
        meta: {
          auth: true,
          title: '菜单管理',
          icon: 'laptop',
        },
      },
    ],
  },
  {
    path: '/form',
    name: 'form',
    component: RouterView,
    meta: {
      auth: true,
      title: i18n.tc('message.form'),
      icon: 'form',
    },
    children: [
      {
        path: '/form/basic',
        name: 'basic',
        component: lazyLoading('views/form/basic'),
        meta: {
          auth: true,
          title: i18n.tc('message.basic'),
        },
      },
      {
        path: '/form/step',
        name: 'step',
        component: lazyLoading('views/form/step'),
        meta: {
          auth: true,
          title: i18n.tc('message.step'),
        },
      },
      {
        path: '/form/advanced',
        name: 'advanced',
        component: lazyLoading('views/form/advanced'),
        meta: {
          auth: true,
          title: i18n.tc('message.advanced'),
        },
      },
      {
        path: '/form/advanced2',
        name: 'advanced',
        type: 'iframe',
        iframeUrl: 'http://www.baidu.com',
        // component: lazyLoading('views/dashboard/analysis'),
        meta: {
          auth: true,
          title: '高级表单',
        },
      },
      // {
      //   path: '/form/advanced3',
      //   name: 'advanced',
      //   type: 'iframe',
      //   iframeUrl: 'http://192.168.2.109:8088/dist/about.html',
      //   // component: lazyLoading('views/dashboard/analysis'),
      //   meta: {
      //     auth: true,
      //     title: '高级表单'
      //   }
      // }
    ],
  },
]

let constantRouterMap = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/login',
    children: asyncRouterMap,
  },
  {
    path: '/lock',
    name: 'lock',
    component: lazyLoading('views/sys/lock'),
  },
  {
    path: '/*',
    name: 'Home',
    component: Home,
    redirect: '/404',
    children: [
      {
        path: '/404',
        name: '404',
        component: E404,
        meta: {
          title: '页面找不到',
          hidden: true,
        },
      },
    ],
  },
]

store.commit('sys/setMenu', asyncRouterMap)
const router = new Router({
  scrollBehavior: () => ({
    y: 0,
  }),
  routes: [...constantRouterMap],
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
