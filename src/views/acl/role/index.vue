<template>
  <div>
    <el-card>
      <el-form :inline="true" class="form">
        <el-form-item label="职位搜索">
          <el-input
            v-model="keyword"
            placeholder="请你输入走索职位关键字"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            :disabled="keyword ? false : true"
            @click="search"
          >
            搜索
          </el-button>
          <el-button type="primary" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin-top: 10px">
      <el-button type="primary" icon="Plus" @click="addRole">
        添加角色
      </el-button>
      <el-table :data="allRole" border style="margin: 10px 0">
        <el-table-column
          type="index"
          align="center"
          label="#"
        ></el-table-column>
        <el-table-column prop="id" align="center" label="ID"></el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          label="角色名称"
          prop="roleName"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          label="创建时间"
          prop="createTime"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          label="更新时间"
          prop="updateTime"
        ></el-table-column>
        <el-table-column align="center" label="操作" width="280">
          <template #default="{ row }">
            <el-button
              type="primary"
              size="small"
              icon="User"
              @click="setPermission(row)"
            >
              分配权限
            </el-button>
            <el-button
              type="warning"
              size="small"
              icon="Edit"
              @click="updateRole(row)"
            >
              编辑
            </el-button>
            <el-popconfirm
              width="260px"
              :title="`你确定要删除${row.roleName}职位吗？`"
              @confirm="removeRole(row.id)"
            >
              <template #reference>
                <el-button type="danger" size="small" icon="Delete">
                  删除
                </el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination
        v-model:current-page="pageNo"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30, 40]"
        :background="true"
        layout="prev, pager, next, jumper,->,sizes,total"
        :total="total"
        @change="getHasRole"
      />
    </el-card>
    <!-- 添加与更新职位的对话框结构 -->
    <el-dialog
      v-model="dialogVisible"
      :title="roleParams.id ? '更新职位' : '添加职位'"
    >
      <el-form ref="form" :model="roleParams" :rules="rules">
        <el-form-item label="职位名称" prop="roleName">
          <el-input
            v-model="roleParams.roleName"
            placeholder="请输入职位名称"
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
    <!-- 分配用户权限的结构 -->
    <el-drawer v-model="drawer">
      <template #header>
        <h4>分配权限</h4>
      </template>
      <template #default>
        <!-- 树形控件 -->
        <div>
          <el-tree
            ref="tree"
            style="max-width: 600px"
            :data="menuArr"
            show-checkbox
            node-key="id"
            default-expand-all
            :default-checked-keys="selectArr"
            :props="defaultProps"
          />
        </div>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="drawer = false">取消</el-button>
          <el-button type="primary" @click="handler">确定</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, reactive, nextTick } from 'vue'
import {
  reqAllRoleList,
  reqAddOrUpdateRole,
  reqAllMenuList,
  reqSetPermission,
  reqRemoveRole
} from '@/api/acl/role'
import type {
  RoleResponseData,
  Records,
  RoleData,
  MenuResponseData,
  MenuList
} from '@/api/acl/role/type'

import useLayoutSettingStore from '@/store/modules/setting'
import { ElMessage } from 'element-plus'
import { remove } from 'nprogress'
const settingStore = useLayoutSettingStore()

//#region 搜索卡片
//搜索关键词
const keyword = ref<string>('')
//全部职位列表
const allRole = ref<Records>([])
//获取职位列表
const getHasRole = async (page = 1) => {
  pageNo.value = page

  const res: RoleResponseData = await reqAllRoleList(
    page,
    pageSize.value,
    keyword.value
  )
  if (res.code === 200) {
    allRole.value = res.data.records
    total.value = res.data.total
  }
}
//组件挂载时调用
onMounted(() => {
  getHasRole(pageNo.value)
})
//搜索
const search = () => {
  getHasRole()
  keyword.value = '' //清空搜索框
}
const reset = () => {
  settingStore.refresh = !settingStore.refresh
}
//#endregion
//#region 主体卡片
//添加职位
const addRole = () => {
  dialogVisible.value = true
  roleParams.roleName = '' //清空角色名称
  roleParams.id = undefined //清空ID
  nextTick(() => {
    form.value.resetFields()
  }) //清空表单验证信息
}
//更新职位
const updateRole = (row: RoleData) => {
  dialogVisible.value = true
  Object.assign(roleParams, row)
  nextTick(() => {
    form.value.resetFields()
  })
}
//#endregion

