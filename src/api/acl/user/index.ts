//用户管理模块接口
import request from '@/utils/request'
//接口赶回类型
import type {
  UserResponseData,
  User,
  AllRoleResponseData,
  SetRoleData
} from './type'
import { ElWatermark } from 'element-plus'
//地址接口
const API = {
  //获取全部已有用户账号信息
  ALLUSER_URL: '/admin/acl/user/',
  //添加新用户
  ADDUSER_URL: '/admin/acl/user/save',
  //更新用户
  UPDATEUSER_URL: '/admin/acl/user/update',
  //获取全部职位，及当前账号职位信息
  ALLROLE_URL: '/admin/acl/user/toAssign/',
  //为当前账号分配职位
  SETROLE_URL: '/admin/acl/user/doAssignRole',
  //删除某一个账号
  DELETEUSER_URL: '/admin/acl/user/remove/',
  //删除多个账号
  DELETEALLUSER_URL: '/admin/acl/user/batchRemove'
} as const

//获取全部已有用户账号信息
export const reqUserInfo = (page: number, limit: number, username?: string) =>
  request.get<any, UserResponseData>(API.ALLUSER_URL + page + '/' + limit, {
    params: {
      username
    }
  })
//添加新用户或更新用户
export const reqAddOrUpdateUser = (data: User) => {
  if (data.id) {
    return request.put<any, any>(API.UPDATEUSER_URL, data)
  } else {
    return request.post<any, any>(API.ADDUSER_URL, data) //添加新用户
  }
}
//获取全部职位，及当前账号职位信息
export const reaAllRole = (userId: number) =>
  request.get<any, AllRoleResponseData>(API.ALLROLE_URL + userId)
//为当前账号分配职位
export const reqSetUserRole = (data: SetRoleData) =>
  request.post<any, any>(API.SETROLE_URL, data)
//删除某一个账号
export const reqRemoveUser = (id: number) =>
  request.delete<any, any>(API.DELETEUSER_URL + id)
//删除多个账号
export const reqRemoveUserList = (ids: number[]) =>
  request.delete<any, any>(API.DELETEALLUSER_URL, { data: { ids } })
