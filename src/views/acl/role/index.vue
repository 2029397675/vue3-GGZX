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
      <el-button type="primary" icon="Plus">添加角色</el-button>
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
            <el-button type="primary" size="small" icon="User">
              分配权限
            </el-button>
            <el-button type="warning" size="small" icon="Edit">编辑</el-button>
            <el-button type="danger" size="small" icon="Delete">删除</el-button>
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
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { reqAllRoleList } from '@/api/acl/role'
import type { RoleResponseData, Records } from '@/api/acl/role/type'

import useLayoutSettingStore from '@/store/modules/setting'
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

//#region 分页器
//当前页码
const pageNo = ref<number>(1)
//每页显示条数
const pageSize = ref<number>(10)
//总个数
const total = ref<number>(0)

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
