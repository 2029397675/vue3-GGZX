//x小仓库：layout组件相关配置
import { defineStore } from 'pinia'
import { ref } from 'vue'

const useLayoutSettingStore = defineStore('SettingStore', () => {
  const fold = ref(false) //是否折叠菜单
  return {
    fold
  }
})
export default useLayoutSettingStore
