<template>
  <div>
    <Category></Category>
    <el-card style="margin: 20px 0">
      <el-button :disabled="!categoryStore.c3Id" type="primary" icon="Plus">
        添加属性
      </el-button>
      <el-table border style="margin: 10px 0" :data="attrArr">
        <el-table-column
          label="序号"
          type="index"
          align="center"
          width="150px"
        ></el-table-column>
        <el-table-column
          label="属性名称"
          prop="attrName"
          width="250px"
        ></el-table-column>
        <el-table-column label="属性值名称">
          <template #default="{ row }">
            <el-tag
              v-for="item in row.attrValueList"
              :key="item.id"
              style="margin: 5px"
            >
              {{ item.valueName }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="250px">
          <template #default="{ row }">
            <el-button type="warning" size="default" icon="Edit"></el-button>
            <el-button type="danger" size="default" icon="Delete"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { watch, ref } from 'vue'
import { reqAttr } from '@/api/product/attr'
import type { AttrResponseData, AttrData } from '@/api/product/attr/type'
import useCategoryStore from '@/store/modules/category'

const categoryStore = useCategoryStore()
const attrArr = ref<AttrData[]>([])
//监听仓库三级分类id的变化
watch(
  () => categoryStore.c3Id,
  async newValue => {
    attrArr.value = [] //清空属性数据数组
    if (
      newValue === '' ||
      newValue === null ||
      newValue === undefined ||
      newValue === 0
    ) //三级分类id为空或者undefined或者0时，不请求属性数据
    {
      return
    }
    getAttr() //请求属性数据
  }
)
//请求属性数据
const getAttr = async () => {
  const { c1Id, c2Id, c3Id } = categoryStore
  const res: AttrResponseData = await reqAttr(c1Id, c2Id, c3Id) //请求属性数据
  if (res.code === 200) {
    attrArr.value = res.data
  }
}
</script>

<style lang="scss" scoped></style>
