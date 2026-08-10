//路由鉴权
import router from '@/router/index.ts'
//nprogress进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
//通过用户仓库中的token判断用户是否登录
import useUserStore from './store/modules/user'

//全局前置守卫
router.beforeEach(async (to, from) => {
  document.title = '硅谷甄选-' + to.meta.title //设置页面标题
  NProgress.start() //进度条开始
  //判断用户是否登录
  const userStore = useUserStore()
  const token = userStore.token
  const username = userStore.username
  //如果用户登录了，且token存在，放行
  if (token) {
    //登录成功还想要访问登录页面，禁止放行
    if (to.path === '/login') {
      return false
    } else {
      if (username) {
        return true
      } else {
        //如果没有用户信息，需要获取用户信息再放行
        try {
          //获取用户信息
          await userStore.userInfo()
          //获取用户信息成功，放行
          return true
        } catch (error) {
          //token过期：获取不到用户信息
          //用户手动修改本地token，导致token失效
          await userStore.userLogout() //清除token
          return { path: '/login', query: { redirect: to.path } }
        }
      }
    }
  } else {
    //如果用户没有登录，且token不存在，重定向到登录页面
    if (to.path === '/login') {
      return true
    } else {
      return { path: '/login', query: { redirect: to.path } } //重定向到登录页面
    }
  }
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
