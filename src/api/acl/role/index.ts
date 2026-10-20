//角色管理相关接口
import request from '@/utils/request'
import type { RoleResponseData } from './type'
//API
const API = {
  //获取全部职位
  ALLROLE_URL: '/admin/acl/role/'
}
//获取全部职位
export const reqAllRoleList = (page: number, limit: number, roleName: string) =>
  request.get<any, RoleResponseData>(API.ALLROLE_URL + page + '/' + limit, {
    params: { roleName }
  })
