<template>
  <el-card class="box-card">
    <!-- 卡片顶部添加品牌按钮 -->
    <el-button type="primary" icon="Plus">添加品牌</el-button>
    <!-- 表格组件：用于展示已有的平台数据 -->
    <el-table class="el-table" border :data="trademarkArr">
      <el-table-column
        prop="date"
        label="序号"
        align="center"
        width="80"
        type="index"
      />
      <el-table-column label="品牌名称" width="180">
        <template #default="{ row }">{{ row.tmName }}</template>
      </el-table-column>
      <el-table-column label="品牌LOGO" width="180">
        <template #default="{ row }">
          <img
            :src="row.logoUrl"
            alt="图片无法显示"
            style="width: 100px; height: 100px"
          />
        </template>
      </el-table-column>
      <el-table-column label="品牌操作">
        <template #default="{ row }">
          <el-button type="primary" size="small" icon="Edit"></el-button>
          <el-button type="danger" size="small" icon="Delete"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件：用于分页展示数据 -->
    <el-pagination
      v-model:current-page="pageNo"
      v-model:page-size="limit"
      size="large"
      :page-sizes="[3, 5, 7, 9]"
      :background="true"
      layout=" prev, pager, next, jumper,->,sizes,total"
      :total="total"
    />
  </el-card>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { reqHasTrademark } from '@/api/product/trademark'
// 分页组件的参数
//1. 当前页码
const pageNo = ref<number>(1)
//2. 每页显示的条数
const limit = ref<number>(3)
//3. 品牌数据总数
const total = ref<number>(0)
//4. 存储获取的品牌数据
const trademarkArr = ref([])
// 请求品牌数据
const getHasTrademark = async () => {
  const res = await reqHasTrademark(pageNo.value, limit.value)
  console.log(res) // 打印品牌数据
  if (res.code === 200) {
    total.value = res.data.total // 设置品牌数据总数
    trademarkArr.value = res.data.records
  }
}
// 页面加载时获取品牌数据
//1. 获取品牌数据
onMounted(() => {
  getHasTrademark()
})
</script>

<style lang="scss" scoped>
.el-table {
  margin: 10px 0;
}
</style>
