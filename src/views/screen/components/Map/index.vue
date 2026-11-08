<template>
  <div ref="map" class="map"></div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
import chinaMapData from './china.json' //导入中国地图数据

//定义地图容器
const map = ref(null)
//注册中国地图
echarts.registerMap('china', chinaMapData as any)
onMounted(() => {
  //初始化echarts实例
  const myChart = echarts.init(map.value)
  //配置图表选项
  myChart.setOption({
    //地图组件
    geo: {
      map: 'china',
      roam: true,
      top: 66,
      left: 72,
      right: 72,
      //地图上的文字
      label: {
        show: true,
        color: '#fff'
      },
      itemStyle: {
        areaColor: '#4284DB'
      },
      emphasis: {
        itemStyle: {
          areaColor: 'white'
        }
      }
    },
    series: [
      {
        type: 'lines',
        data: [
          {
            coords: [
              [116.405285, 39.904989],
              [119.306239, 26.075302]
            ],
            lineStyle: {
              color: 'white',
              width: 3
            }
          }
        ],
        effect: {
          show: true,
          symbol: 'arrow',
          symbolSize: 10,
          trailLength: 0.3
        }
      }
    ]
  })
})
</script>

<style lang="scss" scoped></style>
