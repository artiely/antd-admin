// 固定的页面不受菜单权限控制
import { lazyLoading } from './lazyLoading'
import Login from '@/views/auth/Login'
import i18n from '@/i18n/index'
import Home from '@/components/layout/default'
// import E404 from '@/views/auth/E404'
export const constRouterMap = [
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Home,
    meta: {
      auth: true,
      title: i18n.tc('message.dashboard'),
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
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/lock',
    name: 'lock',
    component: lazyLoading('views/sys/lock'),
  },
  {
    path: '/product',
    name: 'product',
    component: lazyLoading('views/product/index'),
  },
  {
    path: '/about',
    name: 'about',
    component: lazyLoading('views/about/aboutus'),
  },
]
