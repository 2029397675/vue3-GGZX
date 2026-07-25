import SvgIcon from '@/components/SvgIcon/index.vue'
import type { App } from 'vue'
//引入element-plus提供全部图标组件
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
//对外暴露的组件

const allGlobalComponents = { SvgIcon } as const
export default {
  install(app: App) {
    //注册全局组件
    Object.entries(allGlobalComponents).forEach(([key, component]) => {
      app.component(key, component)
    })
    //注册element-plus图标组件
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  }
}
