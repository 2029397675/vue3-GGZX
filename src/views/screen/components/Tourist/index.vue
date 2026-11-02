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
  const option = {
    backgroundColor: 'transparent',

    series: [
      {
        type: 'liquidFill',
        data: [0.65, 0.63],

        radius: '78%',
        center: ['50%', '48%'],

        outline: {
          show: false
        },

        backgroundStyle: {
          color: '#082746',
          borderWidth: 0,
          shadowBlur: 22,
          shadowColor: '#00e5dc'
        },

        color: [
          {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: '#20f0bd' },
              { offset: 1, color: '#19a9d3' }
            ]
          },
          '#0cc9cf'
        ],

        amplitude: 8,
        waveLength: '70%',
        phase: 0,
        period: 2500,

        itemStyle: {
          opacity: 0.88,
          shadowBlur: 10,
          shadowColor: '#00e5d9'
        },

        label: {
          show: true,
          position: ['50%', '42%'],
          color: '#ffffff',
          fontSize: 18,
          fontWeight: 'bold',
          formatter: '78%'
        }
      }
    ],

    // 外围装饰圆弧
    graphic: [
      {
        type: 'arc',
        silent: true,
        z: 10,
        shape: {
          cx: '50%',
          cy: '48%',
          r: '44%',
          startAngle: Math.PI,
          endAngle: Math.PI * 2,
          clockwise: true
        },
        style: {
          stroke: '#28d9ed',
          lineWidth: 2,
          lineDash: [8, 6],
          fill: 'none',
          opacity: 0.85
        }
      },
      {
        type: 'arc',
        silent: true,
        z: 10,
        shape: {
          cx: '50%',
          cy: '48%',
          r: '44%',
          startAngle: 0,
          endAngle: Math.PI,
          clockwise: true
        },
        style: {
          stroke: '#23d7eb',
          lineWidth: 7,
          fill: 'none',
          lineCap: 'round'
        }
      }
    ]
  }

  myChart.setOption(option)
  myChart.setOption(option)
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
