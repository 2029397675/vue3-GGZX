<template>
  <div>
    <el-card>
      <el-form :inline="true" class="form">
        <el-form-item label="职位搜索">
          <el-input placeholder="请你输入走索职位关键字"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">搜索</el-button>
          <el-button type="primary">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin-top: 10px 0">
      <el-button type="primary" icon="Plus">添加角色</el-button>
      <el-table border style="margin: 10px 0">
        <el-table-column
          type="index"
          align="center"
          label="#"
        ></el-table-column>
        <el-table-column align="center" label="ID"></el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          label="角色名称"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          label="创建时间"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          label="更新时间"
        ></el-table-column>
        <el-table-column
          align="center"
          label="操作"
          width="260"
        ></el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination
        v-model:current-page="pageNo"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30, 40]"
        :background="true"
        layout="prev, pager, next, jumper,->,sizes,total"
        :total="400"
      />
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

//#region分页器
//当前页码
const pageNo = ref<number>(1)
//每页显示条数
const pageSize = ref<number>(10)
</script>

<style lang="scss" scoped>
.form {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  .el-form-item {
    margin-bottom: 0;
  }
}
</style>
