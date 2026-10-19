<template>
  <div>
    <el-card>
      <el-form :inline="true">
        <el-form-item label="用户名：">
          <el-input v-model="keyword" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            :disabled="keyword ? false : true"
            @click="search"
          >
            搜索
          </el-button>
          <el-button type="default" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin: 10px 0">
      <el-button type="primary" @click="addUser">添加用户</el-button>
      <el-button
        type="danger"
        :disabled="selecteIdArr.length < 1"
        @click="deleteSelectUser"
      >
        批量删除
      </el-button>
      <!-- 表格展示用户信息 -->
      <el-table
        style="margin: 10px 0"
        border
        :data="userArr"
        @selection-change="seleteChange"
      >
        <el-table-column align="center" type="selection"></el-table-column>
        <el-table-column
          align="center"
          label="#"
          type="index"
        ></el-table-column>
        <el-table-column align="center" prop="id" label="ID"></el-table-column>
        <el-table-column
          align="center"
          prop="username"
          label="用户名字"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="name"
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
              style="width: 80px; margin-bottom: 5px"
              icon="User"
              size="small"
              type="primary"
              @click="setRole(row)"
            >
              分配角色
            </el-button>
            <el-button
              style="width: 80px; margin-bottom: 5px"
              icon="Edit"
              size="small"
              type="info"
              @click="updateUser(row)"
            >
              编辑
            </el-button>
            <el-popconfirm
              width="260px"
              :title="`你确定要删除${row.username}吗？`"
              @confirm="deleteUser(row.id)"
            >
              <template #reference>
                <el-button
                  style="width: 80px; margin-bottom: 5px"
                  icon="Delete"
                  size="small"
                  type="danger"
                >
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
        <h4>{{ userParams.id ? '更新用户' : '添加用户' }}</h4>
      </template>
      <template #default>
        <div>
          <el-form ref="formRef" :model="userParams" :rules="rules">
            <el-form-item label="用户姓名" prop="username">
              <el-input
                v-model="userParams.username"
                placeholder="请输入用户姓名"
              ></el-input>
            </el-form-item>
            <el-form-item label="用户昵称" prop="name">
              <el-input
                v-model="userParams.name"
                placeholder="请输入用户昵称"
              ></el-input>
            </el-form-item>
            <el-form-item
              v-if="!userParams.id"
              label="用户密码"
              prop="password"
            >
              <el-input
                v-model="userParams.password"
                placeholder="请输入用户密码"
                type="password"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button type="primary" @click="save">确定</el-button>
          <el-button @click="drawer = false">取消</el-button>
        </div>
      </template>
    </el-drawer>
    <!-- 用于分配账号职位的抽屉结构 -->
    <el-drawer v-model="drawer1">
      <template #header>
        <h4>分配角色职位</h4>
      </template>
      <template #default>
        <div>
          <el-form>
            <el-form-item label="用户姓名">
              <el-input
                v-model="userParams.username"
                :disabled="true"
              ></el-input>
            </el-form-item>
            <el-form-item label="职位列表">
              <el-checkbox
                v-model="checkAll"
                :indeterminate="isIndeterminate"
                @change="handleCheckAllChange"
              >
                全选
              </el-checkbox>
              <!-- 显示职位的复选框 -->
              <el-checkbox-group
                v-model="userRole as string[]"
                @change="handleCheckedCitiesChange"
              >
                <el-checkbox
                  v-for="item in allRole"
                  :key="item.id"
                  :label="item"
                  :value="item"
                >
                  {{ item.roleName }}
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-form>
        </div>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button type="primary" @click="confirmClick">确认</el-button>
          <el-button @click="drawer1 = false">取消</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, reactive, nextTick } from 'vue'
import {
  reqUserInfo,
  reqAddOrUpdateUser,
  reaAllRole,
  reqSetUserRole,
  reqRemoveUser,
  reqRemoveUserList
} from '@/api/acl/user'
import type {
  UserResponseData,
  Records,
  User,
  AllRoleResponseData,
  AllRole,
  SetRoleData
} from '@/api/acl/user/type' //引入用户信息类型
import { ElMessage } from 'element-plus'

