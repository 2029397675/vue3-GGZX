<template>
  <div>
    <Category></Category>
    <el-card>
      <el-form :inline="true">
        <el-form-item label="一级分类">
          <el-select placeholder="请选择">
            <el-option></el-option>
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

<script lang="ts" setup></script>

<style lang="scss" scoped></style>
