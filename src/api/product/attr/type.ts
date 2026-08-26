//分类相关数据的ts类型
export interface ResponsData {
  code: number
  message: string
  data: categoryObj[]
  ok: boolean
}

export interface categoryObj {
  id: number | string
  name: string
  category1Id?: number
  category2Id?: number
}
//相应的接口返回的数据
export interface CategoryResponseData extends ResponsData {
  data: categoryObj[]
}
//属性与属性值的ts类型
export interface AttrValue {
  id?: number
  valueName: string
  attrId?: number
  flag?: boolean
}
export interface AttrData {
  id?: number
  attrName: string
  categoryId: number | string
  categoryLevel: number
  attrValueList: AttrValue[]
}
export interface AttrResponseData {
  code: number
  message: string
  data: AttrData[]
  ok: boolean
}
