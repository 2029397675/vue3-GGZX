//角色管理相关接口
import request from '@/utils/request'
import type { RoleResponseData, RoleData } from './type'
//API
const API = {
  //获取全部职位
  ALLROLE_URL: '/admin/acl/role/',
  //新增职位
  ADDROLE_URL: '/admin/acl/role/save',
  //更新已有的职位
  UPDATEROLE_URL: '/admin/acl/role/update'
  //删除职位
}
//获取全部职位
export const reqAllRoleList = (page: number, limit: number, roleName: string) =>
  request.get<any, RoleResponseData>(API.ALLROLE_URL + page + '/' + limit, {
    params: { roleName }
  })
//添加 | 更新职位
export const reqAddOrUpdateRole = (role: RoleData) => {
  if (role.id) {
    return request.put<any, any>(API.UPDATEROLE_URL, role)
  } else {
    return request.post<any, any>(API.ADDROLE_URL, role)
  }
}
