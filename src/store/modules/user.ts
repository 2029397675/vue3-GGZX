//创建用户相关的小仓库
import { defineStore } from 'pinia'
//引入接口
import { reqLogin } from '@/api/user'
//引入数据类型
import type { loginForm, loginResponseData } from '@/api/user/type'

import { ref } from 'vue'
const useUserStore = defineStore('User', () => {
  const token = ref('')
  const userLogin = async (data: loginForm) => {
    const res: loginResponseData = await reqLogin(data)
    if (res.code === 200) {
      token.value = res.data.token as string
      return 'ok'
    } else {
      return Promise.reject(new Error(res.data.message))
    }
  }
  return {
    token,
    userLogin
  }
})
export default useUserStore
