// 菜单管理
//引入axios请求工具
import request from '@/utils/request'
import type { PermissionResponseData } from './type'
//接口地址
const API = {
  //获取全部菜单列表
  ALLPERMISSION_URL: '/admin/acl/permission'
}
//获取全部菜单列表
export const reqAllPermission = () =>
  request.get<any, PermissionResponseData>(API.ALLPERMISSION_URL)
