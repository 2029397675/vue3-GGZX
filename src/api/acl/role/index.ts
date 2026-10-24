//角色管理相关接口
import request from '@/utils/request'
import type { RoleResponseData, RoleData, MenuResponseData } from './type'
//API
const API = {
  //获取全部职位
  ALLROLE_URL: '/admin/acl/role/',
  //新增职位
  ADDROLE_URL: '/admin/acl/role/save',
  //更新已有的职位
  UPDATEROLE_URL: '/admin/acl/role/update',
  //全部菜单与按钮的数据
  ALLPERMISSION_URL: '/admin/acl/permission/toAssign/',
  //给角色分配权限
  SETPERMISSION_URL: '/admin/acl/permission/doAssign' //给角色分配权限
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
//获取全部菜单与按钮的数据
export const reqAllMenuList = (id: number) =>
  request.get<any, MenuResponseData>(API.ALLPERMISSION_URL + id)
//给角色分配权限
export const reqSetPermission = (roleId: number, permissionId: number[]) =>
  request.post<any, any>(
    API.SETPERMISSION_URL + `?roleId=${roleId}&permissionId=${permissionId}`
  )
