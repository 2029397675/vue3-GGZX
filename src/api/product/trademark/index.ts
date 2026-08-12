//品牌管理相关接口
import request from '@/utils/request'

const API = {
  // 获取全部品牌列表
  TRADEMARKALL_URL: '/admin/product/baseTrademark/getTrademarkList',
  //获取品牌分页列表
  TRADEMARK_URL: '/admin/product/baseTrademark/'
} as const
/**
 * 获取品牌分页列表
 *
 * @description
 * 根据页码和每页数量请求品牌列表数据。
 *
 * @param page - 页码，从 1 开始
 * @param limit - 每页显示的数据条数
 *
 * @returns 品牌分页列表接口响应
 *
 * @example
 * reqHasTrademark(1, 10)
 */
export const reqHasTrademark = (page: number, limit: number) =>
  request.get<any, any>(API.TRADEMARK_URL + `${page}/${limit}`)
