//创建用户相关的小仓库
import { defineStore } from 'pinia'
//引入接口
import { reqLogin, reqUserInfo } from '@/api/user'
//引入数据类型
import type { loginForm, loginResponseData } from '@/api/user/type'
//引入路由（常态路由）
import { constantRoute } from '@/router/routes'

//创建用户小仓库
import { ref } from 'vue'
const useUserStore = defineStore('User', () => {
  //定义token（用户登录后返回的token）和userLogin（用户登录的方法）两个响应式数据
  //token：用户登录后返回的token
  const token = ref(localStorage.getItem('TOKEN') || '')
  const userLogin = async (data: loginForm) => {
    const res: loginResponseData = await reqLogin(data)
    if (res.code === 200) {
      token.value = res.data.token as string
      localStorage.setItem('TOKEN', token.value)
      return 'ok'
    } else {
      return Promise.reject(new Error(res.data.message))
    }
  }
  //获取用户信息方法
  const username = ref('') //用户名字
  const avatar = ref('') //用户头像
  const userInfo = async () => {
    //获取用户信息并存储到仓库中【用户头像、名字】
    const res = await reqUserInfo()
    if (res.code === 200) {
      username.value = res.data.checkUser.username
      avatar.value = res.data.checkUser.avatar
      return 'ok'
    }
  }
  //退出登录
  const userLogout = () => {
    token.value = ''
    localStorage.removeItem('TOKEN')
    username.value = ''
    avatar.value = '' //清空头像
  }
  //定义路由
  const menuRoutes = ref(constantRoute)
  return {
    token,
    userLogin,
    menuRoutes, //返回路由
    username, //返回用户名字
    avatar, //返回用户头像
    userInfo, //返回用户信息方法
    userLogout //退出登录方法
  }
})
export default useUserStore
