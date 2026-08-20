<template>
  <div>
    <Category></Category>
    <el-card style="margin: 20px 0">
      <el-button type="primary" icon="Plus">添加属性</el-button>
      <el-table border style="margin: 10px 0">
        <el-table-column
          label="序号"
          type="index"
          align="center"
          width="150px"
        ></el-table-column>
        <el-table-column label="属性名称" width="250px"></el-table-column>
        <el-table-column label="属性值名称"></el-table-column>
        <el-table-column label="操作" width="250px"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped></style>
