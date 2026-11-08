<template>
  <div class="box2">
    <div class="title">
      <p>年龄比例</p>
      <img src="../../images/dataScreen-title.png" alt="" />
    </div>
    <div ref="charts" class="charts"></div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'

const charts = ref(null)
onMounted(() => {
  const myChart = echarts.init(charts.value)
  const option = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '40',
      right: 10,
      orient: 'vertical',
      textStyle: {
        color: '#fff',
        fontSize: 14
      }
    },

    series: [
      {
        name: 'Access From',
        type: 'pie',
        center: ['35%', '50%'],
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: true,
          position: 'inside',
          color: '#fff'
        },

        labelLine: {
          show: false
        },
        data: [
          { value: 1048, name: '游客' },
          { value: 735, name: '员工' },
          { value: 580, name: '供应商' },
          { value: 484, name: '广告' },
          { value: 300, name: '其他' }
        ]
      }
    ],
    // 设置图表的位置
    grid: {
      left: 10,
      right: 0,
      top: 0,
      bottom: 0
    }
  }
  myChart.setOption(option)
})
</script>

<style lang="scss" scoped>
.box2 {
  width: 100%;
  height: 100%;
  background: url(../../images/dataScreen-main-lb.png) no-repeat;
  background-size: 100% 100%;
  .title {
    margin-left: 20px;
    p {
      color: white;
      font-size: 20px;
      margin-bottom: 5px;
    }
  }
  .charts {
    height: 260px;
  }
}
</style>
