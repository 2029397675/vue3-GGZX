import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import '@/styles/index.scss'
import App from './App.vue'
//svg插件
import 'virtual:svg-icons-register'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(ElementPlus, {
  locale: zhCn
})
//引入自定义插件对象:注册整个项目全局组件
import gloalComponents from '@/components/index.ts'
app.use(gloalComponents)

app.mount('#app')
