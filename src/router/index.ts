//模板路由配置
import { createRouter, createWebHashHistory } from 'vue-router'
import { constantRoute } from './routes'

const router = createRouter({
  //路由模式
  history: createWebHashHistory(),
  routes: constantRoute,
  scrollBehavior() {
    return {
      top: 0,
      left: 0
    }
  }
})
export default router
