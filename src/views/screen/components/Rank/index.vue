<template>
  <div class="rank">
    <div class="title">
      <p>热门景区排行</p>
      <img src="../../images/dataScreen-title.png" alt="" />
    </div>
    <div ref="chart" class="charts"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

const chart = ref(null)
onMounted(() => {
  const myChart = echarts.init(chart.value)
  //一个容器同时展示多个图表
  myChart.setOption({
    title: {
      text: '景区排行',
      left: 'center',

      textStyle: {
        color: '#fff',
        fontSize: 20
      },
      subtext: '景区排行',
      subtextStyle: {
        color: '#fff',
        fontSize: 16
      }
    },
    xAxis: {
      type: 'category'
    },
    yAxis: {},
    grid: {
      left: 20,
      right: 20,
      bottom: 20
    },
    series: [
      {
        data: [10, 20, 30, 40, 50, 60, 70],
        type: 'bar',
        label: {
          show: true,
          position: 'top'
        },
        showBackground: true,
        backgroundStyle: {
          color: '#fefefe'
        }
      },
      {
        data: [10, 20, 30, 40, 50, 60, 70],
        type: 'line',
        smooth: true
      }
    ]
  })
})
</script>

<style lang="scss" scoped>
.rank {
  width: 100%;
  height: 100%;
  background: url(../../images/dataScreen-main-rb.png) no-repeat;
  background-size: 100% 100%;
  .title {
    margin-top: 10px;
    margin-left: 20px;
    p {
      color: white;
      font-size: 20px;
      margin-bottom: 5px;
    }
  }
  .charts {
    height: calc(100% - 40px);
  }
}
</style>
