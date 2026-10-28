<template>
  <div class="box">
    <div class="top">
      <p class="title">实时游客统计</p>
      <p class="bg"></p>
      <p class="right">
        可预约总量
        <span>99999</span>
      </p>
    </div>
    <div class="number">
      <span v-for="(item, index) in people" :key="index">{{ item }}</span>
    </div>
    <!-- E-Charts展示图标结构 -->
    <div ref="charts" class="chart"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
import 'echarts-liquidfill'

const people = ref<string>('216908人')
const charts = ref<HTMLElement>()

onMounted(() => {
  // 初始化echarts实例
  const myChart = echarts.init(charts.value)
  // 配置图表选项
  myChart.setOption({
    xAxis: {},
    yAxis: {},
    series: [
      {
        type: 'liquidFill',
        data: [0.6],
        waveAnimation: true,
        animationDuration: 0,
        animationDurationUpdate: 0,
        radius: '100%', // 设置波浪的半径
        outline: {
          show: true,
          borderDistance: 8,
          itemStyle: {
            color: 'none',
            borderColor: '#294D99',
            borderWidth: 8,
            shadowBlur: 20,
            shadowColor: 'rgba(0, 0, 0, 0.25)'
          }
        }
      }
    ],
    grid: {
      left: 0,
      right: 0,
      bottom: 0,
      top: 0
    }
  })
})
</script>

<style lang="scss" scoped>
.box {
  background: url(../../images/dataScreen-main-lb.png) no-repeat;
  background-size: 100% 100%;
  margin-top: 10px;
  .top {
    margin-left: 20px;

    .title {
      color: white;
      font-size: 20px;
    }
    .bg {
      width: 68px;
      height: 7px;
      background: url(../../images/dataScreen-title.png) no-repeat;
      background-size: 100% 100%;
      margin-top: 10px;
    }
    .right {
      float: right;
      color: white;
      font-size: 20px;
      span {
        color: yellowgreen;
      }
    }
  }
  .number {
    margin-top: 30px;
    display: flex;
    padding: 10px;
    span {
      flex: 1;
      height: 40px;
      text-align: center;
      line-height: 40px;
      background: url(../../images/total.png);
      background-size: 100% 100%;
      color: #29fcfc;
    }
  }
  .chart {
    width: 100%;
    height: 260px;
  }
}
</style>
