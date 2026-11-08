//创建用户相关的小仓库
import { defineStore } from 'pinia'
//引入接口
import { reqLogin, reqUserInfo, reqLogout } from '@/api/user/index.ts'
//引入接口类型
import type {
  loginFormData,
  ResponseData,
  UserInfoResponseData
} from '@/api/user/type'
//引入路由（常态路由）
import { constantRoute, asyncRoute, anyRoute } from '@/router/routes'
//引入深拷贝
import cloneDeep from 'lodash/cloneDeep'

//创建用户小仓库
import { ref } from 'vue'
import router from '@/router'

const useUserStore = defineStore('User', () => {
  //定义token（用户登录后返回的token）和userLogin（用户登录的方法）两个响应式数据
  //token：用户登录后返回的token
  const token = ref(localStorage.getItem('TOKEN') || '')
  //过滤路由
  const filterAsyncRoutes = (asyncRoutes: any[], routes: string[]) => {
    return asyncRoutes.filter(item => {
      if (routes.includes(item.name)) {
        if (item.children && item.children.length > 0) {
          item.children = filterAsyncRoutes(item.children, routes) //递归过滤子路由
        }
        return true
      }
    })
  }
  //用户登陆方法
  const userLogin = async (data: loginFormData) => {
    const res: ResponseData<string> = await reqLogin(data)
    if (res.code === 200) {
      //将token存储到仓库中
      token.value = res.data
      localStorage.setItem('TOKEN', token.value)
      return 'ok'
    } else {
      return Promise.reject(new Error(res.message))
    }
  }
  //获取用户信息方法
  const username = ref('') //用户名字
  const avatar = ref('') //用户头像
  const buttons = ref<string[]>([]) //用户按钮
  const userInfo = async () => {
    //获取用户信息并存储到仓库中【用户头像、名字】
    const res: ResponseData<UserInfoResponseData> = await reqUserInfo()
    if (res.code === 200) {
      //将用户信息存储到仓库中【用户头像、名字】
      username.value = res.data.name
      avatar.value = res.data.avatar
      buttons.value = res.data.buttons
      const userAsyncRoutes = filterAsyncRoutes(
        cloneDeep(asyncRoute) as any[],
        res.data.routes as string[]
      ) //过滤路由
      //菜单的数据
      menuRoutes.value = [...constantRoute, ...userAsyncRoutes, ...anyRoute]
      //追加路由
      ;[...userAsyncRoutes, ...anyRoute].forEach((route: any) => {
        router.addRoute(route)
      })
      return 'ok'
    } else {
      return Promise.reject(new Error(res.message)) //返回错误信息
    }
  }
  //退出登录
  const userLogout = async () => {
    const res: any = await reqLogout() //调用退出登录接口
    if (res.code === 200) {
      token.value = ''
      localStorage.removeItem('TOKEN')
      username.value = ''
      avatar.value = '' //清空头像
      return 'ok'
    } else {
      return Promise.reject(new Error(res.data.message)) //返回错误信息
    }
  }
  //定义路由
  const menuRoutes = ref([] as any[])
  return {
    token,
    userLogin,
    buttons,
    menuRoutes, //返回路由
    username, //返回用户名字
    avatar, //返回用户头像
    userInfo, //返回用户信息方法
    userLogout //退出登录方法
  }
})
export default useUserStore