//#region 分页器
//当前页码
const pageNo = ref<number>(1)
//每页显示条数
const pageSize = ref<number>(10)
//总个数
const total = ref<number>(0)

//#endregion

//#region 添加与更新职位的对话框
//form组件
const form = ref()
//对话框显示与隐藏
const dialogVisible = ref<boolean>(false)
//收集角色名称
const roleParams = reactive<RoleData>({
  roleName: '' //角色名称
})
//角色名称验证
const validatorRoleName = (rule: any, value: any, callback: any) => {
  if (value.trim().length < 2) {
    callback(new Error('职位名称不能少于2个字符'))
  } else {
    callback()
  }
}
//表单验证规则
const rules = reactive({
  roleName: [{ required: true, trigger: 'blur', validator: validatorRoleName }]
})
//确定按钮
const save = async () => {
  await form.value.validate()
  //添加职位 | 更新职位
  const res = await reqAddOrUpdateRole(roleParams)
  if (res.code === 200) {
    dialogVisible.value = false
    getHasRole(roleParams.id ? pageNo.value : 1)
    ElMessage.warning(roleParams.id ? '更新职位成功' : '添加职位成功')
    dialogVisible.value = false
  } else {
    ElMessage.warning(roleParams.id ? '更新职位失败' : '添加职位失败')
  }
}
//分配用户权限
const setPermission = async (row: RoleData) => {
  drawer.value = true
  //收集当前要分配权限的职位的数据
  Object.assign(roleParams, row)
  const res: MenuResponseData = await reqAllMenuList(roleParams.id as number)
  if (res.code === 200) {
    menuArr.value = res.data
    selectArr.value = filterSelectArr(menuArr.value, [])
  }
}
//#endregion
//#region 分配用户权限
//树形控件
const tree = ref<any>() //树形控件的实例
//控制抽屉的显示与隐藏
const drawer = ref<boolean>(false)
//存储用户权限的数据
const menuArr = ref<MenuList>([])
//存储勾选节点的id（四级）
const selectArr = ref<number[]>([])
//默认树形控件的属性
const defaultProps = {
  children: 'children',
  label: 'name'
}
//过滤勾选节点的id（四级）的函数
const filterSelectArr = (allData: any, initArr: any) => {
  allData.forEach((item: any) => {
    if (item.select && item.level == 4) {
      initArr.push(item.id)
    }
    if (item.children && item.children.length > 0) {
      filterSelectArr(item.children, initArr)
    }
  })
  return initArr
}
//确定按钮
const handler = async () => {
  //职位的id
  const roleId = roleParams.id as number
  //选中节点的id
  const arr1 = tree.value.getCheckedKeys()
  //半选节点的id
  const arr2 = tree.value.getHalfCheckedKeys()
  //将半选节点的id添加到选中节点的id的数组中
  const arr = arr1.concat(arr2)
  //下发权限
  const res = await reqSetPermission(roleId, arr)
  if (res.code === 200) {
    ElMessage.warning('分配权限成功')
    drawer.value = false
    window.location.reload() //刷新职位列表
  } else {
    ElMessage.warning('分配权限失败')
    drawer.value = false
  }
}
//删除已有的角色
const removeRole = async (id: number) => {
  const res = await reqRemoveRole(id)
  if (res.code === 200) {
    ElMessage.warning('删除职位成功')
    getHasRole(pageNo.value)
  } else {
    ElMessage.warning('删除职位失败')
  }
}
//#endregion
</script>

<style lang="scss" scoped>
.form {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  .el-form-item {
    margin-bottom: 0;
  }
}
</style>
