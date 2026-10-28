<template>
  <div class="container">
    <!-- 数据大屏展示区 -->
    <div ref="screen" class="screen">
      <div class="top"><Top></Top></div>
      <div class="bottom">
        <div class="left">
          <Tourist class="tourist"></Tourist>
          <Sex class="sex"></Sex>
          <Age class="age"></Age>
        </div>
        <div class="center">中间</div>
        <div class="right">右侧</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
//引入顶部子组件
import Top from './components/Top/index.vue' // 引入顶部子组件
//引入左侧子组件
import Tourist from './components/Tourist/index.vue' // 引入左侧子组件
import Age from './components/Age/index.vue' // 引入左侧子组件
import Sex from './components/Sex/index.vue' // 引入左侧子组件

import { ref, onMounted, nextTick } from 'vue'

//获取屏幕元素的引用
const screen = ref() // 用于引用屏幕元素
//定义屏幕元素的缩放比例
const getScale = (w = 1920, h = 1080) => {
  let ww = window.innerWidth / w
  let wh = window.innerHeight / h
  return ww > wh ? wh : ww
}
onMounted(() => {
  nextTick(() => {
    // 设置屏幕元素的缩放比例
    screen.value.style.transform = `scale(${getScale()}) translate(-50%, -50%)`
  })
})
window.onresize = () => {
  screen.value.style.transform = `scale(${getScale()}) translate(-50%, -50%)`
}
</script>

<style lang="scss" scoped>
.container {
  width: 100vw;
  height: 100vh;
  background: url(./images/bg.png) no-repeat center center / cover;
  .screen {
    position: fixed;
    width: 1920px;
    height: 1080px;
    left: 50%;
    top: 50%;
    transform-origin: left top;
    transform: scale(0.5) translate(-50%, -50%);
    .top {
      width: 100%;
      height: 42px;
    }
    .bottom {
      display: flex;
      .left {
        flex: 1;
        display: flex;
        flex-direction: column;
        height: 1038px;
        .tourist {
          flex: 1.2;
        }
        .age {
          flex: 1;
        }
        .sex {
          flex: 1;
        }
      }
      .center {
        flex: 3;
      }
      .right {
        flex: 1;
      }
    }
  }
}
</style>
