//统一管理项目用户相关的接口
import request from '@/utils/request'
//引入接口类型
import type { loginFormData, ResponseData, UserInfoResponseData } from './type'

//项目用户相关的请求地址
const API = {
  LOGIN_URL: '/admin/acl/index/login', //登陆接口
  USERINFO_URL: '/admin/acl/index/info', //获取用户信息接口
  LOGOUT_URL: '/admin/acl/index/logout' //退出登录接口
} as const

//登陆接口
export const reqLogin = (data: loginFormData) =>
  request.post<any, ResponseData<string>>(API.LOGIN_URL, data)
//获取用户信息接口
export const reqUserInfo = () =>
  request.get<any, ResponseData<UserInfoResponseData>>(API.USERINFO_URL)
//退出登录接口
export const reqLogout = () => request.post<any, any>(API.LOGOUT_URL)
