<template>
  <!-- 顶部右侧动态 -->
  <el-button plain icon="Refresh" circle @click="updateRefresj"></el-button>
  <el-button plain icon="FullScreen" circle @click="fullScreen"></el-button>
  <el-button plain icon="Setting" circle></el-button>
  <img
    :src="userStore.avatar"
    style="width: 32px; height: 32px; margin: 0 10px; border-radius: 50%"
  />
  <!-- 右侧下拉菜单： -->
  <el-dropdown>
    <span class="el-dropdown-link">
      {{ userStore.username }}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

+
<script lang="ts" setup>
//获取用户仓库
import useUserStore from '@/store/modules/user'
const userStore = useUserStore()
//获取layout设置的小仓库
import useLayOutSettingStore from '@/store/modules/setting'
//获取路由实例
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()

const layoutSettingStore = useLayOutSettingStore()
//更新刷新状态
const updateRefresj = () => {
  layoutSettingStore.refresh = !layoutSettingStore.refresh
}
//全屏按钮
const fullScreen = () => {
  if (document.fullscreenElement) {
    document.exitFullscreen()
  } else {
    document.documentElement.requestFullscreen()
  }
}
//退出登录
const logout = () => {
  userStore.userLogout()
  router.push({ path: '/login', query: { redirect: route.path } }) //跳转到登录页面
}
</script>

<style lang="scss" scoped></style>
