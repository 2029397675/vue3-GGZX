// 产品属性类型接口
import request from '@/utils/request'
import type { CategoryResponseData } from './type'

//属性管理模块地址
const API = {
  C1_URL: '/admin/product/getCategory1',
  C2_URL: '/admin/product/getCategory2',
  C3_URL: '/admin/product/getCategory3'
}
/**
 * 获取一级分类列表
 */
export const reqC1 = () => request.get<any, CategoryResponseData>(API.C1_URL)
/**
 * 获取二级分类列表
 *
 * @description
 * 根据一级分类id获取二级分类列表
 *
 * @param  {number} id - 一级分类id
 *
 */
export const reqC2 = (id: number | string) =>
  request.get<any, CategoryResponseData>(API.C2_URL + `/${id}`)
/**
 * 获取三级分类列表
 *
 * @description
 * 根据二级分类id获取三级分类列表
 *
 * @param {number} id - 二级分类id
 */
export const reqC3 = (id: number | string) =>
  request.get<any, CategoryResponseData>(API.C3_URL + `/${id}`)
