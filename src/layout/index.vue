<template>
  <div class="layout_container">
    <!-- 左侧菜单 -->
    <div class="layout_slider">
      <Logo></Logo>
      <!-- 展示菜单 -->
      <!-- 滚动组件 -->
      <el-scrollbar class="scrollbar">
        <!-- 菜单组件 -->
        <el-menu
          background-color="#001529"
          text-color="white"
          active-text-color="yellowgreen"
          :default-active="route.path"
        >
          <!-- 根据路由动态生成菜单 -->
          <Menu :menu-list="userStore.menuRoutes"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <!-- 顶部导航 -->
    <div class="layout_tabbar">
      <!-- layout组件的顶部导航tabbar -->
      <Tabbar></Tabbar>
    </div>
    <!-- 内容展示区 -->
    <div class="layout_main">
      <Main></Main>
    </div>
  </div>
</template>

<script lang="ts" setup>
//获取路由对象
import { useRoute } from 'vue-router'
const route = useRoute()

//引入右侧内容展示区组件
import Main from './main/index.vue'

//引入左侧菜单logo子组件
import Logo from './logo/index.vue'
//引入左侧菜单动态菜单子组件
import Menu from './menu/index.vue'
//引入顶部tabbar子组件
import Tabbar from './tabbar/index.vue'

//获取用户相关的小仓库
import useUserStore from '@/store/modules/user'
const userStore = useUserStore()
</script>

<style lang="scss" scoped>
.layout_container {
  width: 100%;
  height: 100vh;
  background-color: #3d3da8;
  .layout_slider {
    width: $base-menu-width;
    height: 100%;
    color: white;
    background-color: $base-menu-bgcolor;
    .scrollbar {
      width: 100%;
      height: calc(100vh - $base-menu-logo-height);
      .el-menu {
        border-right: none;
      }
    }
  }
  .layout_tabbar {
    position: fixed;
    top: 0;
    left: $base-menu-width;
    width: calc(100% - $base-menu-width);
    height: $base-tabbar-height;
    background-color: $base-tabbar-bgcolor;
  }
  .layout_main {
    position: absolute;
    left: $base-menu-width;
    top: $base-tabbar-height;
    width: calc(100% - $base-menu-width);
    height: calc(100% - $base-tabbar-height);
    background-color: #2aa27c;
    padding: 20px;
    overflow: auto; // 滚动条
  }
}
</style>
