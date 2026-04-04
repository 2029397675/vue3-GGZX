// 对外暴露路由配置(常量路由)
export const constantRoute = [
  {
    path: '/login',
    name: 'login', //命名路由
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/',
    name: 'layout',
    component: () => import('@/views/home/index.vue')
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404/index.vue')
  },
  {
    path: '/:pathMatch(.*)*', //匹配任意路径
    name: 'Any',
    redirect: '/404'
  }
]
