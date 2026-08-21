<template>
  <div>
    <el-card>
      <el-form :inline="true">
        <el-form-item label="一级分类">
          <el-select v-model="categoryStore.c1Id" placeholder="请选择">
            <el-option
              v-for="item in categoryStore.c1Arr"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类">
          <el-select placeholder="请选择">
            <el-option></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="三级分类">
          <el-select placeholder="请选择">
            <el-option></el-option>
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
</script>

<style lang="scss" scoped>
.el-select {
  width: 240px;
}
</style>