//默认页码
const pageNo = ref<number>(1)
//默认每页显示条数
const pageSize = ref<number>(5)
//用户总个数
const total = ref<number>(0)
//用户信息数组
const userArr = ref<Records>([])
//收集用户信息
const userParams = reactive<User>({
  username: '',
  name: '',
  password: ''
})
//收集用户输入的关键字
const keyword = ref<string>('')
//获取已有的用户信息
const getHasUser = async (pager = 1) => {
  pageNo.value = pager
  const res: UserResponseData = await reqUserInfo(
    pageNo.value,
    pageSize.value,
    keyword.value
  )
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
//搜索用户信息
const search = () => {
  getHasUser()
  keyword.value = ''
}
import useLayoutSettingStore from '@/store/modules/setting'
const layoutSettingStore = useLayoutSettingStore()
//重置
const reset = () => {
  layoutSettingStore.refresh = !layoutSettingStore.refresh
  keyword.value = ''
  getHasUser() //重新获取用户信息
}
//#region 抽屉结构
//控制抽屉显示与隐藏
const drawer = ref<boolean>(false)
//控制抽屉1显示与隐藏
const drawer1 = ref<boolean>(false)
//form组件
const formRef = ref<any>(null)
//添加用户
const addUser = () => {
  nextTick(() => {
    formRef.value.resetFields() //清空表单验证信息
    //清空收集用户信息
    Object.assign(userParams, {
      username: '',
      name: '',
      password: '',
      id: null //如果用户id存在，说明是更新用户信息，否则是添加用户信息
    })
  })
  drawer.value = true
}
//更新用户
const updateUser = (row: User) => {
  drawer.value = true
  nextTick(() => {
    formRef.value.resetFields() //清空表单验证信息
    Object.assign(userParams, row)
  })
}
//保存用户信息
const save = async () => {
  await formRef.value.validator()
  const res = await reqAddOrUpdateUser(userParams)
  if (res.code === 200) {
    ElMessage.success(userParams.id ? '更新用户信息成功' : '添加用户信息成功')
  } else {
    ElMessage.error(userParams.id ? '更新用户信息失败' : '添加用户信息失败')
  }
  getHasUser(userParams.id ? pageNo.value : 1)
  drawer.value = false
  //浏览器重新加载
  window.location.reload()
}
//表单验证规则
const validatorUsername = (rule: any, value: any, callback: any) => {
  //用户名长度验证
  if (value.trim().length < 5 || value.trim().length > 15) {
    callback(new Error('用户名长度必须在5到15个字符之间'))
  } else {
    callback()
  }
}
const validatorName = (rule: any, value: any, callback: any) => {
  //用户昵称长度验证
  if (value.trim().length < 5 || value.trim().length > 15) {
    callback(new Error('用户昵称长度必须在5到15个字符之间'))
  } else {
    callback()
  }
}
const validatorPassword = (rule: any, value: any, callback: any) => {
  //用户密码长度验证
  if (value.trim().length < 6 || value.trim().length > 15) {
    callback(new Error('用户密码长度必须在6到15个字符之间'))
  } else {
    callback()
  }
}
//用户名验证规则
const rules = {
  username: [
    {
      required: true,
      trigger: 'blur',
      validator: validatorUsername
    }
  ],
  name: [
    {
      required: true,
      trigger: 'blur',
      validator: validatorName
    }
  ],
  password: [
    {
      required: true,
      trigger: 'blur',
      validator: validatorPassword
    }
  ]
}
//存储全部职位
const allRole = ref<AllRole>([])
//用户已有的职位
const userRole = ref<AllRole>([])
//分配角色
const setRole = async (row: User) => {
  //存储用户信息
  Object.assign(userParams, row)
  //获取用户职位信息以及职位列表
  const res: AllRoleResponseData = await reaAllRole(row.id as number)
  if (res.code === 200) {
    allRole.value = res.data.allRolesList
    userRole.value = res.data.assignRoles
    drawer1.value = true
  }
}
//全选复选框
const checkAll = ref<boolean>(false)
//职位列表是否全选
const isIndeterminate = ref<boolean>(false)
//删除选择用户的数组
const selecteIdArr = ref<User[]>([])
//全选复选框改变事件
const handleCheckAllChange = (val: any) => {
  userRole.value = val ? allRole.value : []
  isIndeterminate.value = false
}
//职位列表复选框改变事件
const handleCheckedCitiesChange = (value: any) => {
  const checkedCount = value.length
  checkAll.value = checkedCount === allRole.value.length
  isIndeterminate.value =
    checkedCount > 0 && checkedCount < allRole.value.length
}
//确认分配角色
const confirmClick = async () => {
  let data: SetRoleData = {
    userId: userParams.id as number,
    roleIdList: userRole.value.map(item => item.id) as number[]
  }
  const res = await reqSetUserRole(data)
  if (res.code === 200) {
    ElMessage.success('分配角色成功')
  } else {
    ElMessage.error('分配角色失败')
  }
  drawer1.value = false
  getHasUser() //重新获取用户信息
}
//删除单个用户
const deleteUser = async (id: number) => {
  const res = await reqRemoveUser(id)
  if (res.code === 200) {
    ElMessage.success('删除用户成功')
  } else {
    ElMessage.error('删除用户失败')
  }
  getHasUser() //重新获取用户信息
}
//选择删除多个用户
const seleteChange = (value: any) => {
  selecteIdArr.value = value
}
//删除多个用户
const deleteSelectUser = async () => {
  let idList: number[] = selecteIdArr.value.map(item => item.id) as number[]
  const res = await reqRemoveUserList(idList)
  if (res.code === 200) {
    ElMessage.success('批量删除用户成功')
  } else {
    ElMessage.error('批量删除用户失败')
  }
  getHasUser() //重新获取用户信息
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
