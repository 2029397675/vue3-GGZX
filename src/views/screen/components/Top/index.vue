<template>
  <div class="top">
    <div class="left">
      <span class="lbtn"></span>
    </div>
    <div class="center">
      <router-link to="/home">
        <div class="ltn">首页</div>
      </router-link>
      <div class="ctn">智慧旅游可视化大数据平台</div>
      <div class="rtn">统计报告</div>
    </div>
    <div class="right">当前时间{{ time }}</div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import moment from 'moment'

const time = ref(moment().format('YYYY年-MM月-DD日 HH:mm:ss'))
const timer = ref<number>(0)
// 模拟时间更新
onMounted(() => {
  timer.value = setInterval(() => {
    time.value = moment().format('YYYY年-MM月-DD日 HH:mm:ss')
  }, 1000)
})
// 清除定时器
onBeforeUnmount(() => {
  clearInterval(timer.value)
})
</script>

<style lang="scss" scoped>
.top {
  width: 100%;
  height: 42px;
  display: flex;
  .left {
    flex: 1;
    background: url(../../images/dataScreen-header-left-bg.png) no-repeat;
    background-size: cover;
  }
  .center {
    flex: 2;
    display: flex;
    .ltn {
      width: 150px;
      height: 48px;
      background: url(../../images/dataScreen-header-btn-bg-l.png) no-repeat;
      background-size: 100% 100%;
      text-align: center;
      line-height: 42px;
      color: #29fcfc;
      font-size: 20px;
      margin-left: -36px;
    }
    .ctn {
      width: 760px;
      height: 74px;
      background: url(../../images/dataScreen-header-center-bg.png);
      background-size: 100% 100%;
      text-align: center;
      line-height: 74px;
      color: #29fcfc;
      font-size: 30px;
    }
    .rtn {
      width: 150px;
      height: 48px;
      background: url(../../images/dataScreen-header-btn-bg-r.png) no-repeat;
      background-size: 100% 100%;
      text-align: center;
      line-height: 42px;
      color: #29fcfc;
      font-size: 20px;
      margin-right: -36px;
    }
  }
  .right {
    flex: 1;
    background: url(../../images/dataScreen-header-right-bg.png) no-repeat;
    background-size: cover;
    text-align: center;
    line-height: 42px;
    color: #29fcfc;
    font-size: 16px;
  }
}
</style>
