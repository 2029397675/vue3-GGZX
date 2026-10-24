<template>
  <div>
    <el-table
      :data="permissionArr"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
    >
      <el-table-column label="名称" prop="name"></el-table-column>
      <el-table-column label="权限值" prop="code"></el-table-column>
      <el-table-column label="修改时间" prop="updateTime"></el-table-column>
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button
            type="primary"
            size="small"
            :disabled="row.level == 4 ? true : false"
          >
            {{ row.level == 3 ? '添加功能' : '添加菜单' }}
          </el-button>
          <el-button
            type="warning"
            size="small"
            :disabled="row.level == 1 ? true : false"
          >
            编辑
          </el-button>
          <el-button
            type="danger"
            size="small"
            :disabled="row.level == 1 ? true : false"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { reqAllPermission } from '@/api/acl/menu'
import type {
  PermissionList,
  PermissionResponseData
} from '@/api/acl/menu/type'

//组件挂载后获取数据
onMounted(() => {
  getHasPermission()
})
//存储菜单数据
const permissionArr = ref<PermissionList>([])
//获取菜单数据
const getHasPermission = async () => {
  const res: PermissionResponseData = await reqAllPermission()
  if (res.code === 200) {
    permissionArr.value = res.data
  }
}
</script>

<style lang="scss" scoped></style>
