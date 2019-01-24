import router from '@/router'
import { asyncRouterMap } from '@/router/asyncRouterMap'

export default () => {
  router.addRoutes(
    [...asyncRouterMap].concat([
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
  console.log('重新添加路由...')
}
