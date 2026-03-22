<template>
  <div>
    <h1>scss测试</h1>
  </div>
</template>

<script lang="ts" setup>
import request from '@/utils/request'
import { onMounted } from 'vue'

onMounted(async () => {
  const res = await request.post('/user/login', {
    username: 'admin',
    password: '111111'
  })
  console.log(res)
})
</script>

<style lang="scss">
div {
  h1 {
    color: $color;
  }
}
</style>
