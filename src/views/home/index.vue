<template>
  <div>
    <el-card>
      <div class="box">
        <img class="avatar" :src="userStore.avatar" alt="" />
        <div class="title">
          <h3>{{ getTime() }}好！{{ userStore.username }}</h3>
          <p>硅谷甄选运营平台！</p>
        </div>
      </div>
    </el-card>
    <div class="bottom">
      <svg-icon width="900px" height="600px" name="welcome"></svg-icon>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { getTime } from '@/utils/time'
import useUserStore from '@/store/modules/user'

const userStore = useUserStore()
</script>

<style lang="scss" scoped>
.box {
  display: flex;
  .avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
  .title {
    margin-left: 20px;
    h3 {
      font-size: 30px;
      font-weight: 900;
      margin-top: 15px;
      margin-bottom: 30px;
    }
    p {
      font-style: italic;
      color: silver;
    }
  }
}
.bottom {
  display: flex;
  justify-content: center;
}
</style>
