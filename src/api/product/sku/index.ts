//sku相关接口
import request from '@/utils/request'
import type { SkuResponseData, SkuInfoData } from './type'

const API = {
  //获取已有的商品的数据-SKU
  SKU_URL: '/admin/product/list/',
  //商品上架
  SAVE_URL: '/admin/product/onSale/',
  //商品下架
  CANCELSALE_URL: '/admin/product/cancelSale/',
  //获取商品详情
  SKUINFO_URL: '/admin/product/getSkuInfo/'
} as const

//获取商品SKU的接口
export const reqSkuList = (page: number, limit: number) =>
  request.get<any, SkuResponseData>(API.SKU_URL + `${page}/${limit}`)
//已有商品上架
export const reqSaveSaleSku = (skuId: number) =>
  request.get<any, any>(API.SAVE_URL + skuId)
//已有商品下架
export const reqCancelSaleSku = (skuId: number) =>
  request.get<any, any>(API.CANCELSALE_URL + skuId)
//获取商品详情
export const reqSkuInfo = (skuId: number) =>
  request.get<any, SkuInfoData>(API.SKUINFO_URL + skuId)
