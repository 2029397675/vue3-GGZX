<template>
  <div>
    <!-- 路由组件出口的位置 -->
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <!-- 渲染layout一级路由组件的子路由 -->
        <component :is="Component" v-if="flag"></component>
      </transition>
    </router-view>
  </div>
</template>

<script lang="ts" setup>
import { watch, ref, nextTick } from 'vue'
//layout设置的小仓库
import useLayoutSettingStore from '@/store/modules/setting'
const layoutSettingStore = useLayoutSettingStore()
//控制当前组件是否销毁
const flag = ref(true)
//监听小仓库的刷新状态
watch(
  () => layoutSettingStore.refresh,
  () => {
    flag.value = false
    nextTick(() => {
      flag.value = true
    })
  }
)
</script>

<style lang="scss" scoped>
.fade-enter-from {
  opacity: 0;
}
.fade-enter-active {
  transition: all 0.5s ease;
}
.fade-enter-to {
  opacity: 1;
}
</style>
