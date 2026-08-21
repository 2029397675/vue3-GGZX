//商品分类全局组件的仓库
import { defineStore } from 'pinia'
import { reqC1 } from '@/api/product/attr/index'
import { ref } from 'vue'
import type { categoryObj, CategoryResponseData } from '@/api/product/attr/type'

const useCategoryStore = defineStore('category', () => {
  //获取一级分类
  const c1Arr = ref<categoryObj[]>([]) //一级分类数据
  const c1Id = ref(0) //一级分类id
  const getC1 = async () => {
    const res: CategoryResponseData = await reqC1()
    if (res.code === 200) {
      c1Arr.value = res.data
    }
  }

  return { getC1, c1Arr, c1Id }
})

export default useCategoryStore
