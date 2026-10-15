<template>
  <div>
    <el-card>
      <el-form :inline="true">
        <el-form-item label="用户名：">
          <el-input placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">搜索</el-button>
          <el-button type="default">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin: 10px 0">
      <el-button type="primary">添加用户</el-button>
      <el-button type="danger">批量删除</el-button>
      <!-- 表格展示用户信息 -->
      <el-table style="margin: 10px 0" border>
        <el-table-column align="center" type="selection"></el-table-column>
        <el-table-column align="center" label="#"></el-table-column>
        <el-table-column align="center" label="ID"></el-table-column>
        <el-table-column align="center" label="用户名字"></el-table-column>
        <el-table-column align="center" label="用户名称"></el-table-column>
        <el-table-column align="center" label="用户角色"></el-table-column>
        <el-table-column align="center" label="创建时间"></el-table-column>
        <el-table-column align="center" label="更新时间"></el-table-column>
        <el-table-column align="center" label="操作" width="260px">
          <template #default="{ row }">
            <el-button icon="User" type="primary">分配角色</el-button>
            <el-button icon="Edit" type="info">编辑</el-button>
            <el-button icon="Delete" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination
        v-model:current-page="pageNo"
        v-model:page-size="pageSize"
        :page-sizes="[5, 7, 9, 11]"
        :background="true"
        layout="totalprev, pager, next, jumper,->,sizes,total"
        :total="400"
      />
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

//默认页码
const pageNo = ref(1)
//默认每页显示条数
const pageSize = ref(5)
</script>

<style lang="scss" scoped>
.el-card {
  .el-form {
    height: 80px;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .el-form-item {
      margin-bottom: 0;
    }
  }
}
</style>
