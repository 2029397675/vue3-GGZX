// 对外暴露路由配置(常量路由)
export const constantRoute = [
  {
    //登录
    path: '/login',
    name: 'login', //命名路由
    component: () => import('@/views/login/index.vue')
  },
  {
    //登录成功以后展示数据的路由
    path: '/',
    name: 'layout',
    component: () => import('@/layout/index.vue')
  },
  {
    //404页面路由
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
