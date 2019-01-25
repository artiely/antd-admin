// 固定的页面不受菜单权限控制
import { lazyLoading } from './lazyLoading'
import Login from '@/views/auth/Login'
export const constRouterMap = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'register',
    component: lazyLoading('views/auth/register'),
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
