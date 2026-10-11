<template>
  <div>
    <el-card>
      <el-table border style="margin: 10px 0">
        <el-table-column
          label="序号"
          type="index"
          align="center"
          width="150px"
        ></el-table-column>
        <el-table-column
          label="名称"
          width="200px"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="描述"
          width="200px"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column label="图片" width="200px"></el-table-column>
        <el-table-column label="重量" width="200px"></el-table-column>
        <el-table-column label="价格" width="200px"></el-table-column>
        <el-table-column label="操作" fixed="right"></el-table-column>
      </el-table>
      <el-pagination
        v-model:current-page="pageNo"
        v-model:page-size="pageSize"
        :page-sizes="[10, 200, 300, 40]"
        :background="true"
        layout="prev, pager, next, jumper,sizes,total"
        :total="400"
      />
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
//分页器当前页码
const pageNo = ref<number>(1)
//分页器每页显示条数
const pageSize = ref<number>(10)
//分页器大小
</script>

<style lang="scss" scoped></style>
