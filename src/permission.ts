//路由鉴权
import router from '@/router/index.ts'
//nprogress进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

//全局前置守卫
router.beforeEach((to, from) => {
  NProgress.start() //进度条开始
  return true //放行
})
//全局后置守卫
router.afterEach((to, from) => {
  NProgress.done() //进度条结束
})

//进度条配置
NProgress.configure({
  showSpinner: false, // 去掉右上角小圆圈
  trickleSpeed: 100 // 自动增长速度
})
