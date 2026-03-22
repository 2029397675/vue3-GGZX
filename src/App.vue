<template>
  <div>
    <h1>scss测试</h1>
  </div>
</template>

<script lang="ts" setup>
import axios from 'axios'
import { onMounted } from 'vue'

onMounted(async () => {
  const res = await axios.post('/api/user/login', {
    username: 'admin',
    password: '1121111'
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
