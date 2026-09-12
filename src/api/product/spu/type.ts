//服务器接口返回的通用数据类型
export interface ResponseData {
  code: number
  message: string
  ok: boolean
}
//SPU数据类型
export interface SpuData {
  id?: number
  spuName: string
  description: string
  category3Id: number | string
  tmId: number
  spuSaleAttrList: null
  spuImageList: null
}
//数组：元素是SpuData类型
export type Records = SpuData[]
//定义获取已有的SPU接口返回的数据ts类型
export interface HasSpuResponseData extends ResponseData {
  data: {
    records: Records
    total: number
    size: number
    current: number
    searchCount: boolean
    pages: number
  }
}
//品牌数据的ts类型
export interface Trademark {
  id: number
  tmName: string
  logoUrl: string
}
//品牌接口返回的数据ts类型
export interface AllTrademark extends ResponseData {
  data: Trademark[]
}
//商品图片的数据类型
export interface SpuImage {
  id: number
  createTime: string
  updateTime: string
  spuId: number
  imgName: string
  imgUrl: string
}
//已有的SPU的图片墙的数据类型
export interface SpuHasImg extends ResponseData {
  data: SpuImage[]
}
//已有的销售属性值的列表
export interface SaleAttrValue {
  id?: number
  createTime: null
  updateTime: null
  spuId: number
  baseSaleAttrId: number
  saleAttrValueName: string
  saleAttrName: string
  isChecked: boolean
}
//已有的销售属性值的列表
export type SpuSaleAttrValueList = SaleAttrValue[]
//销售属性对象
export interface SaleAttr {
  id?: number
  createTime: null
  updateTime: null
  spuId: number
  baseSaleAttrId: number
  saleAttrName: string
  spuSaleAttrValueList: SpuSaleAttrValueList
}
//SPU销售属性接口返回的数据类型
export interface SaleAttrResponseData extends ResponseData {
  data: SaleAttr[]
}
//全部SPU销售属性接口返回的数据类型
export interface HasSaleAttr {
  id: number
  name: string
}
export interface HasSaleAttrResponseData extends ResponseData {
  data: HasSaleAttr[]
}
