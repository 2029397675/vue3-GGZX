<template>
  <div>
    <el-card>
      <el-form :inline="true">
        <el-form-item label="用户名：">
          <el-input placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">搜索</el-button>
          <el-button type="default">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin: 10px 0">
      <el-button type="primary" @click="addUser">添加用户</el-button>
      <el-button type="danger">批量删除</el-button>
      <!-- 表格展示用户信息 -->
      <el-table style="margin: 10px 0" border :data="userArr">
        <el-table-column align="center" type="selection"></el-table-column>
        <el-table-column
          align="center"
          label="#"
          type="index"
        ></el-table-column>
        <el-table-column align="center" prop="id" label="ID"></el-table-column>
        <el-table-column
          align="center"
          prop="remark"
          label="用户名字"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="remark"
          label="用户名称"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="roleName"
          label="用户角色"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="createTime"
          label="创建时间"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          align="center"
          prop="updateTime"
          label="更新时间"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column align="center" label="操作" width="260px">
          <template #default="{ row }">
            <el-button
              style="width: 80px"
              icon="User"
              size="small"
              type="primary"
            >
              分配角色
            </el-button>
            <el-button
              style="width: 80px"
              icon="Edit"
              size="small"
              type="info"
              @click="updateUser(row)"
            >
              编辑
            </el-button>
            <el-button
              style="width: 80px"
              icon="Delete"
              size="small"
              type="danger"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination
        v-model:current-page="pageNo"
        v-model:page-size="pageSize"
        :page-sizes="[5, 7, 9, 11]"
        :background="true"
        layout="totalprev, pager, next, jumper,->,sizes,total"
        :total="total"
        @change="getHasUser"
      />
    </el-card>
    <!-- 抽屉结构用于添加新的用户|更改用户信息 -->
    <el-drawer v-model="drawer">
      <template #header>
        <h4>添加用户</h4>
      </template>
      <template #default>
        <div>
          <el-form>
            <el-form-item label="用户姓名">
              <el-input placeholder="请输入用户姓名"></el-input>
            </el-form-item>
            <el-form-item label="用户昵称">
              <el-input placeholder="请输入用户昵称"></el-input>
            </el-form-item>
            <el-form-item label="用户密码">
              <el-input placeholder="请输入用户密码" type="password"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button type="primary">保存</el-button>
          <el-button @click="drawer = false">取消</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { reqUserInfo } from '@/api/acl/user'
import type { UserResponseData, Records, User } from '@/api/acl/user/type' //引入用户信息类型
import { ElMessage } from 'element-plus'

//默认页码
const pageNo = ref<number>(1)
//默认每页显示条数
const pageSize = ref<number>(5)
//用户总个数
const total = ref<number>(0)
//用户信息数组
const userArr = ref<Records>([])
//获取已有的用户信息
const getHasUser = async (pager = 1) => {
  pageNo.value = pager
  const res: UserResponseData = await reqUserInfo(pageNo.value, pageSize.value)
  if (res.code === 200) {
    userArr.value = res.data.records
    total.value = res.data.total
  } else {
    ElMessage.error('获取用户信息失败')
  }
}
//页面加载时获取用户信息
onMounted(() => {
  getHasUser()
})
//#region 抽屉结构
//控制抽屉显示与隐藏
const drawer = ref<boolean>(false)
//添加用户
const addUser = () => {
  drawer.value = true
}
//更新用户
const updateUser = (row: User) => {
  drawer.value = true
  console.log(row)
}
//#endregion
</script>

<style lang="scss" scoped>
.el-card {
  .el-form {
    height: 80px;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .el-form-item {
      margin-bottom: 0;
    }
  }
}
</style>
