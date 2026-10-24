import type { st } from 'vue-router/dist/index-BzEKChPW.js'

export interface ResponseData {
  code: number
  message: string
  ok: boolean
}
//职位数据类型
export interface RoleData {
  id?: number | string
  createTime?: string
  updateTime?: string
  roleName: string
  remark?: null | string
}
//职位数组类型
export type Records = RoleData[]
//获取职位列表接口返回值类型
export interface RoleResponseData extends ResponseData {
  data: {
    records: Records
    total: number
    current: number
    size: number
    orders: []
    optimizeCountSql: boolean
    hitCount: boolean
    countId: null
    maxLimit: null
    searchCount: boolean
    pages: number
  }
}
//菜单与按钮数据的ts类型
export interface MenuData {
  ID: number
  children?: MenuList
  code: string
  createTime: string
  id: number
  level: number
  name: string
  pid: number
  select: boolean
  status: string
  toCode: string
  type: number
  updateTime: string
}
export type MenuList = MenuData[]
//获取菜单与按钮列表接口返回值类型
export interface MenuResponseData extends ResponseData {
  data: MenuList
}
//职位与菜单与按钮数据的ts类型
