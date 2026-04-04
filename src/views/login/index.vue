<template>
  <div>
    <div class="login_container">
      <el-row>
        <el-col :span="12" :xs="0">占位符</el-col>
        <el-col :span="12" :xs="24">
          <el-form class="login_form">
            <h1>Hello</h1>
            <h2>欢迎来到硅谷甄选</h2>
            <el-form-item>
              <el-input
                v-model="loginForm.username"
                :prefix-icon="User"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-input
                v-model="loginForm.password"
                type="password"
                :prefix-icon="Lock"
                show-password
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button class="login_btn" type="primary" size="default">
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
import { reactive } from 'vue'

const loginForm = reactive({
  username: 'admin',
  password: '111111  '
})
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
