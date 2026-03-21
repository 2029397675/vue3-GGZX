declare module 'virtual:svg-icons-register'
declare module '*.svg' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
