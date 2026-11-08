<template>
  <div class="line">
    <div class="title">
      <p>未来七天游客数量趋势图</p>
      <img src="../../images/dataScreen-title.png" alt="" />
    </div>
    <div ref="charts" class="charts"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

const charts = ref(null)

onMounted(() => {
  const myChart = echarts.init(charts.value)
  myChart.setOption({
    title: {
      text: '未来七天游客数量趋势图',
      left: 'center',
      top: '20px',
      textStyle: {
        color: '#fff',
        fontSize: 18
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'line'
      }
    },
    legend: {
      data: ['游客数量'],
      left: 'center',
      top: '60px',
      textStyle: {
        color: '#fff',
        fontSize: 16
      }
    },
    xAxis: {
      type: 'category',
      data: [
        '1月1日',
        '1月2日',
        '1月3日',
        '1月4日',
        '1月5日',
        '1月6日',
        '1月7日'
      ],
      axisLabel: {
        color: '#fff',
        fontSize: 14
      },
      splitLine: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        color: '#fff',
        fontSize: 14
      },
      splitLine: {
        show: false
      }
    },
    series: [
      {
        name: '游客数量',
        type: 'line',
        data: [120, 200, 150, 80, 70, 110, 130],
        label: {
          show: true,
          position: 'top'
        },
        areaStyle: {
          color: '#409EFF'
        }
      }
    ],
    responsive: true, // 自动适应容器大小
    grid: {
      left: '10%',
      right: '10%',
      bottom: '10%',
      top: '20%'
    }, // 设置图表的网格区域
    color: ['#409EFF'], // 设置图表的颜色
    // backgroundColor: '#000000', // 设置图表的背景颜色
    textStyle: {
      color: '#fff' // 设置文本的颜色
    }
  })
})
</script>

<style lang="scss" scoped>
.line {
  width: 100%;
  height: 100%;
  background: url(../../images/dataScreen-main-cb.png);
  background-size: 100% 100%;

  .title {
    margin-left: 10px;
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
