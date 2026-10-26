// 菜单管理
//引入axios请求工具
import request from '@/utils/request'
import type { PermissionResponseData, MenuParams } from './type'
//接口地址
const API = {
  //获取全部菜单列表
  ALLPERMISSION_URL: '/admin/acl/permission',
  //给某一级菜单添加子菜单
  ADDMENU_URL: '/admin/acl/permission/save',
  //更新某一级菜单
  UPDATEMENU_URL: '/admin/acl/permission/update',
  //删除某一级菜单
  DELETEMENU_URL: '/admin/acl/permission/remove/'
}
//获取全部菜单列表
export const reqAllPermission = () =>
  request.get<any, PermissionResponseData>(API.ALLPERMISSION_URL)
//添加与更新菜单的方法
export const reqAddOrUpdateMenu = (data: MenuParams) => {
  if (data.id) {
    return request.put<any, any>(API.UPDATEMENU_URL, data)
  } else {
    return request.post<any, any>(API.ADDMENU_URL, data)
  }
}
//删除菜单的方法
export const reqDeleteMenu = (id: number) =>
  request.delete<any, any>(API.DELETEMENU_URL + id)
