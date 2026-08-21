<template>
  <div>
    <el-card>
      <el-form :inline="true">
        <el-form-item label="一级分类">
          <el-select
            v-model="categoryStore.c1Id"
            placeholder="请选择"
            @change="handle"
          >
            <el-option
              v-for="item in categoryStore.c1Arr"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类">
          <el-select
            v-model="categoryStore.c2Id"
            placeholder="请选择"
            @change="handleC3"
          >
            <el-option
              v-for="item in categoryStore.c2Arr"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="三级分类">
          <el-select v-model="categoryStore.c3Id" placeholder="请选择">
            <el-option
              v-for="item in categoryStore.c3Arr"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import useCategoryStore from '@/store/modules/category'

const categoryStore = useCategoryStore()
//分类全局组件挂载完毕，通知仓库发请求获取一级分类的数据
//组件挂载后调用接口方法
const getC1 = () => {
  categoryStore.getC1()
}
onMounted(() => {
  getC1()
})
//处理一级分类的change事件
const handle = (val: number | string) => {
  //需要将二级、三级分类的数据清空
  categoryStore.c2Id = ''
  categoryStore.c3Arr = [] //清空三级分类的数据
  categoryStore.c3Id = ''

  categoryStore.getC2(val)
}
//处理二级分类的change事件
const handleC3 = (val: number | string) => {
  //清空三级分类的数据
  categoryStore.c3Id = '' //清空三级分类的数据
  categoryStore.getC3(val)
}
</script>

<style lang="scss" scoped>
.el-select {
  width: 240px;
}
</style>
