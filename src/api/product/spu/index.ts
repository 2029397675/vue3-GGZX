import request from '@/utils/request'
import type {
  HasSpuResponseData,
  AllTrademark,
  SpuHasImg,
  SaleAttrResponseData,
  HasSaleAttrResponseData,
  SpuData
} from './type'

const API = {
  //获取已有的SPU数据
  HASSPU_URL: '/admin/product/',
  //获取全部品牌的数据
  ALLTRADEMARK_URL: '/admin/product/baseTrademark/getTrademarkList',
  //获取某个SPU下的商品图片数据
  IMAGE_URL: '/admin/product/spuImageList/',
  //获取某个SPU下的属性列表
  SPUHASSALEATTR_URL: '/admin/product/spuSaleAttrList/',
  //获取全部的销售属性
  ALLSALEATTR_URL: '/admin/product/baseSaleAttrList',
  //添加新的SPU
  ADDSOU_URL: '/admin/product/saveSpuInfo',
  //更新已有的SPU
  UPDATE_URL: '/admin/product/updateSpuInfo'
} as const

//获取某一个三级分类下已有的SPU数据
export const reqHasSpu = (
  page: number,
  limit: number,
  category3Id: number | string
) =>
  request.get<any, HasSpuResponseData>(API.HASSPU_URL + `${page}/${limit}`, {
    params: {
      category3Id
    }
  })
//获取全部的SPU的品牌的数据
export const reqAllTradeMark = () =>
  request.get<any, AllTrademark>(API.ALLTRADEMARK_URL)
//获取某个SPU下的商品图片数据
export const reqSpuImageList = (spuId: number | string) =>
  request.get<any, SpuHasImg>(API.IMAGE_URL + spuId)
//获取某个SPU下的属性列表
export const reqSpuHasSaleAttr = (spuId: number | string) =>
  request.get<any, SaleAttrResponseData>(API.SPUHASSALEATTR_URL + spuId)
//获取全部的销售属性
export const reqAllSaleAttr = () =>
  request.get<any, HasSaleAttrResponseData>(API.ALLSALEATTR_URL)
//添加或更新SPU
export const reqAddOrUpdateSpu = (data: SpuData) => {
  //如果SPUId存在，则是更新操作
  if (data.id) {
    return request.post<any, any>(API.UPDATE_URL, data)
  } else {
    //否则是添加操作
    return request.post<any, any>(API.ADDSOU_URL, data)
  }
}
