//商品分类全局组件的仓库
import { defineStore } from 'pinia'
import { reqC1, reqC2, reqC3 } from '@/api/product/attr/index'
import { ref } from 'vue'
import type { categoryObj, CategoryResponseData } from '@/api/product/attr/type'

const useCategoryStore = defineStore('category', () => {
  //获取一级分类
  const c1Arr = ref<categoryObj[]>([]) //一级分类数据
  const c1Id = ref() //一级分类id
  const getC1 = async () => {
    const res: CategoryResponseData = await reqC1()
    if (res.code === 200) {
      c1Arr.value = res.data
    }
  }
  //获取二级分类
  const c2Arr = ref<categoryObj[]>([]) //二级分类数据
  const c2Id = ref() //二级分类id
  const getC2 = async (c1Id: number | string) => {
    const res: CategoryResponseData = await reqC2(c1Id)
    if (res.code === 200) {
      c2Arr.value = res.data
    }
  }
  //获取三级分类
  const c3Arr = ref<categoryObj[]>([]) //三级分类数据
  const c3Id = ref() //三级分类id
  //三级分类数据获取函数
  const getC3 = async (c2Id: number | string) => {
    const res: CategoryResponseData = await reqC3(c2Id)
    if (res.code === 200) {
      c3Arr.value = res.data
    }
  }
  return { getC1, c1Arr, c1Id, getC2, c2Arr, c2Id, getC3, c3Arr, c3Id }
})

export default useCategoryStore
