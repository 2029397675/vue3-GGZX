//统一管理项目用户相关的接口
import request from '@/utils/request'
//项目用户相关的请求地址
const API = {
  LOGIN_URL: '/admin/acl/index/login', //登陆接口
  USERINFO_URL: '/admin/acl/index/info', //获取用户信息接口
  LOGOUT_URL: '/admin/acl/index/logout' //退出登录接口
} as const

//登陆接口
export const reqLogin = (data: any) =>
  request.post<any, any>(API.LOGIN_URL, data)
//获取用户信息接口
export const reqUserInfo = () => request.get<any, any>(API.USERINFO_URL)
//退出登录接口
export const reqLogout = () => request.post<any, any>(API.LOGOUT_URL)
