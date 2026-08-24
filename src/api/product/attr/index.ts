// 产品属性类型接口
import request from '@/utils/request'
import type { CategoryResponseData, AttrResponseData, AttrData } from './type'

//属性管理模块地址
const API = {
  C1_URL: '/admin/product/getCategory1',
  C2_URL: '/admin/product/getCategory2',
  C3_URL: '/admin/product/getCategory3',
  ATTR_URL: '/admin/product/attrInfoList/',
  ADDORUPDATE_URL: '/admin/product/saveAttrInfo' //添加或更新用户信息接口
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
/**
 * @description 获取指定三级分类下的商品属性列表
 * @param {number | string} category1Id 一级分类 ID
 * @param {number | string} category2Id 二级分类 ID
 * @param {number | string} category3Id 三级分类 ID
 * @returns {Promise<CategoryResponseData>} 商品属性列表数据
 */
export const reqAttr = (
  category1Id: number | string,
  category2Id: number | string,
  category3Id: number | string
) =>
  request.get<any, AttrResponseData>(
    API.ATTR_URL + `${category1Id}/${category2Id}/${category3Id}`
  )

export const reqAddOrUpdateAttr = (data: AttrData) =>
  request.post<any, any>(API.ADDORUPDATE_URL, data)
