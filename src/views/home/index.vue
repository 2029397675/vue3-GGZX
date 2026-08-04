<template>
  <div>
    <h1>Home {{ userStore.username }}</h1>
  </div>
</template>

<script lang="ts" setup>
//引入生命周期函数
import { onMounted } from 'vue'
//获取用户仓库
import useUserStore from '@/store/modules/user'
const userStore = useUserStore()
onMounted(() => {
  userStore.userInfo() //获取用户信息
})
</script>

<style lang="scss" scoped></style>
