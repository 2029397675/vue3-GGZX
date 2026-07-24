<template>
  <div>
    <div class="login_container">
      <el-row>
        <el-col :span="12" :xs="0"></el-col>
        <el-col :span="12" :xs="24">
          <el-form
            ref="loginForms"
            class="login_form"
            :model="loginForm"
            :rules="rules"
          >
            <h1>Hello</h1>
            <h2>欢迎来到硅谷甄选</h2>
            <el-form-item prop="username">
              <el-input
                v-model="loginForm.username"
                :prefix-icon="User"
              ></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                v-model="loginForm.password"
                type="password"
                :prefix-icon="Lock"
                show-password
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                class="login_btn"
                type="primary"
                size="default"
                :loading="loading"
                @click="login"
              >
                登录
              </el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { User, Lock } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'
import useUserStore from '@/store/modules/user.ts'
import { getTime } from '@/utils/time'

//获取el-form组件
const loginForms = ref()
const userStore = useUserStore()
//获取路由器
const router = useRouter()
const loginForm = reactive({
  username: 'admin',
  password: '111111'
})
//定义变量控制按钮加载效果
const loading = ref(false)
//登录按钮回调函数
const login = async () => {
  //保证全部表单相校验通过再发请求
  await loginForms.value.validate()
  // 按钮加载效果
  loading.value = true
  // 通知仓库发送登录请求
  // 请求成功->首页展示数据
  // 请求失败->提示错误信息
  try {
    //登录失败加载效果消失
    loading.value = false
    //保证登录成功
    await userStore.userLogin(loginForm)
    //编程式导航跳转到展示数据的首页
    router.push('/')
    ElNotification({
      type: 'success',
      message: '欢迎回来',
      title: `Hi,${getTime()}好`
    })
    loading.value = true
  } catch (err) {
    // 处理错误信息
    ElNotification({
      type: 'error',
      message: (err as Error).message
    })
  }
}

//自定义校验规则
const validatorUserName = (rule: any, value: any, callback: any) => {
  //rule:为校验规则对象
  //value:为当前表单输入值
  if (value.length >= 5) {
    callback()
  } else {
    callback(new Error('用户名长度不能低于5个字符'))
  }
}
const validatorPassWord = (rule: any, value: any, callback: any) => {
  if (value.length >= 6) {
    callback()
  } else {
    callback(new Error('密码长度不能低于6个字符'))
  }
}

//表单校验规则
const rules = {
  username: [{ trigger: 'change', validator: validatorUserName }],
  password: [{ trigger: 'change', validator: validatorPassWord }]
}
</script>

<style lang="scss" scoped>
.login_container {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/background.jpg') no-repeat;
  background-size: cover;
  .login_form {
    position: relative;
    padding: 20px 20px 10px;
    width: 60%;
    top: 30vh;
    background: url('@/assets/images/login_form.png') no-repeat;
    background-size: cover;
    h1 {
      color: white;
      font-size: 40px;
    }
    h2 {
      color: white;
      font-size: 30px;
      margin: 20px 0;
    }
    .login_btn {
      width: 100%;
    }
  }
}
</style>
