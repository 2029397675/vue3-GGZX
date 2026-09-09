import request from '@/utils/request'
import type { HasSpuResponseData } from './type'

const API = {
  //获取已有的SPU数据
  HASSPU_URL: '/admin/product/'
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
