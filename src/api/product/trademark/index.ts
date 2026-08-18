//品牌管理相关接口
import request from '@/utils/request'
import type { TrademarkRequestParams } from './type'

const API = {
  // 获取全部品牌列表
  TRADEMARKALL_URL: '/admin/product/baseTrademark/getTrademarkList',
  //获取品牌分页列表
  TRADEMARK_URL: '/admin/product/baseTrademark/',
  //添加品牌
  ADDTRADEMARK_URL: '/admin/product/baseTrademark/save',
  //删除品牌
  TRADEMARKDELETE_URL: '/admin/product/baseTrademark/remove',
  //修改品牌
  UPDATETRADEMARK_URL: '/admin/product/baseTrademark/update' //修改品牌
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
/**
 * 添加与修改品牌
 *
 * @description
 * 根据传入的品牌数据，调用相应的接口（添加或修改）。
 * 如果传入的数据包含 `id`，则调用修改品牌接口；否则调用添加品牌接口。
 *
 * @param data - 品牌数据，包含 `id`、`tmName` 和 `logoUrl` 等字段
 *
 * @returns 添加或修改品牌接口响应
 *
 * @example
 * reqAddOrUpdateTrademark({ id: 1, tmName: '新品牌', logoUrl: 'https://example.com/logo.png' })
 *
 */
export const reqAddOrUpdateTrademark = (data: TrademarkRequestParams) => {
  //判断是否有id，有id则为修改，没有id则为添加
  if (data.id) {
    return request.put<any, any>(API.UPDATETRADEMARK_URL, data)
  } else {
    return request.post<any, any>(API.ADDTRADEMARK_URL, data)
  }
}
