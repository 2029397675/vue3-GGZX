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
            @click="addPermission"
          >
            {{ row.level == 3 ? '添加功能' : '添加菜单' }}
          </el-button>
          <el-button
            type="warning"
            size="small"
            :disabled="row.level == 1 ? true : false"
            @click="updatePermission(row)"
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
    <!-- 对话框组件 -->
    <el-dialog v-model="dialogVisible" title="添加菜单" width="500">
      <el-form>
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label="权限值" prop="name">
          <el-input v-model="form.name" placeholder="请输入权限值"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="dialogVisible = false">
            确定
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { reqAllPermission } from '@/api/acl/menu'
import type {
  Permission,
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
//添加菜单
const addPermission = () => {
  dialogVisible.value = true
}
//编辑菜单
const updatePermission = (row: Permission) => {
  dialogVisible.value = true
}

//#region 对话框
//控制对话框显示
const dialogVisible = ref<boolean>(false)
//#endregion
</script>

<style lang="scss" scoped></style>
