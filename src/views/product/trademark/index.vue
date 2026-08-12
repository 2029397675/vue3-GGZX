<template>
  <el-card class="box-card">
    <!-- 卡片顶部添加品牌按钮 -->
    <el-button type="primary" icon="Plus">添加品牌</el-button>
    <!-- 表格组件：用于展示已有的平台数据 -->
    <el-table class="el-table" border>
      <el-table-column prop="date" label="序号" align="center" width="80" />
      <el-table-column prop="name" label="品牌名称" width="180" />
      <el-table-column prop="name" label="品牌LOGO" width="180" />
      <el-table-column prop="address" label="品牌操作" />
    </el-table>
    <!-- 分页组件：用于分页展示数据 -->
    <el-pagination
      v-model:current-page="pageNo"
      v-model:page-size="limit"
      size="large"
      :page-sizes="[3, 5, 7, 9]"
      :background="true"
      layout=" prev, pager, next, jumper,->,sizes,total"
      :total="400"
    />
  </el-card>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

// 分页组件的参数
//1. 当前页码
const pageNo = ref<number>(1)
//2. 每页显示的条数
const limit = ref<number>(3)
</script>

<style lang="scss" scoped>
.el-table {
  margin: 10px 0;
}
</style>
