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
            @click="addPermission(row)"
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
          <el-popconfirm
            width="260px"
            :title="`你确定要删除${row.name}这个菜单吗？`"
            @confirm="removeMenu(row.id)"
          >
            <template #reference>
              <el-button
                type="danger"
                size="small"
                :disabled="row.level == 1 ? true : false"
              >
                删除
              </el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 对话框组件 -->
    <el-dialog
      v-model="dialogVisible"
      :title="menuData.id ? '更新菜单' : '添加菜单'"
      width="500"
    >
      <el-form>
        <el-form-item label="名称" prop="name">
          <el-input v-model="menuData.name" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label="权限值" prop="name">
          <el-input
            v-model="menuData.code"
            placeholder="请输入权限值"
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="save">确定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, reactive } from 'vue'
import {
  reqAllPermission,
  reqAddOrUpdateMenu,
  reqDeleteMenu
} from '@/api/acl/menu'
import type {
  Permission,
  PermissionList,
  PermissionResponseData,
  MenuParams
} from '@/api/acl/menu/type'
import { ElMessage } from 'element-plus'

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
//添加或更新携带的参数
const menuData = reactive<MenuParams>({
  id: undefined,
  code: '',
  level: 0,
  pid: 0,
  name: ''
})
//添加菜单
const addPermission = (row: Permission) => {
  //清空菜单数据
  Object.assign(menuData, {
    id: undefined,
    code: '',
    level: 0,
    pid: 0,
    name: ''
  })
  //显示对话框
  dialogVisible.value = true
  //收集新增的菜单的level值
  menuData.level = row.level + 1
  //收集新增的菜单的pid值
  menuData.pid = row.id as number
}
//编辑菜单
const updatePermission = (row: Permission) => {
  //显示对话框
  dialogVisible.value = true
  Object.assign(menuData, row)
}

//#region 对话框
//控制对话框显示
const dialogVisible = ref<boolean>(false)
//保存按钮
const save = async () => {
  const res: any = await reqAddOrUpdateMenu(menuData)
  if (res.code === 200) {
    dialogVisible.value = false
    ElMessage.success('保存成功')
    getHasPermission()
  } else {
    ElMessage.error('保存失败')
  }
}
//删除菜单
const removeMenu = async (id: number) => {
  const res: any = await reqDeleteMenu(id)
  if (res.code === 200) {
    ElMessage.success('删除成功')
    getHasPermission()
  } else {
    ElMessage.error('删除失败')
  }
}
//#endregion
</script>

<style lang="scss" scoped></style>
