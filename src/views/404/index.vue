<template>
  <div class="box">
    <img src="../../assets/images/error_images/404.png" alt="" />
    <el-button type="primary" @click="$router.push('/')">返回首页</el-button>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.box {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
