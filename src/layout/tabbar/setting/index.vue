<template>
  <!-- 顶部右侧动态 -->
  <el-button plain icon="Refresh" circle @click="updateRefresj"></el-button>
  <el-button plain icon="FullScreen" circle></el-button>
  <el-button plain icon="Setting" circle></el-button>
  <img
    src="../../../../public/logo.png"
    style="width: 32px; height: 32px; margin: 0 10px"
  />
  <!-- 右侧下拉菜单： -->
  <el-dropdown>
    <span class="el-dropdown-link">
      admin
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

+
<script lang="ts" setup>
//获取layout设置的小仓库
import useLayOutSettingStore from '@/store/modules/setting'

const layoutSettingStore = useLayOutSettingStore()
//更新刷新状态
const updateRefresj = () => {
  layoutSettingStore.refresh = !layoutSettingStore.refresh
}
</script>

<style lang="scss" scoped></style>
