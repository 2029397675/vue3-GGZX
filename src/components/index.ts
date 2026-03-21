import SvgIcon from '@/components/SvgIcon/index.vue'
import type { App } from 'vue'
//对外暴露的组件

const allGlobalComponents = { SvgIcon } as const
export default {
  install(app: App) {
    //注册全局组件
    Object.entries(allGlobalComponents).forEach(([key, component]) => {
      app.component(key, component)
    })
  }
}
