//创建用户相关的小仓库
import { defineStore } from 'pinia'
//引入接口
import { reqLogin } from '@/api/user'
//引入数据类型
import type { loginForm, loginResponseData } from '@/api/user/type'
//引入路由（常态路由）
import { constantRoute } from '@/router/routes'

//创建用户小仓库
import { ref } from 'vue'
const useUserStore = defineStore('User', () => {
  //定义token（用户登录后返回的token）和userLogin（用户登录的方法）两个响应式数据
  //token：用户登录后返回的token
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
  //定义路由
  const menuRoutes = ref(constantRoute)
  return {
    token,
    userLogin,
    menuRoutes //返回路由
  }
})
export default useUserStore
