<template>
  <div class="counter">
    <div class="title">
      <p>比例等级</p>
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

  let option = {
    series: [
      {
        type: 'gauge',
        startAngle: 180,
        endAngle: 0,
        center: ['50%', '75%'],
        radius: '90%',
        min: 0,
        max: 1,
        splitNumber: 8,
        axisLine: {
          lineStyle: {
            width: 6,
            color: [
              [0.25, '#FF6E76'],
              [0.5, '#FDDD60'],
              [0.75, '#58D9F9'],
              [1, '#7CFFB2']
            ]
          }
        },
        pointer: {
          icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
          length: '12%',
          width: 20,
          offsetCenter: [0, '-60%'],
          itemStyle: {
            color: 'auto'
          }
        },
        axisTick: {
          length: 12,
          lineStyle: {
            color: 'auto',
            width: 2
          }
        },
        splitLine: {
          length: 20,
          lineStyle: {
            color: 'auto',
            width: 5
          }
        },
        axisLabel: {
          color: 'white',
          fontSize: 20,
          distance: -60,
          rotate: 'tangential',
          formatter: function (value: any) {
            if (value === 0.875) {
              return 'Grade A'
            } else if (value === 0.625) {
              return 'Grade B'
            } else if (value === 0.375) {
              return 'Grade C'
            } else if (value === 0.125) {
              return 'Grade D'
            }
            return ''
          }
        },
        title: {
          offsetCenter: [0, '-10%'],
          fontSize: 20
        },
        detail: {
          fontSize: 30,
          offsetCenter: [0, '-35%'],
          valueAnimation: true,
          formatter: function (value: any) {
            return Math.round(value * 100) + ''
          },
          color: 'inherit'
        },
        data: [
          {
            value: 0.7,
            name: 'Grade Rating'
          }
        ]
      }
    ]
  }
  myChart.setOption(option)
})
</script>

<style lang="scss" scoped>
.counter {
  width: 100%;
  height: 100%;
  background: url(../../images/dataScreen-main-rb.png) no-repeat;
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
    height: calc(100% - 40px);
  }
}
</style>
