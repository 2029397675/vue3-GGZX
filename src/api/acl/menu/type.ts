//数据类型定义
export interface ResponseData {
  code: number
  message: string
  ok: boolean
}
//菜单数据类型定义
export interface Permission {
  ID: number
  children?: PermissionList
  code: string
  createTime: string
  id?: number
  level: number
  name: string
  pid: number
  select: boolean
  status: string
  toCode: string
  type: number
  updateTime: string
}
export type PermissionList = Permission[]
//获取菜单列表的接口返回类型定义
export interface PermissionResponseData extends ResponseData {
  data: PermissionList
}
//添加与修改菜单函数的参数类型定义
export interface MenuParams {
  id?: number
  code: string
  level: number
  pid: number
  name: string
}
