<template>
  <!-- 顶部左侧静态 -->
  <el-icon style="margin-right: 10px" @click="changeIcon">
    <component :is="layoutSettingStore.fold ? 'Fold' : 'Expand'"></component>
  </el-icon>
  <!-- 左侧面包屑导航： -->
  <el-breadcrumb separator-icon="ArrowRight">
    <!-- 面包屑动态展示路由名字与标题 -->
    <el-breadcrumb-item
      v-for="item in route.matched"
      v-show="item.meta.title"
      :key="item.path"
      :to="item.path"
    >
      <!-- 图标 -->
      <el-icon>
        <component :is="item.meta.icon"></component>
      </el-icon>
      <!-- 根据路由元信息获取标题 -->
      <span style="margin: 0 3px; vertical-align: top">
        {{ item.meta.title }}
      </span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script lang="ts" setup>
import useLayoutSettingStore from '@/store/modules/setting'
import { useRoute } from 'vue-router'

const layoutSettingStore = useLayoutSettingStore()
const route = useRoute()
//点击图标的方法
const changeIcon = () => {
  layoutSettingStore.fold = !layoutSettingStore.fold
}
</script>

<style lang="scss" scoped></style>
