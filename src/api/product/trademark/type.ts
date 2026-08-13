// 品牌信息
export interface Trademark {
  id: number
  ID: number
  logoUrl: string
  tmName: string
  createTime: string
  updateTime: string
}

// 品牌列表接口返回数据
export interface TrademarkResponseData {
  current: number
  pages: number
  records: Trademark[]
  searchCount: boolean
  size: number
  total: number
}
