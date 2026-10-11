export interface ResponseData {
  code: number
  message: string
  ok: boolean
}
// sku类型列表
export interface SkuData {
  category3Id: number | string
  spuID: number | string
  tmId: number | string
  skuName: string
  price: number | string
  weight: number | string
  skuDesc: string
  skuAttrValueList?: {
    attrId: number | string
    valueId: number | string
  }[]
  skuSaleAttrValueList?: {
    saleAttrId: number | string
    saleAttrValueId: number | string
  }[]
  skuDefaultImg: string
}
export interface SaleAttrValue {
  id?: number
  createTime?: null
  updateTime?: null
  spuId?: number
  baseSaleAttrId: number | string
  saleAttrValueName: string
  saleAttrName?: string
  isChecked?: boolean
}
export type SpuSaleAttrValueList = SaleAttrValue[]
export interface SaleAttr {
  id?: number
  createTime?: null
  updateTime?: null
  spuId?: number
  baseSaleAttrId: number
  saleAttrName: string
  spuSaleAttrValueList: SpuSaleAttrValueList
  flag?: boolean
  saleAttrValue?: string
}
//获取SKU接口返回的数据ts类型
export interface SkuResponseData extends ResponseData {
  data: {
    records: SkuData[]
    total: number
    size: number
    current: number
    orders: []
    optimizeCountSql: boolean
    hitCount: boolean
    countId: null
    maxLimit: null
    searchCount: boolean
    pages: number
  }
}
