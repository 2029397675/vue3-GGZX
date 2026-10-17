//账号信息的tsleixng
export interface ResponseData {
  code: number
  message: string
  ok: boolean
}
//账号信息的ts类型
export interface User {
  id?: number
  createTime?: string
  updateTime?: string
  username?: string
  password?: string
  name?: string
  phone?: null
  roleName?: string
}
//data数组包含全部的用户信息
export type Records = User[]
//获取用户信息接口返回的数据类型
export interface UserResponseData extends ResponseData {
  data: {
    records: Records
    total: number
    size: number
    current: number
    orders: []
    searchCount: boolean
    pages: number
  }
}
//一个职位的ts类型
export interface RoleData {
  id?: number
  createTime?: string
  updateTime?: string
  roleName: string
  remark: null
}
//职位数组
export type AllRole = RoleData[]
//获取职位信息接口返回的数据类型
export interface AllRoleResponseData extends ResponseData {
  data: {
    assignRoles: AllRole
    allRolesList: AllRole
  }
}
//为用户分配职位接口返回的数据类型
export interface SetRoleData {
  roleIdList: number[]
  userId: number
}
