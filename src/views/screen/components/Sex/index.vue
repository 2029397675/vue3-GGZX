<template>
  <div class="box1">
    <div class="title">
      <p>男女比例</p>
      <img src="../../images/dataScreen-title.png" alt="" />
    </div>
    <div class="sex">
      <div class="man">
        <img src="../../images/man.png" alt="" />
      </div>
      <div class="woman">
        <img src="../../images/woman.png" alt="" />
      </div>
    </div>
    <div class="rate">
      <div class="top">
        <p>男士58%</p>
        <p>女士42%</p>
      </div>
    </div>
    <div ref="chart" class="chart"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

const chart = ref<HTMLElement>()
onMounted(() => {
  // 初始化图表
  const myChart = echarts.init(chart.value)
  myChart.setOption({
    title: {},
    xAxis: {
      show: false,
      min: 0,
      max: 100
    },
    yAxis: {
      show: false,
      type: 'category'
    },
    series: [
      {
        type: 'bar',
        data: [58],
        barWidth: 20, // 设置柱子的宽度
        itemStyle: {
          color: 'rgb(8, 85, 174)', // 设置柱子的颜  色
          borderRadius: 10
        },
        z: 10
      },
      {
        type: 'bar',
        data: [100],
        barWidth: 20, // 设置柱子的宽度
        barGap: '-100%', // 设置柱子之间的间距
        itemStyle: {
          color: '#FF6384', // 设置柱子的颜色
          borderRadius: 10 // 设置柱子的圆角
        }
      }
    ],
    grid: {
      left: '20%',
      right: '20%',
      top: '10%',
      bottom: '10%'
    }
  })
})
</script>

<style lang="scss" scoped>
.box1 {
  width: 100%;
  height: 100%;
  background: url(../../images/dataScreen-main-lb.png) no-repeat;
  background-size: 100% 100%;
  margin: 20px 0;
  .title {
    margin-left: 20px;
    p {
      color: white;
      font-size: 20px;
      margin-bottom: 5px;
    }
  }
  .sex {
    display: flex;
    justify-content: center;
    .man {
      width: 111px;
      height: 115px;
      margin: 20px 0;
      background: url(../../images/man-bg.png);
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .woman {
      width: 111px;
      height: 115px;
      margin: 20px 0;
      background: url(../../images/woman-bg.png);
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .rate {
    display: flex;
    margin: 0 auto;
    width: 56%;
    justify-content: center;
    color: white;
    .top {
      display: flex;
      width: 100%;
      justify-content: space-between;
    }
  }
  .chart {
    height: 100px;
  }
}
</style>
