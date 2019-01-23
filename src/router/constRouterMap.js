// 固定的页面不受菜单权限控制
import { lazyLoading } from './lazyLoading'
import Login from '@/views/auth/Login'
import E404 from '@/views/auth/E404'
import Home from '@/views/layout/index'
import { asyncRouterMap } from './asyncRouterMap'
export const constRouterMap = [
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
    path: '/product',
    name: 'product',
    component: lazyLoading('views/product/index'),
  },
  {
    path: '/about',
    name: 'about',
    component: lazyLoading('views/about/aboutus'),
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
