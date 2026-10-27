<template>
  <!-- 顶部右侧动态 -->
  <el-button plain icon="Refresh" circle @click="updateRefresj"></el-button>
  <el-button plain icon="FullScreen" circle @click="fullScreen"></el-button>
  <el-popover placement="bottom" title="主题设置" :width="300" trigger="hover">
    <el-form>
      <el-form-item label="主题颜色">
        <el-color-picker
          v-model="color"
          show-alpha
          :predefine="predefineColors"
          style="margin-left: 5px"
          @change="setColor"
        />
      </el-form-item>
      <el-form-item label="暗黑模式">
        <el-switch
          v-model="dark"
          inactive-icon="Sunny"
          active-icon="Moon"
          inline-prompt
          size="small"
          style="margin-left: 5px"
          @change="changeDark"
        />
      </el-form-item>
    </el-form>
    <template #reference>
      <el-button plain icon="Setting" circle></el-button>
    </template>
  </el-popover>

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
import { ref } from 'vue'
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
const logout = async () => {
  await userStore.userLogout()
  //跳转到登录页面
  router.push({ path: '/login', query: { redirect: route.path } }) //跳转到登录页面
}

const color = ref('rgba(255, 69, 0, 0.68)')
const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577'
])
//暗黑模式
const dark = ref<boolean>(false)
const changeDark = () => {
  //获取html根节点
  let html = document.documentElement
  if (dark.value) {
    html.className = 'dark'
  } else {
    html.className = ''
  }
}
//主题颜色切换
const setColor = () => {
  let el = document.documentElement
  el.style.setProperty('--el-color-primary', color.value)
}
</script>

<style lang="scss" scoped></style>
