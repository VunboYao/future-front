<script setup>
import { useLogin } from '@/views/login/useLogin'
const { name, password, isCanLogin, isRememberUser, onLogin } = await useLogin()
</script>

<template>
  <div class="container">
    <main>
      <img
        src="@/assets/img/login-avatar.png"
        alt="login"
        class="avatar"
      >
      <span class="title">登录用户中心～</span>
      <el-input
        v-model="name"
        size="large"
        class="login-field"
        placeholder="用户名"
        clearable
      />
      <el-input
        v-model="password"
        size="large"
        class="login-field"
        type="password"
        show-password
        clearable
        placeholder="密码"
        @keyup.enter="onLogin"
      />
      <div class="friendly-tip">
        <el-checkbox v-model="isRememberUser">
          记住我
        </el-checkbox>
        <span class="tips">忘记密码？</span>
      </div>
      <div class="operation">
        <el-button
          class="login-btn"
          round
          type="primary"
          :disabled="!isCanLogin"
          :loading="false"
          @click="onLogin"
        >
          快速登录
        </el-button>
        <el-button
          class="login-btn"
          type="primary"
          link
          :disabled="!isCanLogin"
          :loading="false"
        >
          立即注册
        </el-button>
      </div>
    </main>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  height: 100%;
  background: #1e3749;

  main {
    width: 450px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .avatar {
      width: 100px;
      height: 100px;
      border-radius: 50%;
    }

    .title {
      margin-top: 40px;
      font-size: 18px;
    }

    .login-field {
      margin-top: 20px;
      width: 408px;
      background: #1e3749;

      :deep(.el-input__wrapper) {
        background: #0e2333;
        box-shadow: none;
        border-radius: 20px;
      }
    }

    .friendly-tip {
      margin-top: 18px;
      width: 320px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    :deep(.el-checkbox) {
      font-size: 12px;
    }

    .tips {
      font-size: 12px;
    }

    .login-btn {
      margin-top: 30px;
    }
  }
}
</style>
