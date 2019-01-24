// 异步加载的菜单和应用左侧的菜单一一对应的
import { lazyLoading } from './lazyLoading'
import i18n from '@/i18n/index'
import Home from '@/components/layout/default'
export const asyncRouterMap = [
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Home,
    meta: {
      auth: true,
      title: i18n.tc('menu.dashboard'),
      icon: 'ant-design',
      hidden: false,
    },
    children: [
      {
        path: '/dashboard/workplace',
        name: 'workplace',
        component: lazyLoading('views/dashboard/workplace'),
        meta: {
          auth: true,
          title: i18n.tc('menu.workplace'),
          icon: 'laptop',
        },
      },
      {
        path: '/dashboard/analysis',
        name: 'analysis',
        component: lazyLoading('views/dashboard/analysis'),
        meta: {
          auth: true,
          title: i18n.tc('menu.analysis'),
          icon: 'line-chart',
        },
      },
    ],
  },
  {
    path: '/crud',
    name: 'crud',
    component: Home,
    meta: {
      auth: true,
      title: i18n.tc('menu.crud'),
      icon: 'ant-design',
    },
    children: [
      {
        path: '/crud/index',
        name: 'crud',
        component: lazyLoading('views/crud/index'),
        meta: {
          auth: true,
          title: 'cruddemo',
          icon: 'line-chart',
        },
      },
    ],
  },
  {
    path: '/user',
    name: 'user',
    component: Home,
    meta: {
      auth: true,
      title: '用户中心',
      icon: 'ant-design',
      hidden: true,
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
          hidden: true,
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
      {
        path: '/user/help',
        name: 'help',
        component: lazyLoading('views/user/help'),
        meta: {
          auth: true,
          title: 'help',
          icon: 'line-chart',
        },
      },
    ],
  },
  {
    path: '/editor',
    name: 'editor',
    component: Home,
    meta: {
      auth: true,
      title: i18n.tc('menu.editor'),
      icon: 'ant-design',
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
    component: Home,
    meta: {
      auth: true,
      title: i18n.tc('menu.management'),
      icon: 'ant-design',
    },
    children: [
      {
        path: '/sys/menu',
        name: 'menu',
        component: lazyLoading('views/manage/menu/menu-list'),
        meta: {
          auth: true,
          title: i18n.tc('menu.menu'),
          icon: 'laptop',
        },
      },
      {
        path: '/sys/user-list',
        name: 'user-list',
        component: lazyLoading('views/manage/admin/user-list'),
        meta: {
          auth: true,
          title: i18n.tc('menu.account'),
          icon: 'laptop',
        },
      },
      {
        path: '/sys/role-list',
        name: 'role-list',
        component: lazyLoading('views/manage/role/role-list'),
        meta: {
          auth: true,
          title: i18n.tc('menu.role'),
          icon: 'laptop',
        },
      },
      {
        path: '/sys/role-list2',
        name: 'role-list2',
        component: lazyLoading('views/manage/role/role-list2'),
        meta: {
          auth: true,
          title: i18n.tc('menu.role_crud'),
          icon: 'laptop',
        },
      },
    ],
  },
  {
    path: '/result',
    name: 'result',
    component: Home,
    meta: {
      auth: true,
      title: i18n.tc('menu.result_page'),
      icon: 'ant-design',
    },
    children: [
      {
        path: '/result/success',
        name: 'success',
        component: lazyLoading('views/result/success'),
        meta: {
          auth: true,
          title: i18n.tc('menu.success'),
          icon: 'laptop',
        },
      },
      {
        path: '/result/error',
        name: 'error',
        component: lazyLoading('views/result/error'),
        meta: {
          auth: true,
          title: i18n.tc('menu.fail'),
          icon: 'laptop',
        },
      },
    ],
  },
  {
    path: '/exception',
    name: 'exception',
    component: Home,
    meta: {
      auth: true,
      title: i18n.tc('menu.error_page'),
      icon: 'ant-design',
    },
    children: [
      {
        path: '/exception/403',
        name: '403',
        component: lazyLoading('views/exception/403'),
        meta: {
          auth: true,
          title: '403',
          icon: 'laptop',
        },
      },
      {
        path: '/exception/404',
        name: '404',
        component: lazyLoading('views/exception/404'),
        meta: {
          auth: true,
          title: '404',
          icon: 'laptop',
        },
      },
      {
        path: '/exception/500',
        name: '500',
        component: lazyLoading('views/exception/500'),
        meta: {
          auth: true,
          title: '500',
          icon: 'laptop',
        },
      },
    ],
  },
  
]
