//用户管理模块接口
import request from '@/utils/request'
//接口赶回类型
import type { UserResponseData } from './type'
//地址接口
const API = {
  //获取全部已有用户账号信息
  ALLUSER_URL: '/admin/acl/role/'
} as const

//获取全部已有用户账号信息
export const reqUserInfo = (page: number, limit: number) =>
  request.get<any, UserResponseData>(API.ALLUSER_URL + page + '/' + limit)
