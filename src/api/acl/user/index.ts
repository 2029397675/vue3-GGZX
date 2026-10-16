//用户管理模块接口
import request from '@/utils/request'
//接口赶回类型
import type { UserResponseData, User } from './type'
//地址接口
const API = {
  //获取全部已有用户账号信息
  ALLUSER_URL: '/admin/acl/user/',
  //添加新用户
  ADDUSER_URL: '/admin/acl/user/save',
  //更新用户
  UPDATEUSER_URL: '/admin/acl/user/update'
} as const

//获取全部已有用户账号信息
export const reqUserInfo = (page: number, limit: number) =>
  request.get<any, UserResponseData>(API.ALLUSER_URL + page + '/' + limit)
//添加新用户或更新用户
export const reqAddOrUpdateUser = (data: User) => {
  if (data.id) {
    return request.put<any, any>(API.UPDATEUSER_URL, data)
  } else {
    return request.post<any, any>(API.ADDUSER_URL, data) //添加新用户
  }
}
