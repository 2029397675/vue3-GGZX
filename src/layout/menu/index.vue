<template>
  <div>
    <template v-for="item in menuList" :key="item.path">
      <!-- 没有子路由 -->
      <template v-if="!item.children">
        <el-menu-item
          v-if="!item.meta.hidden"
          :index="item.path"
          @click="goRoute"
        >
          <template #title>
            <el-icon>
              <component :is="item.meta.icon"></component>
            </el-icon>

            <span>{{ item.meta.title }}</span>
          </template>
        </el-menu-item>
      </template>
      <!-- 有一个子路由 -->
      <template v-if="item.children && item.children.length === 1">
        <el-menu-item
          v-if="!item.children[0].meta.hidden"
          :index="item.children[0].path"
          @click="goRoute"
        >
          <template #title>
            <el-icon>
              <component :is="item.children[0].meta.icon"></component>
            </el-icon>
            <span>{{ item.children[0].meta.title }}</span>
          </template>
        </el-menu-item>
      </template>

      <!-- 有多个子路由 -->
      <el-sub-menu
        v-if="item.children && item.children.length > 1"
        :index="item.path"
      >
        <template #title>
          <el-icon>
            <component :is="item.meta.icon"></component>
          </el-icon>
          <span>{{ item.meta.title }}</span>
        </template>
        <LayoutMenu :menu-list="item.children"></LayoutMenu>
      </el-sub-menu>
    </template>
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'LayoutMenu'
})
//获取父组件传递过来的参数
defineProps(['menuList'])
import { useRouter } from 'vue-router'
const router = useRouter()

//点击菜单回调方法
const goRoute = (vc: any) => {
  //跳转路由
  router.push(vc.index)
}
</script>

<style lang="scss" scoped></style>
